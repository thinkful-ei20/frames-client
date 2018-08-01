import React from 'react';
import {shallow} from 'enzyme';
import {RegisterFormSecondPage} from '../components/forms/register-form-second-page';

describe('RegisterFormSecondPage', ()=>{
  it('should render without crashing', ()=>{
    shallow(<RegisterFormSecondPage/>);
  });
});
