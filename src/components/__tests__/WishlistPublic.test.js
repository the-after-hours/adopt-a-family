import React from 'react';
import WishlistPublic from '../WishlistPublic.js';
import renderer from 'react-test-renderer';

describe('WishlistPublic', () => {
  test('WishlistPublic snapshot', () => {
    const component = renderer.create(<WishlistPublic />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});