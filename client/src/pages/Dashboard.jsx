import { useEffect, useState } from "react"
import CategoryTotals from "../components/CategoryTotals"
import { useAuth } from "../context/AuthContext"
import Chart from "../components/Chart"
import { findGrandTotal } from "../utils"

export default function Dashboard() {
    const [ totals, setTotals ] = useState([])
    const { user } = useAuth()
 
    const grandTotal = findGrandTotal(totals)

    const fetchTotals = async () => {
        try {
            const res = await fetch(`/api/expenses/totals/${user._id}`, {
                method: "GET",
                credentials: "include"
            })
            const data = await res.json()
            console.log('totals include: ', data)
            if (!res.ok) {
                console.log('Totals not found')
                return
            }
            setTotals(data)
        } catch (error) {
            console.log('Error fetching totals', error)
        }
    }

    useEffect(() => {
        if (user?._id) {
            fetchTotals()
        }
    }, [user])

    return (
        <>
            <div className="upper-totals-container">
                <div className="grand-total-container">
                    <h3>TOTALS: ${grandTotal}</h3>
                </div>
                <Chart totals={totals} />
            </div>
            <CategoryTotals totals={totals} grandTotal={grandTotal}/>
        </>   
    )
}