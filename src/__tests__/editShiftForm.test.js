import React from 'react';
import {shallow} from 'enzyme';
import {EditShiftForm} from '../components/forms/edit-shift-form';

describe('Edit Shift Form', () => {
	it('should be render', () => {
		shallow(
			<EditShiftForm
				dispatch={jest.fn}
				currentFrame={{}}
				employees={{employees: [{}]}}
			/>
		);
	});
});