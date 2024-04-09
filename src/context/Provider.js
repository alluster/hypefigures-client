import React, { useEffect, useState } from 'react';
import { AppContext } from './Context';
import PropTypes from 'prop-types';
import axios from 'axios';

const Provider = ({ children }) => {
	const [notifyMessage, setNotifyMessage] = useState('');
	const [appLocation, setAppLocation] = useState('');
	const [navigationOpen, setNavigationOpen] = useState(false);
	const [sideBarOpen, setSideBarOpen] = useState(false);
	const [path, setPath] = useState();
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	const [dashboards, setDashboards] = useState([])
	const [dashboard, setDashboard] = useState([])
	const [dataPoints, setDataPoints] = useState([])
	const [loadingDataPoints, setLoadingDataPoints] = useState(false);
	const [loadingDashboard, setLoadingDashboard] = useState(false);
	const [loadingDashboards, setLoadingDashboards] = useState(false);
	const [loadingAnalyticsData, setLoadingAnalyticsData] = useState(false);
	const [analyticsData, setAnalyticsData] = useState([]);
	const [user, setUser] = useState([]);
	const [loadingUser, setLoadingUser] = useState(false);
	const [loadingTeams, setLoadingTeams] = useState(false);
	const [teams, setTeams] = useState([]);
	const [dataProviders, setDataProviders] = useState([]);
	const [loadingDataProviders, setLoadingDataProviders] = useState(false);


	const CheckAuth = async () => {
		try {
			const token = localStorage.getItem('token') || ''
			const response = await axios.get(`${process.env.BASE_URL}validateuser`, {
				headers: {
					Authorization: `Bearer ${token}` // Add the Bearer token to the headers
				}
			})
			if (response.status === 200) {
				setIsAuthenticated(true)
			} else {
				setIsAuthenticated(false);
				setNotifyMessage('Please login')
			}
		}
		catch (err) { console.log(err), setNotifyMessage('Please login.') }
	}
	const Login = async ({ password, email }) => {
		setLoadingUser(true)
		try {
			const response = await axios.post(`${process.env.BASE_URL}auth/signin`, {
				email: email,
				password: password
			})
			if (response.status === 200) {
				setIsAuthenticated(true)
				localStorage.setItem('token', response.data[0].token)
				setUser({
					first_name: response.data[0].user.first_name || '',
					last_name: response.data[0].user.last_name || '',
					email: response.data[0].user.email || '',
					last_login: response.data[0].user.last_login || '',
					id: response.data[0].user.id || ''
				})

			}

		}
		catch (err) { console.log(err), setNotifyMessage('Login failed. Please try again.') }

		finally { setLoadingUser(false) }
	}

	const Get = async ({ path, params, dataSetter, loader }) => {
		try {
			loader(true)

			const token = localStorage.getItem('token') || ''
			const response = await axios.get(`${process.env.BASE_URL}${path}`, {
				params: params,
				headers: {
					Authorization: `Bearer ${token}` // Add the Bearer token to the headers
				}
			})

			if (response && response.status === 200) {
				dataSetter(response.data || [])
			}
			else {
				dataSetter([])
			}
			loader(false)
			return response.data
		}
		catch (err) {
			console.log(err)
		}
		finally {
			loader(false)
		}
	};


	const Post = async ({ path, params, loader, dataSetter }) => {
		loader(true)
		try {
			const token = localStorage.getItem('token') || ''
			const response = await axios.post(`${process.env.BASE_URL}${path}`,
				params,
				{
					headers: {
						Authorization: `Bearer ${token}` // Add the Bearer token to the headers

					}
				}
			)
			if (response.status === 403) {
				setIsAuthenticated(false)
			}
			console.log(response)
			if (response && response.data.length > 0) {
				dataSetter(response.data)
			}
			loader(false);
			return response
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

	return (
		<AppContext.Provider
			value={{
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
				dashboards
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
