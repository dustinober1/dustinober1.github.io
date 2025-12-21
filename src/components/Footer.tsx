export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className="container">
                <p>&copy; {currentYear} Dustin J. Ober. Built with Next.js.</p>
            </div>
        </footer>
    );
}
