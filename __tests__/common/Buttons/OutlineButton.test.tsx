import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import OutlineButton from '@common/Buttons/OutlineButton';
import { commonStyledVariables } from '@test-utils/commonThemes';

describe('Outline Button Test Cases', () => {
  it('Outline Button should pick Outline Color dynamically: ', () => {
    const tree = renderer
      .create(
        <OutlineButton
          outlineColor={commonStyledVariables.outlineColor}
          borderRadius={commonStyledVariables.borderRadius}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', commonStyledVariables.outlineColor);
    expect(tree).toHaveStyleRule(
      'border-radius',
      commonStyledVariables.borderRadius
    );
  });
});
