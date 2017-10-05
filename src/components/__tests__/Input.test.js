import React from 'react';
import Input from '../Input';
import renderer from 'react-test-renderer';

describe('Input', () => {
  test('Input snapshot', () => {
    const component = renderer.create(<Input />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});