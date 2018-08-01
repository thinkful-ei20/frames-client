import React from 'react';
import {CreateShiftForm} from '../components/forms/create-shift-form';
import {shallow} from 'enzyme';

describe('Create Shift Form Component', () => {
	it('should render without crashing', () => {
		shallow(
			<CreateShiftForm
				show={false}
				dispatch={jest.fn}
				error={null}
				employees={[
					{}
				]}
			/>);
	});
});
