import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: ${(props) => props.theme.grid.divider_4};

    &:hover {
        cursor: pointer;
    }
`;

const Icon = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.colors.fontDark};
    font-size: 16px;
    margin-right: ${(props) => props.theme.grid.divider_1};
    align-self: center;
`;
const Text = styled.h6`
    color: ${(props) => props.theme.colors.fontDark};
    white-space: nowrap;
    align-self: center;
`;

const ButtonWithIcon = ({ text }) => {
	const history = useHistory();
	return (
		<Container onClick={history.goBack}>
			<Icon icon={faArrowLeft} />
			<Text>{text}</Text>
		</Container>
	);
};

ButtonWithIcon.propTypes = {
	text: PropTypes.string,
};

export default ButtonWithIcon;
