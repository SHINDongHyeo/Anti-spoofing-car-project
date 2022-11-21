import styled from "styled-components";
export default function Input({ type, placeholder, onChange, value }) {
  return <StyledInput type={type} placeholder={placeholder} onChange={onChange} value={value}/>;
}

const StyledInput = styled.input`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 2rem;
  width: 80%;
  margin: 0.2rem;
  margin-bottom: 1rem;
  height: 3rem;
  padding: 1rem;
  border: none;
  outline: none;
  color: rgba(45, 45, 48, 0.651);
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
  }
  &::placeholder {
    color: #b9abe099;
    font-weight: 100;
    font-size: 1rem;
  }
`;
