import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import FormCompiler from '../../supportFunctions/FormComplier';


const FormAddDashboard = ({
	fields,
	onSubmit
}) => {

	return <div>{FormCompiler({ fields: fields, onSubmit })}</div>;
};

export default FormAddDashboard;
