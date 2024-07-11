import React, { useContext, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { device } from '../../../styles/device-braking-points';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppContext } from '../../../context/Context';
import SpinnerSmall from '../../Spinner/SpinnerSmall';
import { faCheck, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import FormAddTeam from '../../Forms/Team/FormAddTeam';
import Button from '../../Button/Button';
import { useHistory } from 'react-router-dom';

const TeamSelectorContainer = styled.div`
    display: flex;
    height: 48px;
    align-items: center;
    // margin-left: 16px;
	min-width: 250px;
	position: relative;
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
    // margin-top: 10px;
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
const AddTeamButton = styled.button`
    text-align: center;
	height: 32px;
    border-radius: 8px;
    padding-left: 40px;
    padding-right: 40px;
    font-size: 14px;
    line-height: 32px;
    font-weight: 500;
    display: flex;
    flex-direction: row;
    align-items: center;
	-webkit-text-fill-color: #ffffff;
	color: #ffffff;
	background-color: #000B42;	
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
	const [filteredTeams, setFilteredTeams] = useState([])
	useEffect(() => {
		TeamsList()
	}, [teams])
	const history = useHistory();

	const ChangeActiveTeam = async ({ team_id, user_id }) => {
		try {
			if (team_id && user_id) {
				await Get({ params: { id: team_id, user_id: user_id }, path: 'team', dataSetter: setActiveTeam, loader: setLoadingTeams })
				history.push(`/teams/${team_id}`);

			}
		} catch (err) { console.log(err) }
	}
	const handleTeamChange = async ({ team_id }) => {
		try {

			const response = await Post({ params: { id: user[0].id, team_id: team_id }, path: 'user', loader: setLoadingTeams })
			if (response.status === 200) {
				await ChangeActiveTeam({
					team_id: response.data.user.team_id,
					user_id: response.data.user.id
				})

				setNotifyMessage('Active team changed');
			}
			else {
				setNotifyMessage('Something went wrong');
			}
		}
		catch (err) { console.log(err) }
	}

	const RemoveActiveTeamFromList = async () => {
		try {
			if (activeTeam.length > 0) {
				setFilteredTeams(teams.filter((item) => item.id != activeTeam[0].id || 0))

			} else {
				setFilteredTeams(teams)

			}
		}
		catch (err) { console.log(err) }
	}
	useEffect(() => {
		RemoveActiveTeamFromList()
	}, [activeTeam, teams])

	const TeamsList = () => {
		return teams && teams.length > 0 ? (
			loadingUser || loadingTeams ? (
				<SpinnerSmall />
			) : (
				filteredTeams.length > 0 && filteredTeams.map((item, i) => {
					return (
						<ListTeam key={i} onClick={() => { setOpenDropdown(false), handleTeamChange({ team_id: item.id }) }}>
							<TeamListName>{item.title}</TeamListName>
						</ListTeam>
					);
				})
			)
		) : null
	};

	const DropDown = () => {
		return (
			openDropdown ?

				<Dropdown ref={dropdownRef}>
					<DropdownContent>

						<ActiveTeam>
							<Title>{activeTeam.length > 0 ? activeTeam[0].title : 'No team'}

							</Title>
							<CheckIcon>
								<FontAwesomeIcon icon={faCheck} />
							</CheckIcon>
						</ActiveTeam>

						{TeamsList()}

						{/* <AddTeam onClick={() => { HandleModalOpen() }}>
							<Title>Create an new team</Title>
							<CheckIcon>
								<FontAwesomeIcon icon={faPlus} />
							</CheckIcon>
						</AddTeam> */}
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
			teams?.length > 0
				?

				<div>
					<TeamSelectorContainer
						onMouseEnter={() => {
							setOpenTeamSelector(!openTeamSelector), setOpenDropdown(!openDropdown);
						}}
						onMouseLeave={() => {
							setOpenTeamSelector(!openTeamSelector), setOpenDropdown(!openDropdown);
						}}
						onClick={() => {
							setOpenTeamSelector(!openTeamSelector), setOpenDropdown(!openDropdown);
						}}
					>

						<ActiveTeamNameContainer
						>
							<ActiveTeamName>
								{activeTeam.length > 0 ? activeTeam[0].title : 'No team'}

							</ActiveTeamName>
							<DropDownIcon>
								<FontAwesomeIcon icon={faChevronDown} />
							</DropDownIcon>

						</ActiveTeamNameContainer>
						{activeTeam.length > 0 && activeTeam[0]?.stripe_subscription != true ?
							<span className="inline-flex ml-4 items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
								No subscription
							</span>
							:
							null
						}
						{activeTeam.length > 0 && activeTeam[0]?.stripe_subscription === true ?
							<span className="inline-flex ml-4 items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-600/20">
								Active subscription
							</span>
							:
							null
						}
						{DropDown()}

					</TeamSelectorContainer>

				</ div>
				:
				null

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
			<FormAddTeam openTeamModal={openTeamModal} toggleOpen={setOpenTeamModal} />

		</div>
	)

};
export default TeamSelector;