import React from 'react';
import {shallow} from 'enzyme';

import {ModalConductor} from '../components/modals/modal-conductor';

describe('Modal Conductor', () => {
	it('should render without crashing', () => {
		shallow(<ModalConductor />);
	});
});