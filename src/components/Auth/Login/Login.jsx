import React from 'react';
import classes from './Login.module.scss';
import is from 'is_js';
import { connect } from 'react-redux';
import { auth, resetAuthError } from '../../../redux/actions/auth';
import Input from '../Input/input';
import { NavLink, Redirect } from 'react-router-dom';
import HrWithCentedText from '../HrWithCentedText/HrWithCentedText';

class Login extends React.Component {
  state = {
    isFormValid: true,
    formControls: {
      email: {
        value: 'test@test.lt',
        type: 'email',
        autocomplete: 'username',
        label: 'El. paštas',
        errorMessage: 'Įveskite teisingą el.paštą!',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: 'Test123456',
        type: 'password',
        autocomplete: 'current - password',
        label: 'Slaptažodis',
        errorMessage: 'Slaptažodis ne mažiau 6 simbolių!',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    );
  };

  registernHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    );
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }
    let isValid = true;
    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (validation.email) {
      isValid = is.email(value) && isValid;
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }
    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);
    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({ formControls, isFormValid });
  };
  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          autocomplete={control.autocomplete}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => this.onChangeHandler(event, controlName)}
          autoComplete={control.autocomplete}
        />
      );
    });
  }

  render() {
    const { authIsLoading, authError, tokenTrue, resetAuthError } = this.props;

    if (tokenTrue) {
      return <Redirect to='/' />;
    }
    if (authError) {
      setTimeout(() => {
        resetAuthError();
      }, 3000);
    }

    const componentLoader = (
      <div className='spinner-border spinner-border-sm' role='status'>
        <span className='sr-only' />
      </div>
    );

    return (
      <div>
        <div className={classes.Login}>
          <div
            className={`${'jumbotron'}`}
            style={{ backgroundColor: 'rgb(255,255,255, 0.5)' }}>
            <h1>TODO</h1>
            <form onSubmit={this.submitHandler}>
              {this.renderInputs()}

              {authError && (
                <div className='alert alert-dismissible alert-danger'>
                  {authError}
                </div>
              )}

              <button
                type='success'
                className='btn btn-success'
                onClick={this.loginHandler}
                disabled={!this.state.isFormValid || authIsLoading}
                style={{ marginTop: '1.3rem', marginBottom: '.1rem' }}>
                {authIsLoading ? componentLoader : 'Prisijungti'}
              </button>
              <HrWithCentedText hrText={'ARBA'} />
              <NavLink to='/Registration'>
                <button
                  type='primary'
                  className='btn btn-primary'
                  onClick={this.signUp}>
                  Registruotis
                </button>
              </NavLink>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authIsLoading: state.auth.authIsLoading,
    tokenTrue: !!state.auth.token,
    authError: state.auth.authError,
  };
};

export default connect(mapStateToProps, { auth, resetAuthError })(Login);
