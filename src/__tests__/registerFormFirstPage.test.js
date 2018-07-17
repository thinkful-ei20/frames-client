import React from 'react';
import {shallow} from 'enzyme';
import {RegisterFormFirstPage} from '../components/Forms/registerFormFirstPage';

describe('RegisterFormFirstPage', ()=>{

  it('should render without crashing', ()=>{
    shallow(<RegisterFormFirstPage />);
  });
  
});