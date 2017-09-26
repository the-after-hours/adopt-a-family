import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom'; {/* For testing, otherwise snapshot will fail */}

describe('App', () => {
  test('App snapshot', () => {
    const component = renderer.create(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});