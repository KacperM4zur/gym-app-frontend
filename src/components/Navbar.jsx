import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-yellow-200 text-black p-4">
            <ul className="flex space-x-4">
                <li><Link to={"/"}>Strona główna</Link></li>
                <li><Link to={"/guides"}>Poradniki</Link></li>
                <li><Link to={"/faq"}>FAQ</Link></li>
                <li><Link to={"/about"}>Informacje o aplikacji</Link></li>
                <li><Link to={"/contact"}>Kontakt</Link></li>
                <li><Link to={"/login"}>Logowanie</Link></li>
                <li><Link to={"/register"}>Rejestracja</Link></li>
            </ul>
        </nav>
    )
}
export default Navbar;