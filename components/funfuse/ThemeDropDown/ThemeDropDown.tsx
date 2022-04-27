import React from 'react';
import Select, { StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';

const customStyles: StylesConfig = {
  control: (base) => ({
    ...base,
  }),
  menu: (base) => ({
    ...base,
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: '8rem',
  }),
  multiValue: (style) => ({
    ...style,
    color: '#fff',
    background: '#5B3FFF',
  }),
  multiValueLabel: (style) => ({
    ...style,
    color: '#fff',
    background: '#5B3FFF',
  }),
};

export type OptionType = { label: string; value: string };
type Props = {
  selections: OptionType[];
  setSelections: (newSkills: OptionType[]) => void;
  options: OptionType[];
  className?: string;
  maxMenuHeight?: number;
};
const animatedComponents = makeAnimated();

export default function ThemeDropDown({
  selections,
  options,
  setSelections,
  className,
  maxMenuHeight,
}: Props) {
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      value={selections}
      isMulti
      options={options}
      className={className}
      maxMenuHeight={maxMenuHeight ?? 55}
      styles={customStyles}
      onChange={(newSkills) => setSelections(newSkills as OptionType[])}
    />
  );
}
