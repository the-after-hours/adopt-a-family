import React from 'react';
import Nav from '../Nav';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import customTheme from '../../theme';

const context = {
  muiTheme: customTheme
};

describe('Main', () => {
  test('Main snapshot', () => {
    const component = shallow(<Nav />, { context });
    const tree = toJson(component);

    expect(tree).toMatchSnapshot();
  });
});