import { Link, useLocation } from "react-router-dom"

export function NavBar() {
  const location = useLocation()

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center space-x-4">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            to="/report"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/report" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Report
          </Link>
        </div>
      </div>
    </nav>
  )
}

