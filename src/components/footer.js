import React from 'react';
import './styles/footer.css';

export default function Footer() {
	return (
		<footer className="footer-style">
			<p>Made with love by the MERNtalists™</p>
			<ul>
				<li>
					<a href="https://github.com/mdargitz">Marina Dargitz</a>
					<img
						src='https://cdn.iconscout.com/public/images/icon/free/png-128/github-logo-brand-development-tools-318f14f5797bb6cc-128x128.png'
						alt='Marina Dargitz Github'
					/>
				</li>

				<li>
					<a href="https://github.com/csprier">Cameron Prier</a>
					<img
						src='https://cdn.iconscout.com/public/images/icon/free/png-128/github-logo-brand-development-tools-318f14f5797bb6cc-128x128.png'
						alt='Cameron Prier Github'
					/>
				</li>

				<li>
					<a href="https://github.com/patersog">Gianluca Paterson</a>
					<img
						src='https://cdn.iconscout.com/public/images/icon/free/png-128/github-logo-brand-development-tools-318f14f5797bb6cc-128x128.png'
						alt='Gianluca Paterson'
					/>
				</li>

				<li>
					<a href="https://github.com/Sakela17">Marina Valiquette</a>
					<img
						src='https://cdn.iconscout.com/public/images/icon/free/png-128/github-logo-brand-development-tools-318f14f5797bb6cc-128x128.png'
						alt='Marina Valiquette Github'
					/>
				</li>
			</ul>
		</footer>
	);
}