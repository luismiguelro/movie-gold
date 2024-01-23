// Footer.js

import React from 'react';

const Footer = () => {
    return (
        <footer style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <p>&copy; {new Date().getFullYear()} Hecho con 💛 - <a href="https://github.com/luismiguelro" target="_blank" rel="noopener noreferrer">Luis Miguel Rodríguez</a></p>
        </footer>
    );
}

export default Footer;
