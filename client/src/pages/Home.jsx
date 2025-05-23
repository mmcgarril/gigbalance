import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useExpenses } from "../context/ExpensesContext"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import "./Home.css"

export default function Home() {
    const [ isSidebarOpen, setIsSidebarOpen ] = useState(false)
    const { user, setUser } = useAuth()
    const { fetchExpenses } = useExpenses()

    const navigate = useNavigate()

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev)
    }

    const fetchUser = async () => {
        try {
            //fetch user data, if ok then setUser, if not ok redirect to login
            const res = await fetch('/api/dashboard', {
                method: 'GET',
                credentials: 'include'
            })
            const data = await res.json()
            if (!res.ok) {
                navigate('/login')
            } else {
                setUser({_id: data.user._id, username: data.user.username, email: data.user.email})
                console.log('User set: ', data)
                fetchExpenses()
            }
        } catch (err) {
            console.log('Error fetching user', err)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        if (isSidebarOpen) {
            document.body.classList.add('sidebar-open')
        } else {
            document.body.classList.remove('sidebar-open')
        }
    }, [isSidebarOpen])

    return (
        <>
            <div className="main-header">
                <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            </div>
            <div className="main-layout">
                <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} >
                    <Sidebar user={user} toggleSidebar={toggleSidebar} />
                </div>
                <div className="main-content">
                    <Outlet />
                </div>
            </div>
        </>
    )
}