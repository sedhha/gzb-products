import styled from 'styled-components';

const shadowOffset = '0.15rem';
const shadowOffsetNeg = '-0.15rem';
const blurEffect = '0.5rem';

const WhiteButton = styled.button`
  outline: none;
  background: linear-gradient(145deg, #f0f0f0, #cacaca);
  padding: 0.5rem 1.2rem;
  border-radius: 1rem;
  box-shadow: ${shadowOffset} ${shadowOffset} ${blurEffect} #d9d9d9,
    ${shadowOffsetNeg} ${shadowOffsetNeg} ${blurEffect} #ffffff;
  transition: 0.3s ease all;
  cursor: pointer;
`;

type IconProps = {
  icon: JSX.Element;
};

const WhiteHoverButton = styled(WhiteButton)`
  &:hover {
    box-shadow: ${shadowOffset} ${shadowOffset} ${blurEffect} #d9d9d9,
      ${shadowOffsetNeg} ${shadowOffsetNeg} ${blurEffect} #ffffff;
    transform: scale(0.96);
  }
`;

export default function WhiteIconButton({ icon }: IconProps) {
  return <WhiteHoverButton>{icon}</WhiteHoverButton>;
}
