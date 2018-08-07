import React from 'react';
import './styles/footer.css';

export default function Footer() {
	return (
		<footer role="contentinfo" className="footer-style">
			<p>Made with love by the MERNtalists™</p>
			<ul>
        <li>
          <a href="https://github.com/mdargitz" title="Marina Dargitz Github">Marina Dargitz</a>
          <img
            src='https://cdn.iconscout.com/public/images/icon/free/png-128/github-logo-brand-development-tools-318f14f5797bb6cc-128x128.png'
            alt='Github logo'
          />
        </li>

				<li>
          <a href="https://github.com/csprier" title="Cameron Prier Github">Cameron Prier</a>
          <img
            src='https://cdn.iconscout.com/public/images/icon/free/png-128/github-logo-brand-development-tools-318f14f5797bb6cc-128x128.png'
            alt='Github logo'
          />
        </li>

				<li>
					<a href="https://github.com/valsakel" title="Marina Valiquette Github">Marina Valiquette</a>
					<img
						src='https://cdn.iconscout.com/public/images/icon/free/png-128/github-logo-brand-development-tools-318f14f5797bb6cc-128x128.png'
						alt='Github logo'
					/>
				</li>

        <li>
          <a href="https://github.com/patersog" title="Gianluca Paterson Github">Gianluca Paterson</a>
          <img
            src='https://cdn.iconscout.com/public/images/icon/free/png-128/github-logo-brand-development-tools-318f14f5797bb6cc-128x128.png'
            alt='Github logo'
          />
        </li>
			</ul>
		</footer>
	);
}