import React, { useContext, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { device } from '../../styles/device-braking-points';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppContext } from '../../context/Context';
import SpinnerSmall from '../Spinner/SpinnerSmall';
import { faCheck, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`
    height: 48px;
    max-width: 100%;
    top: 96px;
    display: flex;
    align-items: center;
    flex-direction: row;
    // padding-left: ${(props) => props.theme.grid.divider_10};
    padding-right: ${(props) => props.theme.grid.divider_4};
    // @media ${device.laptop} {
    // 	display: none;
    // }
`;
const Header = styled.h5`
    line-height: ${(props) => props.theme.grid.divider_8};
    white-space: nowrap;
    @media ${device.laptop} {
    }
`;

const Links = styled.div`
    display: flex;
    flex-wrap: no-wrap;
    flex-direction: row;
    align-items: center;
    height: 64px;
    justify-content: flex-end;
    width: 100%;
`;
const Icon = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.colors.primary_100};
    font-size: 40px;
    margin-right: 40px;
    margin-left: 20px;
`;

const LinkContainer = styled(Link)`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const WithMargin = styled.div`
    margin-right: ${(props) => props.theme.grid.divider_4};
`;
const TeamSelectorContainer = styled.div`
    display: flex;
    height: 48px;
    align-items: center;

    margin-left: 136px;
	width: 100%;
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
        background-color: ${(props) => props.theme.colors.primary_5};
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
    border: solid ${(props) => props.theme.colors.primary_100} 0.5px;
    background-color: ${(props) => props.theme.colors.primary_5};
    margin-top: 10px;
`;
const AddTeam = styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 4px;
    height: 32px;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    // border: solid ${(props) => props.theme.colors.primary_100} 0.5px;
    // background-color: ${(props) => props.theme.colors.primary_5};
    margin-top: 10px;
    &:hover {
        cursor: pointer;
        background-color: ${(props) => props.theme.colors.primary_5};
    }
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
        background-color: ${(props) => props.theme.colors.primary_5};
    }
`;

const Title = styled.p`
	color: ${(props) => props.theme.colors.primary_100};
    font-size: 14px;
    line-height: 18px;
    font-weight: 500;
    margin-right: 20px;
	color: ${props => props.theme.colors.gray_100};
`;

const CheckIcon = styled.div`
    color: ${(props) => props.theme.colors.primary_100};
    font-size: 12px;
    line-height: 18px;
    margin-left: auto;
`;
const SideBarMargin = styled.div`
    ${({ sideBarOpen }) =>
		sideBarOpen &&
		`
			margin-left: 260px;
	`}
`;
const NavigationMargin = styled.div`
    ${({ navigationOpen }) =>
		navigationOpen &&
		`
			margin-left: 220px;

	`}
`;
const TopNav = () => {
	const { user, isAuthenticated, teams, loadingUser, dropdownRef, activeTeam,
		openDropdown,
		setOpenDropdown, sideBarOpen, navigationOpen } = useContext(AppContext);
	const [openTeamSelector, setOpenTeamSelector] = useState(false);
	const [addTeam, setAddTeam] = useState(false);
	const TeamsSelector = () => {
		const TeamsList = () => {
			return teams && teams.length > 0 ? (
				loadingUser ? (
					<SpinnerSmall />
				) : (
					teams
						// .filter((item) => item.id != activeTeam[0].id)
						.map((item, i) => {
							return (
								<ListTeam key={i}
								// onClick={() => InsertActiveTeam({ id: item.id })}
								>
									<TeamListName>{item.title}</TeamListName>
								</ListTeam>
							);
						})
				)
			) : null;
		};
		return (
			<TeamSelectorContainer>
				<ActiveTeamName>Antler Global</ActiveTeamName>
				<DropDownIcon>
					<FontAwesomeIcon icon={faChevronDown} />
				</DropDownIcon>
			</TeamSelectorContainer>
		)
	};
	useEffect(() => {
		TeamsSelector()
	}, [teams])

	return (


		isAuthenticated ?
			<Wrapper>
				<SideBarMargin sideBarOpen={sideBarOpen} >
					<NavigationMargin navigationOpen={navigationOpen}>
						{TeamsSelector()}

					</NavigationMargin>

				</SideBarMargin >
				<Links>
					<Link to="/user">
						<p>{user.email || ''}</p>
					</Link>
				</Links>

			</Wrapper >
			: <div></div>



	);
};

export default TopNav;
