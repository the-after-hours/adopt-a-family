import React from 'react';
import Dashboard from '../Dashboard.js';
import renderer from 'react-test-renderer';

describe('Dashboard', () => {
  test('Dashboard snapshot', () => {
    const component = renderer.create(<Dashboard />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});