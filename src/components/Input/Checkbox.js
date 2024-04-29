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
    width: 1em;
    height: 1em;
    background: ${(props) => (props.checked ? '#000B42' : '#ffffff')}; /* Change background color based on checked state */
    position: absolute;
    top: 0em;
    left: -1.6em;
    border: 1px solid ${(props) => props.theme.colors.gray_80};
    border-radius: 0.2em;


    &::after {
        content: '';
        position: absolute;
        display: none;
    }

    ${Input}:checked + &::after {
        transform: rotate(45deg);
        display: block;
        top: 0.25em; /* Adjust top position */
        left: 0.25em; /* Adjust left position */
        width: 40%; /* Adjust width to make the check mark smaller */
        height: 40%; /* Adjust height to make the check mark smaller */
        border: solid white;
        border-width: 0 0.15em 0.15em 0;
        animation-name: ${rotate};
        animation-duration: 0s;
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
			<Indicator checked={checked} />
		</Label>
	);
};

export default Checkbox;
