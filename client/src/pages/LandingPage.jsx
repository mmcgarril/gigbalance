import { Link } from 'react-router-dom'
import '../styles/auth.css'

export default function LandingPage() {
    return (
        <>
            <div className='background'>
                <div className="home-container">
                    <h2>Welcome to GigBalance</h2>
                    <h5>A business expense tracker for musicians</h5>
                    <div className="home-buttons-container">
                        <Link to="/login">
                            <button className='button'>Login</button>
                        </Link>
                        
                        <Link to="/register">
                            <button className='button'>Register</button>
                        </Link>
                    </div>  
                </div>
            </div>
        </>
    )
}