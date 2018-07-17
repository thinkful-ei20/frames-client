import React from 'react';
import {Field} from '../components/Forms/field';
import {shallow, mount} from 'enzyme';

it('renders without crashing', () => {
  shallow(<Field 
    id={'testId'}
    input = {{
      name : 'test-name',
    }}
    label={'testLabel'}
    meta = {{
      error: 'testError',
      touched: null,
    }}
    
  />);
});
