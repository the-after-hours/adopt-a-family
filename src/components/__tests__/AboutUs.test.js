import React from 'react';
import AboutUs from '../AboutUs';
import renderer from 'react-test-renderer';

describe('AboutUs', () => {
  test('AboutUs snapshot', () => {
    const component = renderer.create(<AboutUs />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});