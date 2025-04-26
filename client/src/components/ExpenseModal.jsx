import ReactDom from 'react-dom'
import ExpenseForm from './ExpenseForm'
import DeleteExpense from './DeleteExpense'

export default function ExpenseModal(props) {
    const { modalMode, modalId, handleCloseExpenseModal } = props

    return ReactDom.createPortal(
        <div className="modal-container">
            <div className="modal-overlay" onClick={handleCloseExpenseModal}></div>
            <div className="modal-content">
                {modalMode === 'Add' && 
                    <ExpenseForm modalMode={modalMode} handleCloseExpenseModal={handleCloseExpenseModal} />}
                {modalMode === 'Update' && 
                    <ExpenseForm modalMode={modalMode} modalId={modalId} handleCloseExpenseModal={handleCloseExpenseModal} />}
                {modalMode === 'Delete' && 
                    <DeleteExpense modalId={modalId} handleCloseExpenseModal={handleCloseExpenseModal} />}
            </div>
        </div>,
        document.getElementById('portal')
    )
}