import React, { Component } from 'react';
import { Field } from 'redux-form';
import Form from '../shared/form/Form';
import OAuthButton from '../shared/OAuthButton';
import renderField from '../shared/form/renderField';
import SubmitButton from '../shared/form/SubmitButton';

import {
  nameValidator,
  emailValidator,
  passwordValidator
} from '../../utils/validators';

class Register extends Component {
  componentDidMount() {
    this.redirectIfLoggedIn();
  }

  componentDidUpdate() {
    this.redirectIfLoggedIn();
  }

  redirectIfLoggedIn() {
    const { user, history, isAuthenticated } = this.props;
    if (isAuthenticated) history.push(`/u/${user.id}`);
  }

  onSubmit = formValues => {
    this.props.submitRegister(formValues);
  };

  render() {
    const { handleSubmit, loading } = this.props;
    return (
      <Form loading={loading} onSubmit={handleSubmit(this.onSubmit)} wide>
        <OAuthButton as="a" href="/auth/google">
          Quick register with Google
        </OAuthButton>
        <Field
          type="text"
          name="name"
          label="name"
          component={renderField}
          validate={nameValidator}
        />
        <Field
          type="email"
          name="email"
          label="email"
          component={renderField}
          validate={emailValidator}
        />
        <Field
          type="password"
          name="password"
          label="password"
          component={renderField}
          validate={passwordValidator}
        />
        <Field
          type="password"
          name="password2"
          label="confirm password"
          component={renderField}
          validate={passwordValidator}
        />
        <SubmitButton type="submit">Register</SubmitButton>
      </Form>
    );
  }
}

export default Register;
