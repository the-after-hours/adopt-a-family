import React from 'react';
import App from '../App';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import customTheme from '../../theme';

const context = {
  muiTheme: customTheme
};

describe('App', () => {
  test('App snapshot', () => {
    const component = shallow(<App />, { context });
    const tree = toJson(component);

    expect(tree).toMatchSnapshot();
  });
});