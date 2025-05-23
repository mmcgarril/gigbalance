export default function Header(props) {
    const { isSidebarOpen, toggleSidebar } = props

    return (
        <>
            <button className="menu-button" onClick={toggleSidebar}>
                <i className={`fa-solid ${isSidebarOpen ? 'fa-arrow-left' : 'fa-bars'}`}></i>
            </button>
            <h2>GigBalance</h2>
        </>
    )
}