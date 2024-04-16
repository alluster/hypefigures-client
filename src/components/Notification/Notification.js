import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../context/Context';
import { ToastContainer, toast } from 'react-toastify';
import '../../css/ReactToastify.css';
import Emoji from 'a11y-react-emoji';

const Notification = () => {
	const { notifyMessage } = useContext(AppContext);
	const FireMessage = () => {
		if (notifyMessage != '') {
			toast(`${notifyMessage}`, {
				icon: () => <Emoji symbol="🚀" label="rocket" />,
				position: toast.POSITION.BOTTOM_RIGHT,
			});
		}
	};
	useEffect(() => {
		FireMessage();
	}, [notifyMessage]);
	return <ToastContainer />;
};

export default Notification;
