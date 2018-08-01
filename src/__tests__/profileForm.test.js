import React from 'React';
import {shallow} from 'enzyme';
import {ProfileForm} from '../components/forms/profile-form';

describe('ProfileForm', ()=>{
	it('should render without crashing', ()=>{
		shallow(<ProfileForm 
			adminId='PropTypes.string'
			companyName='PropTypes.string'
			username='PropTypes.string'
			email='PropTypes.string'
			phone={123}
			dispatch={()=>{}}
			setEdit={() => {}}
			handleSubmit={() => {}}
		/>);
	});
});