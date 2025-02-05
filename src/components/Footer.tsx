import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="footer py-5 text-center">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Palais du Raja. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;