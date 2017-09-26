import React from 'react';
import WishlistPrivate from '../wishlistPrivate.js';
import renderer from 'react-test-renderer';

describe('WishlistPrivate', () => {
  test('WishlistPrivate snapshot', () => {
    const component = renderer.create(<WishlistPrivate />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});