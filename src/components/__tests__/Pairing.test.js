import React from 'react';
import Pairing from '../Pairing';
import renderer from 'react-test-renderer';

describe('Pairing', () => {
  test('Pairing snapshot', () => {
    const component = renderer.create(<Pairing />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});