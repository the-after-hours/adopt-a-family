import React from 'react';
import Main from '../Main';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import customTheme from '../../theme';

const context = {
  muiTheme: customTheme
};

describe('Main', () => {
  test('Main snapshot', () => {
    const component = shallow(<Main />, { context });
    const tree = toJson(component);

    expect(tree).toMatchSnapshot();
  });
});