import React from 'react';
import Main from '../main.js';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

describe('Main', () => {
  test('Main snapshot', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});