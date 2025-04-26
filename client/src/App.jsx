import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import ExpenseHistory from "./pages/ExpenseHistory"
import Settings from "./pages/Settings"
import CategoryGuide from "./pages/CategoryGuide"
import { ExpensesProvider } from "./context/ExpensesContext"
import { AuthProvider } from "./context/AuthContext"

function App() {

  return (
    <>
      <AuthProvider>
        <ExpensesProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />}>
                <Route index element={<Dashboard />} />
                <Route path="expenses" element={<ExpenseHistory />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="/category-guide" element={<CategoryGuide />} />
            </Routes>
          </Router>
        </ExpensesProvider>
      </AuthProvider>
    </>
  )
}

export default App
