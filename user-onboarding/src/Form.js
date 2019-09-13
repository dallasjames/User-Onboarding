import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field, yupToFormErrors } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import './App.css';

const Login = ({ errors, touched, status }) => {
    const [login, setLogin] = useState([])

    useEffect(() => {
        if (status) {
            setLogin([ ...login, status])
        }
    }, status)

    return (
            <Form>
                {touched.first_name && errors.first_name && <p>{errors.first_name}</p>}
                <Field type='text' name='first_name' placeholder='First Name'/>
                
                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field type='text' name='email' placeholder='Email'/>
                
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field type='password' name='password' placeholder='Password'/>
                
                {touched.TOS && errors.TOS && <p>{errors.TOS}</p>}
                <Field type='checkbox' name='TOS' />
                Do you acepct the Terms and conditions?
                
                <button type='submit'>Submit</button>
                
                {login.map((logins) => (
                    <div className='top'>Name: {logins.first_name}</div>  
                ))}

                {login.map((logins) => (
                    <div>Email: {logins.email}</div>
                ))}

                {login.map((logins) => (
                    <div>Password: {logins.password}</div>
                ))}

                {login.map((logins) => (
                    <div>TOS accepted</div>
                ))}
            </Form>
    )
}

export default withFormik({
    mapPropsToValues: (values) => {
        return {
            first_name: values.first_name || '',
            email: values.email || '',
            password: values.password || '',
            TOS: values.TOS || false
        }
    },

    validationSchema: yup.object().shape({
        first_name: yup.string().required('Fisrt name is required!'),
        email: yup.string().required('Email is required!'),
        password: yup.string().required('Password is required!'),
        TOS: yup.boolean().oneOf([true], 'You must accept terms and conditions!') 
    }),

    handleSubmit: (values, { setStatus }) => {
        axios.post('https://reqres.in/api/users', values)
            .then((res) => {
                setStatus(res.data)
            })
            .catch((err) => {
                console.log('Error: ', err)
            })
    }
})(Login)