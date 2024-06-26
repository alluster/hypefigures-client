import React, { useEffect, useRef, useState } from 'react';
import { AppContext } from './Context';
import PropTypes from 'prop-types';
import axios from 'axios';

const Provider = ({ children }) => {
	const [notifyMessage, setNotifyMessage] = useState('');
	const [appLocation, setAppLocation] = useState('');
	const [navigationOpen, setNavigationOpen] = useState(false);
	const [sideBarOpen, setSideBarOpen] = useState(false);
	const [path, setPath] = useState();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [activeTeam, setActiveTeam] = useState([]);

	const [dashboards, setDashboards] = useState([])
	const [dashboard, setDashboard] = useState([])

	const [dataPoints, setDataPoints] = useState([])
	const [dataPoint, setDataPoint] = useState([]);

	const [loadingDataPoints, setLoadingDataPoints] = useState(false);
	const [loadingDashboard, setLoadingDashboard] = useState(false);
	const [loadingDashboards, setLoadingDashboards] = useState(false);
	const [loadingAnalyticsData, setLoadingAnalyticsData] = useState(false);
	const [analyticsData, setAnalyticsData] = useState([]);
	const [user, setUser] = useState([]);
	const [loadingUser, setLoadingUser] = useState(false);
	const [loadingTeams, setLoadingTeams] = useState(false);
	const [teams, setTeams] = useState([]);
	const [team, setTeam] = useState([]);
	const [loadingTeam, setLoadingTeam] = useState(false);
	const [dataProviders, setDataProviders] = useState([]);
	const [loadingDataProviders, setLoadingDataProviders] = useState(false);
	const [dataTables, setDataTables] = useState([]);
	const [dataTable, setDataTable] = useState([]);
	const [loadingDataTables, setLoadingDataTables] = useState(false);
	const [loadingInvitations, setLoadingInvitations] = useState(false);
	const [invitations, setInvitations] = useState([]);
	const [selectedDataTables, setSelectedDataTables] = useState([]);
	const [loadingChat, setLoadingChat] = useState(false);
	const [chat, setChat] = useState([])
	const [question, setQuestion] = useState('');
	const [retrievedTables, setRetrievedTables] = useState([])
	const [loadingRetrievedTables, setLoadingRetrievedTables] = useState(false);

	const CheckAuth = async () => {
		try {
			const token = localStorage.getItem('token') || ''
			const response = await axios.get(`${process.env.REACT_APP_BASE_URL}validateuser`, {
				headers: {
					Authorization: `Bearer ${token}` // Add the Bearer token to the headers
				}
			})
			if (response.status === 200) {
				if (response.status === 200) {
					setIsAuthenticated(true)
					const userResponse = await Get({ params: { id: response.data.user.id }, path: 'user', dataSetter: setUser, loader: setLoadingUser })
					if (userResponse[0].team.length > 0) {
						setActiveTeam(userResponse[0].team || [])
					}
				}
			} else {
				setIsAuthenticated(false);
				setNotifyMessage('Please login')
			}
		}
		catch (err) { console.log(err) }
	}

	const Login = async ({ password, email }) => {
		setLoadingUser(true)
		try {
			const response = await axios.post(`${process.env.REACT_APP_BASE_URL}auth/signin`, {
				email: email,
				password: password
			})
			if (response.status === 200) {
				setIsAuthenticated(true)
				localStorage.setItem('token', response.data[0].token)
				localStorage.setItem('id', response.data[0].user.id)

				CheckAuth();

			}

		}
		catch (err) { console.log(err), setNotifyMessage('Login failed. Please try again.') }

		finally { setLoadingUser(false) }
	}
	const Register = async ({ first_name, last_name, password, email }) => {
		setLoadingUser(true)
		try {
			const response = await axios.post(`${process.env.REACT_APP_BASE_URL}auth/signup`, {
				first_name: first_name,
				last_name: last_name,
				email: email,
				password: password
			})
			if (response.status === 200) {
				console.log(response)
				setIsAuthenticated(true)
				localStorage.setItem('token', response.data.token)
				localStorage.setItem('id', response.data.user.id)
				setPath('/dashboards');
				CheckAuth();
			}

		}
		catch (err) { console.log(err), setNotifyMessage(`${err.response && err.response.data ? err.response.data.error : ''}`) }

		finally { setLoadingUser(false) }
	}
	const Get = async ({ path, params, dataSetter, loader, addToState }) => {
		try {
			loader(true);

			const token = localStorage.getItem('token') || '';
			const response = await axios.get(`${process.env.REACT_APP_BASE_URL}${path}`, {
				params: {
					...params,
					uniq_team_id: user.length > 0 && user[0].team.length > 0 ? user[0].team[0].uniq_team_id : null,
					user_id: user.length > 0 ? user[0].id : null,
				},
				headers: {
					Authorization: `Bearer ${token}` // Add the Bearer token to the headers
				}
			});

			if (response.status === 200) {
				const responseData = response.data.length > 0 ? response.data : [];
				if (addToState) {
					// Add to existing state
					dataSetter(prevState => [...prevState, ...responseData]);
				} else {
					// Replace existing state
					dataSetter(responseData);
				}
				dataSetter(responseData);

				return responseData;
			} else if (response.status === 404) {
				dataSetter([]);
				return [];
			}
		} catch (err) {
			dataSetter([])
			console.log(err);
			return [];
		} finally {
			loader(false);
		}
	};

	const Post = async ({ path, params, loader, dataSetter, addToState }) => {
		loader(true)
		try {
			CheckAuth()

			const token = localStorage.getItem('token') || ''
			const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${path}`, {
				...params,
				uniq_team_id: user.length > 0 && user[0].team.length > 0 ? user[0].team[0].uniq_team_id : null,
				user_id: user.length > 0 ? user[0].id : null,
			}, {
				headers: {
					Authorization: `Bearer ${token}` // Add the Bearer token to the headers
				}
			});
			if (response.status === 403) {
				CheckAuth()
				return response.data
			}
			if (response.status === 200) {
				const responseData = response.data.length > 0 ? response.data : [];
				if (addToState) {
					// Add to existing state
					dataSetter(prevState => [...prevState, ...responseData]);
				} else {
					// Replace existing state
					dataSetter(responseData);
				}
				dataSetter(responseData);

				return response;
			}
			loader(false);
			return response.data
		}
		catch (err) {
			console.log(err)
		}
		finally { loader(false) }

	}
	useEffect(() => {
		CheckAuth();
		Get({ params: {}, path: 'dashboard', dataSetter: setDashboards, loader: setLoadingDashboards })
		Get({ params: {}, path: 'data_provider', dataSetter: setDataProviders, loader: setLoadingDataProviders })
	}, [])
	useEffect(() => {
		localStorage.setItem('path', path);
		if (path != '/dashboard') setSideBarOpen(false);
		else {
			setSideBarOpen(true);
		}
	}, [path]);

	const dropdownRef = useRef();
	// useEffect(() => {
	// 	console.log('user', user)
	// }, [user])
	const [openDropdown, setOpenDropdown] = useState(false);
	useEffect(() => {
		if (user.length > 0)
			Get({ params: { user_id: user[0].id }, path: 'team', dataSetter: setTeams, loader: setLoadingTeams })
		Get({ params: { email: user.length > 0 ? user[0].email : null }, path: 'invite', dataSetter: setInvitations, loader: setLoadingInvitations })
	}, [user])
	useEffect(() => {
		const checkIfClickedOutside = (e) => {
			if (openDropdown && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setOpenDropdown(false);
			}
		};
		document.addEventListener('mousedown', checkIfClickedOutside);
		return () => {
			document.removeEventListener('mousedown', checkIfClickedOutside);
		};
	}, [openDropdown]);
	return (
		<AppContext.Provider
			value={{
				dropdownRef,
				openDropdown,
				setOpenDropdown,
				analyticsData,
				setLoadingAnalyticsData,
				setAnalyticsData,
				loadingDataProviders,
				setLoadingDataProviders,
				dataProviders,
				setDataProviders,
				user,
				Get,
				setUser,
				loadingUser,
				team,
				setTeam,
				loadingTeam,
				setLoadingTeam,
				loadingTeams,
				setLoadingTeams,
				teams,
				setTeams,
				setLoadingUser,
				isAuthenticated,
				Post,
				setDashboards,
				setDashboard,
				dashboard,
				dataPoints,
				dataPoint,
				setDataPoint,
				setDataPoints,
				setLoadingDataPoints,
				loadingDataPoints,
				setLoadingDashboard,
				setLoadingDashboards,
				loadingDashboards,
				loadingDashboard,
				path,
				setPath,
				appLocation,
				setAppLocation,
				notifyMessage,
				setNotifyMessage,
				navigationOpen,
				sideBarOpen,
				setSideBarOpen,
				setNavigationOpen,
				setIsAuthenticated,
				Login,
				Register,
				dashboards,
				dataTables, setDataTables,
				dataTable, setDataTable,
				loadingDataTables, setLoadingDataTables,
				setLoadingChat,
				loadingChat,
				setChat, chat,
				activeTeam, setActiveTeam,
				loadingInvitations, setLoadingInvitations,
				invitations, setInvitations,
				selectedDataTables, setSelectedDataTables,
				question, setQuestion,
				retrievedTables, setRetrievedTables,
				loadingRetrievedTables, setLoadingRetrievedTables
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

Provider.propTypes = {
	children: PropTypes.any,
};

export default Provider;
