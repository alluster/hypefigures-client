import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import { device } from '../../styles/device-braking-points';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPen } from '@fortawesome/free-solid-svg-icons';
import Settings from '../Forms/Settings/Settings';

const HeaderTextWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;

    * {
        margin-bottom: ${(props) => props.theme.grid.divider_1};
    }
`;
const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const ButtonContainer = styled.div`
    margin-left: auto;
    // @media ${device.laptop} {
    //     margin-left: 0px;
    // }
`;
const Title = styled.div`
	display: flex;
	flex-direction: row;
	
`;
const Icon = styled(FontAwesomeIcon)`
	align-self: center;
	justify-content: center;
	font-size: 12px;
	margin-left: 20px;
	&:hover {
        cursor: pointer;
    }
`;

const HeaderText = ({
	locationText,
	title,
	description,
	onClickFunction,
	buttonTitle,
	small,
	feature,
	id
}) => {
	const [openSettingsModal, setOpenSettingsModal] = useState(false);

	return (
		small ?
			<HeaderTextWrapper>
				<TextContainer>
					<p>{locationText || ''}</p>
					<h5>
						{title || ''}
						{feature
							?
							<Icon
								icon={faPen}
								onClick={() => setOpenSettingsModal(!openSettingsModal)}

							/>
							:
							null
						}
					</h5>
					<h6>{description || ''}</h6>

				</TextContainer>
				{buttonTitle != null && (
					<ButtonContainer>
						<Button small onClick={onClickFunction} title={buttonTitle} />
					</ButtonContainer>
				)}
			</HeaderTextWrapper>
			:
			<HeaderTextWrapper>
				<TextContainer>
					<p>{locationText || ''}</p>
					<Title>
						<h5>
							{title || ''}
							{feature
								?
								<Icon
									icon={faPen}
									onClick={() => setOpenSettingsModal(!openSettingsModal)}

								/>
								:
								null
							}
						</h5>					</Title>
					<h6>{description || ''}</h6>
				</TextContainer>
				{buttonTitle != null && (
					<ButtonContainer>
						<Button small onClick={onClickFunction} title={buttonTitle} />
					</ButtonContainer>
				)}
				<Settings
					id={id}
					feature='team'
					openModal={openSettingsModal}
					toggleOpen={() => setOpenSettingsModal(!openSettingsModal)}
					title={title || null}
					description={description || null}

				/>			</HeaderTextWrapper>
	);
};

export default HeaderText;
