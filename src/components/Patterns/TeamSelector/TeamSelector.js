import React, { useContext, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { device } from '../../../styles/device-braking-points';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppContext } from '../../../context/Context';
import SpinnerSmall from '../../Spinner/SpinnerSmall';
import { faCheck, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import FormAddTeam from '../../Forms/Team/FormAddTeam';

const TeamSelectorContainer = styled.div`
    display: flex;
    height: 48px;
    align-items: center;
    // margin-left: 16px;
	min-width: 250px;
`;

const ActiveTeamNameContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 32px;
    margin-right: 12px;
    border-radius: 4px;
    // padding-left: 16px;
    padding-right: 16px;
    &:hover {
        -webkit-transition: background-color 0.5s;
        -moz-transition: background-color 0.5s;
        -o-transition: background-color 0.5s;
        transition: background-color 0.5s;
        cursor: pointer;
    }
`;

const ActiveTeamName = styled.p`
    font-size: 14px;
    font-weight: 500;
    line-height: 32px;
`;

const DropDownIcon = styled.div`
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    margin-left: 16px;
`;
const breatheAnimation = keyframes`
	0% { height: 0px; width: 0px;  }
	30% { height: 20%; width: 20%;  }
	40% { height: 60%; width: 60% ; }
	100% { height: 100%; width: 100%;  }
`;
const Dropdown = styled.div`
    background-color: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.gray_60};
    border-radius: 8px;
    position: absolute;
    top: 40px;
	z-index: 100000000;

    // margin-left: -16px;
    min-width: 250px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    // animation-name: ${breatheAnimation};
    // animation-duration: 1s;
    // animation-iteration-count: 1;
`;

const DropdownContent = styled.div`
    padding: 8px;
`;

const ActiveTeam = styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 4px;
    height: 32px;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
	color: white;
    margin-top: 10px;
	white-space: nowrap;

`;
const AddTeam = styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 4px;
    height: 32px;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    border: solid ${(props) => props.theme.colors.primary_100} 0.5px;
	color: ${(props) => props.theme.colors.primary_100};

    margin-top: 10px;
    &:hover {
        cursor: pointer;
    }
`;
const Title = styled.p`
	color: ${(props) => props.theme.colors.primary_100};
    font-size: 14px;
	white-space: nowrap;
    line-height: 18px;
    font-weight: 500;
    margin-right: 20px;
	&:hover {
        cursor: pointer;
    }
`;

const CheckIcon = styled.div`
    color: ${(props) => props.theme.colors.primary_100};
    font-size: 12px;
    line-height: 18px;
    margin-left: auto;
`;

const TeamListName = styled.p`
    // color: ${(props) => props.theme.colors.primary_100};
    font-size: 14px;
    line-height: 18px;
    font-weight: 400;
    margin-right: 20px;
`;
const ListTeam = styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 4px;
    height: 32px;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 10px;
    &:hover {
        cursor: pointer;
    }
`;

const TeamSelector = () => {
	const {
		teams,
		loadingUser,
		dropdownRef,
		activeTeam,
		loadingTeams,
		setOpenDropdown,
		openDropdown,
		Post,
		setNotifyMessage,
		setLoadingTeams,
		user,
		setUser,
		Get,
		setActiveTeam
	} = useContext(AppContext);
	const [openTeamModal, setOpenTeamModal] = useState(false)
	const [openTeamSelector, setOpenTeamSelector] = useState(false);

	useEffect(() => {
		TeamsList()
	}, [teams])

	const handleTeamChange = async ({ team_id }) => {
		try {
			const response = await Post({ params: { id: user[0].id, team_id: team_id }, path: 'user', dataSetter: setUser, loader: setLoadingTeams })
			if (response.status === 200) {
				Get({ params: { id: response.data.user.team_id, user_id: response.data.user.id }, path: 'team', dataSetter: setActiveTeam, loader: setLoadingTeams })

				setNotifyMessage('Active team changed');
				// location.reload()
			}
			else {
				setNotifyMessage('Something went wrong');
			}
		}
		catch (err) { console.log(err) }
	}
	const TeamsList = () => {
		return teams && teams.length > 0 ? (
			loadingUser || loadingTeams ? (
				<SpinnerSmall />
			) : (
				teams
					.filter((item) => item.id != activeTeam.id || 0)
					.map((item, i) => {
						return (
							<ListTeam key={i} onClick={() => { setOpenDropdown(false), handleTeamChange({ team_id: item.id }) }}>
								<TeamListName>{item.title}</TeamListName>
							</ListTeam>
						);
					})
			)
		) : null;
	};
	const DropDown = () => {
		return (
			openDropdown ?

				<Dropdown ref={dropdownRef}>
					<DropdownContent>
						<ActiveTeam>
							<Title>{activeTeam.length > 0 ? activeTeam[0].title : 'No team'}</Title>
							<CheckIcon>
								<FontAwesomeIcon icon={faCheck} />
							</CheckIcon>
						</ActiveTeam>

						{TeamsList()}

						<AddTeam onClick={() => { setOpenDropdown(false), setOpenTeamModal(!openTeamModal) }}>
							<Title>Create an new team</Title>
							<CheckIcon>
								<FontAwesomeIcon icon={faPlus} />
							</CheckIcon>
						</AddTeam>
					</DropdownContent>
				</Dropdown>
				: null
		)
	}
	const Selector = () => {
		return (teams && teams.length > 0) &&
			loadingUser || loadingTeams ? (
			<SpinnerSmall />
		) : (
			<div>
				<TeamSelectorContainer>
					<FormAddTeam openTeamModal={openTeamModal} toggleOpen={setOpenTeamModal} />

					<ActiveTeamNameContainer
						onClick={() => {
							setOpenTeamSelector(!openTeamSelector), setOpenDropdown(true);
						}}>
						<ActiveTeamName>
							{activeTeam.length > 0 ? activeTeam[0].title : 'No team'}
						</ActiveTeamName>
						<DropDownIcon>
							<FontAwesomeIcon icon={faChevronDown} />
						</DropDownIcon>
					</ActiveTeamNameContainer>

					{DropDown()}

				</TeamSelectorContainer>

			</ div>
		)
	}
	useEffect(() => {
		if (openDropdown === false) {
			setOpenTeamSelector(false);
		}
	}, [openDropdown]);
	useEffect(() => {
		Selector()
	}, [activeTeam, teams])

	return (
		<div>
			{Selector()}

		</div>
	)

};
export default TeamSelector;