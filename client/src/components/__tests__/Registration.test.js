import React from 'react';
import Registration from '../Registration';
import renderer from 'react-test-renderer';

describe('Registration', () => {
  test('Registration snapshot', () => {
    const component = renderer.create(<Registration />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
