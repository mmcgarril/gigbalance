import { useExpenses } from "../context/ExpensesContext"

export default function DeleteExpense(props) {
    const { modalId, handleCloseExpenseModal } = props
    const { fetchExpenses } = useExpenses()

    const deleteExpense = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/expenses/${modalId}`, {
                method: "DELETE",
                credentials: 'include'
            })
            if (res.ok) {
                console.log('expense deleted')
                fetchExpenses()
                handleCloseExpenseModal()
            }
        } catch (error) {
            console.log('Error deleting expense', error)
        }
    }

    return (
        <>
            <div className="delete-window">
                <div className="form-heading form-row">
                    <div></div>
                    <p className='close-btn' onClick={handleCloseExpenseModal}>X</p>
                </div>
                <h4>Are you sure you want to delete this expense?</h4>
                <div className="delete-btns">
                    <button className="button" onClick={handleCloseExpenseModal}>Cancel</button>
                    <button className="button" onClick={deleteExpense}>Delete</button>
                </div>
            </div>
        </>
    )
}