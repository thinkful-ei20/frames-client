import React from 'react';

import './styles/about.css';

import employeeScreenshot from '../images/employee_screenshot.png';
import dashboardScreenshot from '../images/dashboard_screenshot.png';
import filterScreenshot from '../images/filter_screeshot.png';

export const About = () => {
	return(
		<React.Fragment>
			<section className="about-section">
				<div className="about-section-img-wrapper">
					<img src={dashboardScreenshot} alt="Dashboard screenshot"/>
				</div>
				<div className="about-section-text-wrapper">
					<h3>Mobile Optimized</h3>
					<p>View, update and edit your team's entire schedule on the go in a beautiful, built-for-mobile dashboard.</p>
				</div>
			</section>

			<section className="about-section">
				<div className="about-section-text-wrapper">
					<h3>Customizable view</h3>
					<p>Filter your schedule however you like with advanced tools that make at-a-glace decsions easier than ever.</p>
				</div>
				<div className="about-section-img-wrapper">
					<img src={filterScreenshot} alt="Dashboard screenshot"/>
				</div>
			</section>

			<section className="about-section">
				<div className="about-section-img-wrapper">
					<img src={employeeScreenshot} alt="Employee screenshot"/>
				</div>
				<div className="about-section-text-wrapper">
					<h3>Employee management</h3>
					<p>Keep track of all your team members, their contact infromation and their schedule for easy communication and smoother operations.</p>
				</div>
			</section>
		</React.Fragment>
	);
};

export default About;