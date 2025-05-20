import { useState } from "react"
import { useNavigate } from "react-router-dom"
import '../styles/auth.css'

export default function Register() {
    const [ registerEmail, setRegisterEmail ] = useState('')
    const [ registerUsername, setRegisterUsername ] = useState('')
    const [ registerPassword, setRegisterPassword ] = useState('')

    const navigate = useNavigate()

    const minPasswordLength = 6

    const handleEmail = (e) => {
        const input = e.target.value
        setRegisterEmail(input)
    }

    const handleUsername = (e) => {
        const input = e.target.value
        setRegisterUsername(input)
    }

    const handlePassword = (e) => {
        const input = e.target.value
        setRegisterPassword(input)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
 
        if (!emailRegex.test(registerEmail)) {
            alert("Please enter a valid email")
            return
        }

        if (registerPassword.length < minPasswordLength) {
            alert(`Password must be at least ${minPasswordLength} characters long`)
            return
        }

        if (!registerEmail || !registerUsername || !registerPassword) {
            alert("All fields are required")
            return
        }

        const formData = {
            email: registerEmail,
            username: registerUsername,
            password: registerPassword
        }

        try {
            const res = await fetch('/api/auth/register', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
                credentials: 'include'
            })
            const data = await res.json()
            if (!res.ok) {
                alert(data.message)
            } else {
                navigate('/home')
            }

        } catch (err) {
            console.log('Server error:', err)
        }
        setRegisterEmail('')
        setRegisterUsername('')
        setRegisterPassword('')
    }

    return (
        <>
            <div className="background">
                <div className="register-container">
                    <h2>Create an account</h2>
                    <form className='register-form'>
                        <div className="register-field">
                            <label htmlFor="email">Email<span className="required">*</span></label>
                            <input type="email" id="email" value={registerEmail} 
                                onChange={handleEmail} autoComplete="off" />
                        </div>
                        <div className="register-field">
                            <label htmlFor="username">Username<span className="required">*</span></label>
                            <input type="text" id="username" value={registerUsername} 
                                onChange={handleUsername} autoComplete="off" />
                        </div>
                        <div className="register-field">
                            <label htmlFor="password">Password<span className="required">*</span>
                                <br></br>(minimum {minPasswordLength} characters)</label>
                            <input type="password" id="password"value={registerPassword} 
                                onChange={handlePassword} autoComplete="off" />
                        </div>
                        <button className='button' onClick={handleSubmit}>Submit</button>
                        <h5><a href='/login'>Already have an account?</a></h5>
                    </form>
                </div>
            </div>
        </>
    )
}