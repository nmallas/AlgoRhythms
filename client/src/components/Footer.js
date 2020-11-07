import React from "react";

export default function Footer() {
    return (
        <footer id="footer">
			<h2>Contact</h2>
			<p class="footer-contact"> Email: <a href="mailto:nmallas23@gmail.com">nmallas23@gmail.com</a></p>
			<p class="footer-contact"> Phone: 702-417-6017 </p>
			<ul class="icons">
				<li><a href="https://github.com/nmallas" class="icon brands fa-github" target="_blank"><span class="label">Github</span></a></li>
				<li><a href="https://angel.co/u/nicholas-mallas" class="icon brands fa-angellist" target="_blank"><span class="label">AngelList</span></a></li>
				<li><a href="https://www.linkedin.com/in/nicholas-mallas-140630106/" class="icon brands fa-linkedin" target="_blank"><span class="label">Linkedin</span></a></li>
			</ul>
			<div>&copy; Nick Mallas</div>
		</footer>
    )
}
