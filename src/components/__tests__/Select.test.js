import faker from 'faker';
import React from 'react';
import renderer from 'react-test-renderer';

import options from '../../constants/options';
import Select from '../Select';

describe('Select', () => {
  test('Select snapshot', () => {
    const component = renderer.create(<Select menuType="states"/>);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('Drop down options', () => {
    it('Should pass in an array', () => {
      const objectKeys = Object.keys(options);

      objectKeys.map((key) => {
        expect(Array.isArray(options[key])).toBeTruthy();
      });
    });
  });

  describe('States', () => {
    it('Should contain valid states', () => {
      const stateAbbr = faker.address.stateAbbr();

      expect(options.states.indexOf(stateAbbr)).not.toBe(0);
    });
  });
});
