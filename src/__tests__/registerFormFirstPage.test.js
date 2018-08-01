import React from 'react';
import {shallow} from 'enzyme';
import {RegisterFormFirstPage} from '../components/forms/register-form-first-page';

describe('RegisterFormFirstPage', ()=>{

  it('should render without crashing', ()=>{
    shallow(<RegisterFormFirstPage />);
  });
  
});