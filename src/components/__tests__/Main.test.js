import React from 'react';
import Main from '../Main';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Main', () => {
  test('Main snapshot', () => {
    const component = shallow(<Main />);
    const tree = toJson(component);

    expect(tree).toMatchSnapshot();
  });
});
