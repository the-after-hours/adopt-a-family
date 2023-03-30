import React from 'react';
import SecureOrg from '../SecureOrg';
import renderer from 'react-test-renderer';

describe('SecureOrg', () => {
  test('SecureOrg snapshot', () => {
    const component = renderer.create(<SecureOrg />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
