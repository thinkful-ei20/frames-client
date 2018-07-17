import React from 'react';
import {shallow} from 'enzyme';
import {RegisterFormSecondPage} from '../components/Forms/registerFormSecondPage';

describe('RegisterFormSecondPage', ()=>{
  it('should render without crashing', ()=>{
    shallow(<RegisterFormSecondPage/>);
  });
});
