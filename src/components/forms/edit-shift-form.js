import React from 'react';
import {connect} from 'react-redux';

import './styles/forms.css';

export class EditShiftForm extends React.Component {
	render() {
		return(
			<div className="form-wrapper">
				<h2 className="form-header">Edit Shift</h2>
				<form>
					<div>{'Placeholder Text'}</div>
				</form>
			</div>);
	}
}

// const mapStateToProps = state => ({
// 	isLoading: state.employee.reassign === null,
// });

export default connect()(EditShiftForm);