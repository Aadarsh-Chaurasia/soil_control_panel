import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { NavBar } from "./components/nav-bar.tsx"
import Dashboard from "./pages/dashboard"
import Report from "./pages/report"

function App() {
  return (
    <>
    <Router>
      <div  className="w-screen h-screen flex flex-col">
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App

