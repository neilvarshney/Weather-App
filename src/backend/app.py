import requests
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import json
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

class WeatherApp():
    API_KEY = os.getenv('OPENWEATHER_API_KEY')

    def __init__(self):
        self.cityName = ""
        self.BASE_URL = ""

    def weatherData(self, cityInput, lat, lon):
        self.cityName = cityInput
        self.BASE_URL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + self.API_KEY

        try:
            response = requests.get(f"{self.BASE_URL}")
            response.raise_for_status()

            data = response.json()

            return data
        
        except requests.exceptions.HTTPError as err:
            print(f"HTTP error occurred: {err}")
            print(f"Response content: {response.text}")
        except requests.exceptions.ConnectionError as err:
            print(f"Connection error occurred: {err}")
        except requests.exceptions.Timeout as err:
            print(f"Timeout error occurred: {err}")
        except requests.exceptions.RequestException as err:
            print(f"An unexpected error occurred: {err}")
        except ValueError:
            print("Failed to parse JSON response.")


    def cityList(self, cityInput):

        self.cityName = cityInput
        self.BASE_URL = "http://api.openweathermap.org/geo/1.0/direct?q=" + self.cityName + "&limit=5&appid=" + self.API_KEY

        try:
            response = requests.get(f"{self.BASE_URL}")
            response.raise_for_status()

            data = response.json()

            return data
        
        except requests.exceptions.HTTPError as err:
            print(f"HTTP error occurred: {err}")
            print(f"Response content: {response.text}")
        except requests.exceptions.ConnectionError as err:
            print(f"Connection error occurred: {err}")
        except requests.exceptions.Timeout as err:
            print(f"Timeout error occurred: {err}")
        except requests.exceptions.RequestException as err:
            print(f"An unexpected error occurred: {err}")
        except ValueError:
            print("Failed to parse JSON response.")

weatherApp = WeatherApp()


@app.route('/cities/<string:city_name>/weather', methods=['GET'])
def getWeather(city_name):
    try:
        lat = request.args.get('lat')
        lon = request.args.get('lon')

        weatherData = weatherApp.weatherData(city_name, lat, lon)

        if(weatherData):
            return jsonify({
                "status": "success", 
                "weatherData": weatherData
            }), 200
        
        else:
            return jsonify({
                "status": "fail",
            }), 409


    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"text": f"Internal server error: {str(e)}"}), 500


@app.route('/cities/<string:city_name>', methods=['GET'])
def getCities(city_name):
    
    try:
        if not city_name:
            return jsonify({"text": "City cannot be empty"}), 400
        
        cityData = weatherApp.cityList(city_name)

        if cityData:
            return jsonify({
                "status": "success",
                "weather_data": cityData,
            }), 200
        
        else:
            return jsonify({
                "status": "fail",
            }), 409
        
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"text": f"Internal server error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug = True, port = 5000)
