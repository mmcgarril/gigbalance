import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Sidebar.css"

export default function Sidebar(props) {
    const { user, toggleSidebar } = props
    const [ selectedPage, setSelectedPage ] = useState('')

    const navigate = useNavigate()

    const logout = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            })
            const message = await res.json()
            console.log(message)
            navigate('/login')
        } catch (err) {
            console.error("Error logging out", err)
        }
    }

    function handleChangePage(page) {
        setSelectedPage(page)
        navigate(page)
        toggleSidebar()
    }

    return (
        <div className="sidebar">
            <div className="nav">
                <h3>Hello {user?.username}!</h3>
                <button className="button" onClick={logout}>Log out</button>
                <div className="pages">
                    <div className={`page-button ${selectedPage == '' ? 'selected-page' : ''}`}
                                onClick={() => handleChangePage('')}>Dashboard</div>
                    <div className={`page-button ${selectedPage == 'expenses' ? 'selected-page' : ''}`}
                                onClick={() => handleChangePage('expenses')}>Expenses</div>    
                    {/* <div className={`page-button ${selectedPage == 'settings' ? 'selected-page' : ''}`}
                                onClick={() => handleChangePage('settings')}>Settings</div> */} 
                </div>
            </div>
            <div className="logo">
                <h2>GigBalance</h2>
            </div>
            
            
        </div>
    )
}