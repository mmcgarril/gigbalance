import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/auth.css'

export default function Login() {
    const [ loginEmail, setLoginEmail ] = useState('')
    const [ loginPassword, setLoginPassword ] = useState('')

    const navigate = useNavigate()

    const handleEmail = (e) => {
        const input = e.target.value
        setLoginEmail(input)
    }

    const handlePassword = (e) => {
        const input = e.target.value
        setLoginPassword(input)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!loginEmail || !loginPassword) {
            alert('All fields are required')
            return
        }

        const formData = {
            email: loginEmail,
            password: loginPassword
        }

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
                credentials: 'include'
            })
            const data = await res.json()
            if (!res.ok) {
                alert(data.message)
                return
            } else {
                navigate('/home')
            }
        } catch (err) {
            console.log('Server error', err)
        }
    }

    return (
        <>
            <div className='background'>
                <div className="login-container">
                    <h2>Login</h2>
                    <form className='login-form'>
                        <div className='login-field'>    
                            <label htmlFor="email">Email<span className="required">*</span></label>
                            <input type="email" id="email" value={loginEmail} 
                                onChange={handleEmail} autoComplete="off" required />
                        </div>
                        <div className='login-field'>
                            <label htmlFor="password">Password<span className="required">*</span></label>
                            <input type="password" id="password" value={loginPassword} 
                                onChange={handlePassword} autoComplete="off" required />
                        </div>
                        <button className='button' onClick={handleSubmit}>Submit</button>
                        <h5>Need an account? Sign up <a href='/register'>HERE</a></h5>
                    </form>
                </div>
            </div>
        </>
    )
}