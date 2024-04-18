import React from 'react';
import FormCompiler from '../../../supportFunctions/FormComplier';


const FormAddDashboard = ({
	fields,
	onSubmit
}) => {

	return <div>{FormCompiler({ fields: fields, onSubmit })}</div>;
};

export default FormAddDashboard;
