import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const ExpensesContext = createContext()

export const useExpenses = () => {
    return useContext(ExpensesContext)
}

export const ExpensesProvider = ({ children }) => {
    const [ expenses, setExpenses ] = useState([])
    const { user } = useAuth()

    const fetchExpenses = async () => {
        try {
            //fetch expense data
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/expenses`, {
                method: 'GET',
                credentials: 'include'
            })
            const data = await res.json()
            setExpenses(data || [])
        } catch (err) {
            console.log('Error fetching expenses', err)
        }
    }

    useEffect(() => {
        if (user?._id) {
            fetchExpenses()
        }
    }, [user])

    return (
        <ExpensesContext.Provider value={{ expenses, setExpenses, fetchExpenses }}>
            { children }
        </ExpensesContext.Provider>
    )
}