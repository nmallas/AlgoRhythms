import React from "react";

export default function Footer() {
    return (
        <footer id="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <h2>Contact</h2>
                    <p className="footer-contact"> Email: <a href="mailto:nmallas23@gmail.com">nmallas23@gmail.com</a></p>
                    <p className="footer-contact"> Phone: <a href="tel:123-456-7890">702-417-6017</a></p>
                    <ul className="icons">
                        <li><a href="https://github.com/nmallas" className="fab fa-github icon fa-2x" target="_blank" rel="noopener noreferrer"><span class="label" hidden>Github</span></a></li>
                        <li><a href="https://angel.co/u/nicholas-mallas" className="fab fa-angellist icon fa-2x" target="_blank" rel="noopener noreferrer"><span class="label" hidden>AngelList</span></a></li>
                        <li><a href="https://www.linkedin.com/in/nicholas-mallas-140630106/" className="fab fa-linkedin icon fa-2x" target="_blank" rel="noopener noreferrer"><span class="label" hidden>Linkedin</span></a></li>
                    </ul>
                    <p>&copy; Nick Mallas 2020</p>
                </div>
            </div>
		</footer>
    )
}
