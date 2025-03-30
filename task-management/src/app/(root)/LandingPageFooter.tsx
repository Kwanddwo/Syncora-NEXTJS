
import "@/styles/landingPage.css"
export default function LandingPageFooter() {
    return (

            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <img
                            className="logo"
                            src="https://c.animaapp.com/m8uiljkus1uQ04/img/light-mode-text-1-4.png"
                            alt="Syncora logo"
                        />
                        <p className="brand-description">A simplified task manager.</p>
                    </div>
                    <nav className="footer-links">
                        <div className="link-group">
                            <h2>Learn</h2>
                            <ul>
                                <li><a href="#">Guides</a></li>
                                <li><a href="#">Tutorials</a></li>
                            </ul>
                        </div>
                        <div className="link-group">
                            <h2>Resources</h2>
                            <ul>
                                <li><a href="#">Documentation</a></li>
                                <li><a href="#">GitHub</a></li>
                            </ul>
                        </div>
                        <div className="link-group">
                            <h2>Legal</h2>
                            <ul>
                                <li><a href="#">Terms of Service</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className="footer-copyright">
                    <p>© 2025 Syncora. Built by AFM.</p>
                </div>
            </footer>
    );
}
