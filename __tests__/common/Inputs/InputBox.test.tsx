import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import InputBox from '@common/Inputs/InputBox';
import { commonStyledVariables } from '@constants/test-utils/commonThemes';

describe('Input Box Test Cases', () => {
  it('Input Box should pick Outline Color dynamically: ', () => {
    const tree = renderer
      .create(<InputBox outlineColor={commonStyledVariables.outlineColor} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule(
      'border-bottom',
      commonStyledVariables.borderBottom
    );
  });
});
