export default function Header(props) {
    const { isSidebarOpen, toggleSidebar } = props

    return (
        <>
            <button className="menu-button" onClick={toggleSidebar}>
                <i className={`fa-solid ${isSidebarOpen ? 'fa-bars' : 'fa-arrow-left'}`}></i>
            </button>
            <h2>GigBalance</h2>
        </>
    )
}