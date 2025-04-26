import { categories } from "../utils"

export default function CategoryTotals(props) {
    const { totals } = props

    const midpointIndex = Math.ceil(categories.length / 2)
    const col1 = categories.slice(0, midpointIndex)
    const col2 = categories.slice(midpointIndex)

    return (
        <>  
            <div className="category-totals">
                <div className="category-grid">
                    <div className="column">
                        {col1.map((cat, index) => {
                            return (
                                <div key={index} className="col-item">
                                    <div className="category-name">{cat}:</div>
                                    <div className="category-total">
                                        {totals[cat] ? totals[cat].toFixed(2) : '0.00'}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="column">
                        {col2.map((cat, index) => {
                                return (
                                    <div key={index} className="col-item">
                                        <div className="category-name">{cat}:</div>
                                        <div className="category-total">
                                            {totals[cat] ? totals[cat].toFixed(2) : '0.00'}
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </div>
        </>
    )
}