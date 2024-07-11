import React from 'react';
import FormCompiler from '../../../supportFunctions/FormComplier';
import SubscriptionWarning from '../../Patterns/SubscriptionWarning/SubscriptionWarning';

const FormAddDashboard = ({
	fields,
	onSubmit
}) => {

	return <SubscriptionWarning>{FormCompiler({ fields: fields, onSubmit })}</SubscriptionWarning>;
};

export default FormAddDashboard;
