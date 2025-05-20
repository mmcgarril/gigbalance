import { useEffect, useState } from "react"
import { useExpenses } from "../context/ExpensesContext"
import { categories, successMessages } from "../utils"
import './ExpenseForm.css'

export default function ExpenseForm(props) {
    const { modalMode, modalId, handleCloseExpenseModal } = props
    const { expenses, fetchExpenses } = useExpenses()
    const [ success, setSuccess ] = useState(false)
    const [ formData, setFormData ] = useState({
        date: '',
        payMethod: '',
        cost: '',
        category: '',
        company: '',
        description: ''
    })    
    
    const handleFormData = (e) => {
        const { name, value } = e.target
        let newValue = value

        //force 2 decimals max 
        if (name === 'cost') {
            const parts = newValue.split(".")
            if (parts[1] && parts[1].length > 2) {
                newValue = `${parts[0]}.${parts[1].slice(0, 2)}`
            }
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue
        }))
    }

    const fetchFormData = () => {
        const expenseToEdit = expenses.find((e) => e._id === modalId)

        //populate form with found data
        setFormData({
            date: expenseToEdit.date.slice(0, 10),
            payMethod: expenseToEdit.payMethod,
            cost: expenseToEdit.cost,
            category: expenseToEdit.category,
            company: expenseToEdit.company,
            description: expenseToEdit.description
        })
    }

    const addExpense = async () => {
        try {
            const res = await fetch('/api/expenses', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
                credentials: 'include'
            })

            const data = await res.json()
            if (res.ok) {
                console.log('Expense saved', data)
                fetchExpenses()
                setSuccess(true)
                setTimeout(() => {
                    handleCloseExpenseModal()
                }, 2000)
            } else {
                console.log('Error saving expense', data.message)
            }
        } catch (error) {
            console.log('Server error', error)
        }
    }

    const updateExpense = async () => {
        try {
            const res = await fetch(`/api/expenses/${modalId}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
                credentials: 'include'
            })
            if (res.ok) {
                console.log('expense updated')
                fetchExpenses()
                setSuccess(true)
                setTimeout(() => {
                    handleCloseExpenseModal()
                }, 2000)
            }
        } catch (error) {
            console.log('Error updating expense', error)
        }
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()

        if (!formData.date || !formData.cost || !formData.category
            || !formData.description) {
                alert('Please fill in all required fields')
                return
            }

        if (modalMode === 'Add') {
            addExpense()
        }

        if (modalMode === 'Update') {
            updateExpense()
        }
    }

    useEffect(() => {
        if (modalMode === 'Update' && modalId) {
            fetchFormData()
        }
    }, [])
    
    return (
        <>
            {success ? (
                <div className='success-message'>{successMessages[modalMode]}</div>
            ) : (
                <form className='expense-form'>
                    <div className="form-heading form-row">
                        <h3>{modalMode} Expense</h3>
                        <p className='close-btn' onClick={handleCloseExpenseModal}>X</p>
                    </div>
                    <div className="form-row">
                        <label htmlFor='date'>Date <span className="required">*</span></label>
                        <input type='date' name='date' id='date' value={formData.date} onChange={handleFormData} />
                    </div>
                    <div className="form-row">
                        <label htmlFor='pay-method'>Pay Method</label>
                        <input type='text' name='payMethod' id='pay-method' autoComplete="off" 
                            value={formData.payMethod} onChange={handleFormData} />
                        <div className="info-container">
                            <i className="fa-solid fa-circle-info"></i>
                            <div className="info-blurb">'Visa', 'Amex', 'cash', 'venmo', etc.</div>
                        </div>
                    </div>
                    <div className="form-row">
                        <label htmlFor='cost'>Cost <span className="required">*</span></label>
                        <input type='number' name='cost' id='cost' step='0.01' placeholder='$0.00'
                            value={formData.cost} onChange={handleFormData} />
                    </div>
                    <div className="form-row wrap">
                        <label htmlFor='category'>Category <span className="required">*</span></label>
                        <select id='category' name='category' value={formData.category} onChange={handleFormData}>
                            <option value="" disabled hidden>Select one</option>
                            {categories.map((cat, index) => {
                                return (
                                    <option key={index} id={cat}>{cat}</option>
                                )
                            })}
                        </select>
                        <p className='help-link'>
                            <a href="/category-guide" target="_blank" 
                                rel="noopener noreferrer">need help choosing a category?</a>
                        </p>
                    </div>
                    <div className="form-row">
                        <label htmlFor='company'>Company</label>
                        <input type='text' name='company' id='company' autoComplete="off" 
                            value={formData.company} onChange={handleFormData} />
                    </div>
                    <div className="form-row">
                        <label htmlFor='description'>Description <span className="required">*</span></label>
                        <input type='text' name='description' id='description' autoComplete="off" 
                            value={formData.description} onChange={handleFormData} />
                    </div>
                    <div className="form-row">
                        <button className='button submit-btn' onClick={handleSubmitForm}>Submit</button>
                    </div>
                </form>
            )}                
        </>
    )
}