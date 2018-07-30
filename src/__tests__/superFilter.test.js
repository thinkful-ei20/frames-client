import React from 'react';
import {shallow} from 'enzyme';
import {SuperFilter} from '../components/super-filter';

describe('Super Filter', () => {
	it('should render without crashing',() => {
		shallow(<SuperFilter
			employees={[{},{}]}
			frames={[{},{}]}
		/>);
	});

});