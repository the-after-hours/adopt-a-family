import React from 'react';
import Form from '../Form';
import renderer from 'react-test-renderer';

describe('Form', () => {
  test('Form snapshot', () => {
    const component = renderer.create(<Form />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});