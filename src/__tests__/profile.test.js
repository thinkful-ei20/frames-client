import React from 'React';
import {shallow} from 'enzyme';
import {Profile} from '../components/profile';

describe('Profile', ()=>{
	it('should render without crashing', ()=>{
		shallow(<Profile 
			adminId ={{
				id : 'test'
			}}
			dispatch={()=>{'test'}}/>);
	});
});