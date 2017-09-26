import React from 'react';
import Messaging from '../Messaging.js';
import renderer from 'react-test-renderer';

describe('Messaging', () => {
  test('Messaging snapshot', () => {
    const component = renderer.create(<Messaging />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});