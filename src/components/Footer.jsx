import React from "react";
import App from "../App";
import "../App.css"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-column">
                    <h4>COMPANY</h4>
                    <a href="#">About us</a>
                    <a href="#">Careers</a>
                    <a href="#">Terms</a>
                    <a href="#">Privacy</a>
                    <a href="#">Interest Based Ads</a>
                    <a href="#">Ad Preferences</a>
                    <a href="#">Help</a>
                </div>
                <div className="footer-column">
                    <h4>WORK WITH US</h4>
                    <a href="#">Authors</a>
                    <a href="#">Advertise</a>
                    <a href="#">Authors & ads blog</a>
                </div>
                <div className="footer-column">
                    <h4>CONNECT</h4>
                    <div className="social-icons">
                        <a href="#"><i class="bi bi-facebook"></i></a>
                        <a href="#"><i class="bi bi-twitter-x"></i></a>
                        <a href="#"><i class="bi bi-instagram"></i></a>
                        <a href="#"><i class="bi bi-linkedin"></i></a>
                    </div>
                </div>
                <div className="footer-column app-buttons">
                    <a href="#"><i class="bi bi-google-play"></i> Download on App Store</a>
                    <p>© 2025 YourCompany, Inc.</p>
                </div>
            </div>
        </footer>

    );
};

export default Footer;