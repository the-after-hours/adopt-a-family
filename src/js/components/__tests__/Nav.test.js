import React from 'react';
import Nav from '../Nav';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Main', () => {
  test('Main snapshot', () => {
    const component = shallow(<Nav />);
    const tree = toJson(component);

    expect(tree).toMatchSnapshot();
  });
});
