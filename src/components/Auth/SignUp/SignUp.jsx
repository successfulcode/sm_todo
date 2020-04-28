import React, { Component } from 'react';
import Input from '../Input/input';
import classes from './SignUp.module.scss';
import HrWithCentedText from '../HrWithCentedText/HrWithCentedText';
import { connect } from 'react-redux';
import { auth, resetAuthError } from '../../../redux/actions/auth';
import { NavLink, Redirect } from 'react-router-dom';
import is from 'is_js';

class SignUp extends Component {
    state = {
        isFormValid: false,
        formControls: {
            name: {
                value: '',
                type: 'text',
                label: 'Vardas',
                errorMessage: 'Įveskite savo vardą!',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 2
                }
            },
            surname: {
                value: '',
                type: 'text',
                label: 'Pavardė',
                errorMessage: 'Įveskite savo pavardę!',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 2
                }
            },
            email: {
                value: '',
                type: 'email',
                autocomplete: 'username',
                label: 'El. paštas',
                errorMessage: 'Įveskite teisingą el.paštą!',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                autocomplete: 'new-password',
                label: 'Slaptažodis',
                errorMessage: 'Slaptažodis ne mažiau 6 simbolių!',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            },
            passwordTwoCheck: {
                value: '',
                type: 'password',
                autocomplete: 'new-password',
                label: 'Slaptažodis (Pakartokite)',
                errorMessage: 'Slaptažodžių laukai turi sutapti!',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    coincides: true
                }
            },
            checkBoxItem: {
                checked: false,
                type: 'checkbox',
                label: '',
                errorMessage: 'Turite patvirtinti, kad susipažinote su privatumo politika!',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    check: true
                }
            },
        }
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    checked={control.checked}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                    autoComplete={control.autocomplete}
                />
            );
        });
    };

    registernHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        );
    };

    submitHandler = (event) => { event.preventDefault() };

    validateControl(value, validation) {
        if (!validation) { return true }
        let isValid = true
        if (validation.required) {
            // isValid = value.trim() !== '' && isValid
        }
        if (validation.email) {
            isValid = is.email(value) && isValid
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }
        if (validation.coincides) {
            if (value === this.state.formControls.password.value) { return isValid }
            else { return false }
        }
        if (validation.check) {
            if (!this.state.formControls.checkBoxItem.checked === true) { return isValid }
            else { return false }
        }
        return isValid
    };

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };
        //event.target.checked
        control.checked = !control.checked
        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);
        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        });

        this.setState({ formControls, isFormValid });
    };

    render() {
        const componentLoader =
            <div className='spinner-border spinner-border-sm' role='status'>
                <span className='sr-only' />
            </div>;
        const { authIsLoading, authError, tokenTrue, resetAuthError } = this.props;
        if (tokenTrue) { return <Redirect to='/' /> }

        if (authError) { setTimeout(() => { resetAuthError() }, 3000); }

        return (
            <div className={classes.SignUp} >
                <div className='jumbotron' style={{ backgroundColor: 'rgb(255,255,255, 0.5)' }}>
                    <h1>TODO</h1>
                    <HrWithCentedText />
                    <h2>Registracija</h2>
                    <form onSubmit={this.submitHandler}>
                        {this.renderInputs()}

                        {authError &&
                            <div className='alert alert-dismissible alert-danger'>
                                {authError}
                            </div>
                        }

                        <button className='btn btn-danger' onClick={this.registernHandler}
                            disabled={!this.state.isFormValid || authIsLoading}
                        >
                            {authIsLoading ?
                                componentLoader
                                :
                                'Patvirtinti'
                            }
                        </button>
                    </form>
                    {/* Back button */}
                    <NavLink to='/Login'>
                        <span className='badge badge-primary' style={{ marginTop: '2rem' }}>
                            <i className='fas fa-angle-double-left' />
                            &nbsp;Atgal&nbsp;
                         </span>
                    </NavLink>
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        authIsLoading: state.auth.authIsLoading,
        authError: state.auth.authError,
        tokenTrue: !!state.auth.token
    };
};

export default connect(mapStateToProps, { auth, resetAuthError })(SignUp);
