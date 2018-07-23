import React from 'react';

function EmployeeCard (props){
	return (
		<div>
			<h2>{props.name}</h2>
			<p>{props.email}</p>
			<p>{props.phoneNumber}</p>
		</div>
	);
}

export default EmployeeCard;