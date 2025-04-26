import { useEffect, useState } from "react"
import ExpenseModal from "../components/ExpenseModal"
import { useExpenses } from "../context/ExpensesContext"
import { formatMMDD, formatMMDDYYYY } from "../utils"
import './ExpenseHistory.css'

export default function ExpenseHistory() {
    const { expenses } = useExpenses()
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ modalMode, setModalMode ] = useState(null)
    const [ modalId, setModalId ] = useState(null)
    /* const [ year, setYear ] = useState('2025') */

    const handleCloseExpenseModal = () => {
        setIsModalOpen(false)
    }

    const handleOpenExpenseModal = ({mode, id}) => {
        setModalMode(mode)
        setModalId(id)
        setIsModalOpen(true)
    }

    const handleYearSelect = (e) => {
        setYear(e.target.value)
    }

    return (
        <>
            <div className="history-container">
                <div className="history-header">
                    <div className="left">
                        {/* <select className="year-select" onChange={handleYearSelect}>
                            <option>2025</option>
                            <option>2024</option>
                            <option>2023</option>
                            <option>2022</option>
                        </select> */}
                    </div>
                    <div className="title">
                        <h3>Expenses</h3>
                    </div>
                    <div className="right">
                        <button className={`button ${isModalOpen ? 'hidden' : ''}`} 
                            onClick={() => {handleOpenExpenseModal({mode: 'Add'})}}>+ Add Expense</button>
                    </div>
                </div>
                {isModalOpen &&
                    <ExpenseModal
                        modalMode={modalMode}
                        modalId={modalId}
                        handleCloseExpenseModal={handleCloseExpenseModal}/>
                }
                <div className="history-table-wrapper">
                    <table className="history-table">
                        <tbody>
                            <tr className="history-row">
                                <th style={{width:"13%"}}>Date</th>
                                <th style={{width:"13%"}}><span className="desktop-display">Pay </span>Method</th>
                                <th style={{width:"13%"}}>Cost</th>
                                <th style={{width:"17%"}}>Category</th>
                                <th style={{width:"17%"}}>Company</th>
                                <th style={{width:"17%"}}>Description</th>
                                <th style={{width:"5%"}}>
                                    <span className="desktop-display">Update</span>
                                </th>
                                <th style={{width:"5%"}}>
                                    <span className="desktop-display">Delete</span>
                                </th>
                            </tr>
                            {expenses.map((exp, index) => {
                                return (
                                    <tr key={exp._id} className="history-row">
                                        <td>
                                            <span className="desktop-display">{formatMMDDYYYY(exp.date)}</span>
                                            <span className="mobile-display">{formatMMDD(exp.date)}</span>
                                        </td>
                                        <td>{exp.payMethod}</td>
                                        <td>{exp.cost.toFixed(2)}</td>
                                        <td>{exp.category}</td>
                                        <td>{exp.company}</td>
                                        <td>{exp.description}</td>
                                        <td style={{width:"5%", fontSize: '16px'}}>
                                            <i className="fa-solid fa-file-pen icon-button" 
                                                onClick={() => {handleOpenExpenseModal({mode: 'Update', id: exp._id})}}></i>
                                        </td>
                                        <td style={{width:"5%", fontSize: '16px'}}>
                                            <i className="fa-solid fa-trash-can icon-button"
                                                onClick={() => {handleOpenExpenseModal({mode: 'Delete', id: exp._id})}}></i>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {expenses.length == 0 &&    
                        <p className="empty-message">No expenses added yet!</p>
                    }
                </div>
            </div>
        </>
    )
}