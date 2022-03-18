import styled from 'styled-components';
type Props = {
  outlineColor: string;
  borderRadius?: string;
};

const OutlineButton = styled.button`
  outline: none;
  background-color: transparent;
  border: 2px solid ${(props: Props) => props.outlineColor};
  cursor: pointer;
  padding: 0.6rem 1rem;
  color: ${(props: Props) => props.outlineColor};
  border-radius: ${(props: Props) => props.borderRadius ?? '1rem'};
  font-size: 1rem;
  letter-spacing: 0.1rem;
  min-width: 10rem;
  transition: 0.3s ease all;
`;

export default styled(OutlineButton)`
  &:hover {
    background-color: ${(props: Props) => props.outlineColor};
    color: white;
  }
`;
