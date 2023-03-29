import React from 'react';
import Landing from '../Landing';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

describe('Landing', () => {
  test('Landing snapshot', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
