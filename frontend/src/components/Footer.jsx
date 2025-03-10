const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white text-center p-4 mt-8">
            <p>&copy; {new Date().getFullYear()} CGU Marketplace | CV Raman Global Univeristy</p>
            <p className="text-sm">
                <a href="/about" className="hover:underline mx-2">About</a> |
                <a href="/terms" className="hover:underline mx-2">Terms</a> |
                <a href="/privacy" className="hover:underline mx-2">Privacy</a> |
                <a href="cgumarketplace@gmail.com" className="hover:underline mx-2">Contact</a>
            </p>
        </footer>
    );
};

export default Footer;
