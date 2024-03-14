import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { device } from '../device';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-right: 24px;
    @media ${device.mobile} {
        margin-right: none;
    }
`;

const StyledInput = styled.input`
    align-self: center;
    background-color: white;
    height: 24px;
    width: 24px;
    border: 1px solid ${(props) => props.theme.colors.gray_80};
    border-radius: 4px;
    color: ${(props) => props.theme.colors.fontDark};
    :&hover {
        cursor: pointer;
    }
    @media ${device.laptop} {
    }
`;
const CheckedIcon = styled(FontAwesomeIcon)`
    color: white;
    margin-left: 3px;
    margin-top: 3px;
    line-height: 24px;
    font-size: 18px;
`;

const StyledInputChecked = styled.div`
    align-self: center;
    background-color: ${(props) => props.theme.colors.primary_100};
    height: 24px;
    width: 24px;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.colors.white};

    color: ${(props) => props.theme.colors.fontDark};
    :&hover {
        cursor: pointer;
    }
    @media ${device.laptop} {
    }
`;
const Label = styled.label`
    align-self: center;
    font-size: 16px;
    display: inline-block;
    margin-right: 16px;
`;

const InputCheckbox = ({
    label,
    required,
    onChange,
    placeholder,
    register,
    name,
    defaultChecked,
    onClick,
}) => {
    return (
        <Wrapper onClick={onClick}>
            <Label>{label}</Label>
            {defaultChecked ? (
                <StyledInputChecked>
                    <CheckedIcon icon={faCheck} />
                </StyledInputChecked>
            ) : (
                <StyledInput />
            )}
            <StyledInput
                style={{ display: 'none' }}
                {...register(name, { required })}
                label={label}
                placeholder={placeholder}
                type="checkbox"
                checked={defaultChecked}
            />
        </Wrapper>
    );
};

export default InputCheckbox;
