import React from 'React';
import {shallow} from 'enzyme';
import {CardList} from '../components/card-list';

describe('CardList', () => {
	describe('Unconnected', () => {

		let wrapper;

		const props = {
			list : [{
				employeeId: {
					firstname: 'test',
					lastname: 'test',
					img:'test.jpg'
				},
				startFrame: '2018-07-27T12:00:00.000Z',
				endFrame: '2018-07-27T15:00:00.000Z',
				id : '000'
			}]
		};

		const dispatch = jest.fn();

		beforeEach(() => {
			wrapper = shallow(<CardList dispatch={dispatch} {...props}/> );
		});

		it('should render without crashing', () => {
			expect(wrapper).toHaveLength(1);
		});
	});
});