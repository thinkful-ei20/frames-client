import React from 'react';

export const About = () => {
	return(
		<React.Fragment>
			<section className="about-section">
        <div className="about-section-img-wrapper">
          <img src="http://trupanion.com/blog/wp-content/uploads/2011/07/1155124917_cats-110112-3413-sm.jpg"/>
        </div>
				<div className="about-section-text-wrapper">
					{/*<h2>Catch Phrase here</h2>*/}
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
          <img src="http://trupanion.com/blog/wp-content/uploads/2011/07/1155124917_cats-110112-3413-sm.jpg"/>
        </div>
      </section>

      <section className="about-section">
        <div className="about-section-img-wrapper">
          <img src="http://trupanion.com/blog/wp-content/uploads/2011/07/1155124917_cats-110112-3413-sm.jpg"/>
        </div>
        <div className="about-section-text-wrapper">
          <h3>Second reason it is cool</h3>
          <p>And it is also a very good one</p>
        </div>
      </section>

		</React.Fragment>
	);
};

export default About;