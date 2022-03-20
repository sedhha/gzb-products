import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import OutlineButton from '@common/Buttons/OutlineButton';

const outlineColor = 'red';
const borderRadius = '1rem';

describe('Outline Button Test Cases', () => {
  it('Outline Button should pick Outline Color dynamically: ', () => {
    const tree = renderer
      .create(
        <OutlineButton
          outlineColor={outlineColor}
          borderRadius={borderRadius}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', outlineColor);
    expect(tree).toHaveStyleRule('border-radius', borderRadius);
  });
});
