import React from 'react';
import {shallow} from 'enzyme';

import {ModalConductor} from '../components/modals/modal-conductor';

describe('Modal Conductor', () => {
	it('should render without crashing', () => {
		shallow(<ModalConductor />);
	});

	it('should pass the correct contentLabel on modalType', () => {
		const modalTypes = {
			'edit': 'Edit a Frame',
			'employee': 'Edit an Employee',
			'newEmployee': 'Create an Employee',
			'newFrame': 'Create a Frame',
			'superFilter': 'Filter'
		};

		Object.keys(modalTypes).forEach(type => {
			expect(shallow(<ModalConductor modalType={type}/>).props()['contentLabel']).toEqual(modalTypes[type]);
		});
	});

	it('should pass the correct child component on modalType', () => {
		const modalTypes = {
			'edit': 'EditFrameForm',
			'employee': 'EditEmployeeForm',
			'newEmployee': 'CreateEmployeeForm',
			'newFrame': 'CreateFrameForm',
			'superFilter': 'SuperFilter'
		};

		Object.keys(modalTypes).forEach(type => {
			const wrappedComponent = shallow(<ModalConductor modalType={type}/>).props()['children'].type.WrappedComponent;
			expect(wrappedComponent.name).toEqual(modalTypes[type]);
		});
	});
});