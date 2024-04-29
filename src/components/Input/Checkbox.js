import React from 'react';
import styled, { keyframes } from 'styled-components';

const Input = styled.input`
    height: 0;
    width: 0;
    opacity: 0;
    z-index: -1;
`;

const Label = styled.label`
    position: relative;
    display: inline-block;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    margin: 0.6em 1em;
`;

const rotate = keyframes`
 from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Indicator = styled.div`
    width: 1.2em;
    height: 1.2em;
    background: #ffffff;
    position: absolute;
    top: 0em;
    left: -1.6em;
    border: 1px solid ${props => props.theme.colors.gray_40};
    border-radius: 0.2em;

    ${Input}:checked & {
        background: #000B42;
    }

    ${Label}:hover & {
        background: #f1f1f1;
    }

    &::after {
        content: '';
        position: absolute;
        display: none;
    }

    ${Input}:checked + &::after {
		transform: rotate(45deg);
        display: block;
        top: 0.1em;
        left: 0.35em;
        width: 35%;
        height: 60%;
        border: solid #263238;
        border-width: 0 0.2em 0.2em 0;
        animation-name: ${rotate};
        animation-duration: 0.3s;
        animation-fill-mode: forwards;
    }

    &::disabled {
        cursor: not-allowed;
    }
`;

const Checkbox = ({ value, checked, onChange, name, id, label, disabled }) => {
	return (
		<Label htmlFor={id} disabled={disabled}>
			{label}
			<Input
				id={id}
				type="checkbox"
				name={name}
				value={value}
				disabled={disabled}
				checked={checked}
				onChange={onChange}
			/>
			<Indicator />
		</Label>
	);
};

export default Checkbox;
