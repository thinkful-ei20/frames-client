import React from 'react';

import './styles/about.css';

import employeeScreenshot from '../images/employee_screenshot.png';
import dashboardScreenshot from '../images/dashboard_screenshot.png';

export const About = () => {
	return(
		<React.Fragment>
			<section className="about-section">
				<div className="about-section-img-wrapper">
					<img src={dashboardScreenshot} alt="Dashboard screenshot"/>
				</div>
				<div className="about-section-text-wrapper">
					<h3>Mobile Optimized</h3>
					<p>Interface is optimized to display a large amount of densely organized information on mobile devices.</p>
				</div>
			</section>

			<section className="about-section">
				<div className="about-section-text-wrapper">
					<h3>Customizable view</h3>
					<p>Advanced Filter options allow to customize the schedule overview by selecting shift times,
            or employee name.</p>
				</div>
				<div className="about-section-img-wrapper">
					<img src={dashboardScreenshot} alt="Dashboard screenshot"/>
				</div>
			</section>

			<section className="about-section">
				<div className="about-section-img-wrapper">
					<img src={employeeScreenshot} alt="Employee screenshot"/>
				</div>
				<div className="about-section-text-wrapper">
					<h3>Employee management</h3>
					<p>And it is also a very good one</p>
				</div>
			</section>
		</React.Fragment>
	);
};

export default About;