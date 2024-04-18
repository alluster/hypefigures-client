import React from 'react';
import styled from 'styled-components';
import { device } from '../../styles/device-braking-points';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import BackgroundOverlay from '../Container/BackgroundOverlay';

const ModalWrapper = styled.div`
    position: absolute;
    top: 0px;
    height: 100%;
    width: 100%;
    visibility: hidden;
    z-index: 5;
    display: flex;
    flex-direction: column;

    ${({ open }) =>
		open &&
		`
		visibility: visible
	`}
`;

const ModalBox = styled.div`
    align-self: center;
    position: absolute;
    z-index: 5;
    width: 500px;
    max-width: 90%;
    background-color: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.primary_200};
    border-radius: 8px;
    padding: ${(props) => props.theme.grid.divider_4};
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    margin-top: ${(props) => props.theme.grid.divider_8};
    margin-bottom: ${(props) => props.theme.grid.divider_8};
    @media ${device.laptop} {
        max-width: 80%;
    }
`;

const Content = styled.div`
    // max-width: calc(100% - 64px);
    display: flex;
    flex-direction: column;
    position: relative;
`;

const Icon = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.colors.fontDark};
    font-size: 20px;
    margin-right: ${(props) => props.theme.grid.divider_1};
    align-self: flex-end;
    margin-bottom: ${(props) => props.theme.grid.divider_4};
`;

const ModalTitle = styled.h5`
    // margin-top: -55px;
    font-weight: 700;
    margin-bottom: ${(props) => props.theme.grid.divider_1};
`;

const Modal = ({ children, open, openModal, modalTitle }) => {


	return (
		<ModalWrapper open={open}>
			<ModalBox>
				<Content>
					<Icon onClick={() => openModal(false)} icon={faTimes} />
					<ModalTitle>{modalTitle || ''}</ModalTitle>
					{children}
				</Content>
			</ModalBox>
			<BackgroundOverlay />
		</ModalWrapper>
	);
};

export default Modal;
