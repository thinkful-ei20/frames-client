import React from 'react';
import {shallow} from 'enzyme';
import {EditFrameForm} from '../components/forms/edit-frame-form';

describe('Edit Frame Form', () => {
	it('should be render', () => {
		shallow(
			<EditFrameForm
				dispatch={jest.fn}
				currentFrame={{}}
				employees={{employees: [{}]}}
			/>
		);
	});
});