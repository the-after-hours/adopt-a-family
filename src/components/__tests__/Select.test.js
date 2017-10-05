import React from 'react';
import Select from '../Select';
import renderer from 'react-test-renderer';

describe('Select', () => {
  test('Select snapshot', () => {
    const component = renderer.create(<Select />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});