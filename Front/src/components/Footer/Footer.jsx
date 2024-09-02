import './Footer.sass';

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer>
            <p>Copyright {year} Argent Bank</p>
        </footer>
    );
}

export default Footer;