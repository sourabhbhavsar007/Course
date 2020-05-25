import React from 'react';
import { Formik } from 'formik';
import { Button, Input, Tag } from 'antd';
import { addNewStudent } from '../client';

const inputBottomMargin = { marginBottom: '10px' };
const tagStyle = { backgroundColor: '#f50', color: 'white', ...inputBottomMargin };


const AddStudentForm = (props) =>
    (
        <Formik
            initialValues={{ firstName: '', lastName: '', email: '', gender: '' }}
            validate={values => {
                const errors = {};

                if (!values.firstName) {
                    errors.firstName = 'First name is required field'
                }

                if (!values.lastName) {
                    errors.lastName = 'Last name is required field'
                }

                if (!values.email) {
                    errors.email = 'Email Address is required field';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }

                if (!values.gender) {
                    errors.gender = 'Gender is required field';
                } else if (!['MALE', 'male', 'FEMALE', 'female'].includes(values.gender)) {
                    errors.gender = 'Gender must be either MALE, male, FEMALE, female'
                }

                return errors;
            }}
            onSubmit={(student, { setSubmitting }) => {
                addNewStudent(student).then(() => {
                    props.onSuccess();
                    setSubmitting(false);
                })
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                submitForm,
                isValid,
                /* and other goodies */
            }) => (
                    <form onSubmit={handleSubmit}>
                        <Input
                            style={inputBottomMargin}
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                            placeholder='First Name E.g John'
                        />
                        {errors.firstName && touched.firstName && <Tag style={tagStyle}>{errors.firstName}</Tag>}

                        <Input
                            style={inputBottomMargin}
                            name="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                            placeholder='Last Name E.g Doe'
                        />
                        {errors.lastName && touched.lastName && <Tag style={tagStyle}>{errors.lastName}</Tag>}


                        <Input
                            style={inputBottomMargin}
                            name="email"
                            type='email'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder='Email Address E.g johndoe@gmail.com'
                        />
                        {errors.email && touched.email && <Tag style={tagStyle}>{errors.email}</Tag>}

                        <Input
                            style={inputBottomMargin}
                            name="gender"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.gender}
                            placeholder='Gender E.g Male or Female'
                        />
                        {errors.gender && touched.gender && <Tag style={tagStyle}>{errors.gender}</Tag>}

                        <br /><br />
                        <Button onClick={() => submitForm()} style={inputBottomMargin} type="submit"
                            disabled={isSubmitting | (touched && !isValid)}>
                            Submit
                            </Button>
                    </form>
                )}
        </Formik>

    );

export default AddStudentForm;