import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const Layout = ({ children }) => {
    return (
        <div className="grid grid-rows-layout min-h-screen">
            <header className="w-full">
                <Navbar />
            </header>
            <main className="w-full">
                {children}
            </main>
            <footer className="w-full">
                <Footer />
            </footer>
        </div>
    );
};

export default Layout;