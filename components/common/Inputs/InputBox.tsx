import styled from 'styled-components';
type Props = {
  outlineColor: string;
};

const InputBox = styled.input`
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 1rem;
  padding: 0.5rem;
  border-bottom: 0.5px solid ${(props: Props) => props.outlineColor};
`;

export default styled(InputBox)`
  &:focus {
    border-bottom: 2px solid ${(props: Props) => props.outlineColor};
  }
`;
