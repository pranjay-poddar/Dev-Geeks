import Header from "./Header";
import "./CSS/Header.css" ; 

const Layout = ({ children }) => {
    return (
        <div className="main">
            <Header />
            {children}
        </div>
    )
}

export default Layout;