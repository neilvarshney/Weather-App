export function Header() {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 dark:bg-black/40 backdrop-blur-sm h-28 sm:h-24 w-100%">
        <div className="text-4xl sm:text-6xl mt-5 text-center">
            <a href = "/">
                Weather App
            </a>
        </div>
      </nav>
    );
  }