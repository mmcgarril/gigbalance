import { categoryDescriptions } from "../utils"
import './CategoryGuide.css'

export default function CategoryGuide() {
    return (
        <div className='category-info-container'>
            <h3>Tips On Choosing Categories</h3>
            <p>The following categories are chosen to best help you at tax season. Examples are provided as a guide:</p>
            <table className="category-info-table">
                <tbody>
                    {Object.entries(categoryDescriptions).map(([key, value], index) => {
                        return (
                            <tr key={index} className="category-info-row">
                                <td style={{width:"20%"}}>{key}</td>
                                <td>{value}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}