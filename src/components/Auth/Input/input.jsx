import React from 'react';
import { NavLink } from 'react-router-dom';

const Input = ({
    type,
    label,
    value,
    onChange,
    errorMessage,
    checked,
    autoComplete,
    ...props
}) => {
    const inputType = type || 'text' //We getting input or default type text
    const htmlFor = `${inputType} ${Math.random()}`//htmlFor random value
    const isInvalid = ({ valid, touched, shouldValidate }) => {
        return !valid && touched && shouldValidate
    } //Function сheck valid, touched, shouldValidate errors in the input

    let inputClassname
    let labelClasssname
    if (inputType === 'checkbox') {
        inputClassname = ('form-check-input')
        labelClasssname = ('form-check-label')
    } else {
        inputClassname = ('form-control')
        labelClasssname = ('form-control-label')
    }

    return (
        <div className='form-group'>
            <label htmlFor={htmlFor}
                className={labelClasssname}
            >{label}  </label>
            <input
                type={inputType}
                id={htmlFor}
                value={value}
                checked={checked}
                onChange={onChange}
                autoComplete={autoComplete}
                className={`
                ${inputClassname}
                ${isInvalid(props) && 'is-invalid'}
                ${props.valid && 'is-valid'}
                `}
            />

            {inputType === 'checkbox' &&
                <>
                    Parvirtinu, kad susipažinau su
                    <NavLink to='/Privacy' style={{ marginLeft: '.4rem' }}>
                        Privatumo politika
                    </NavLink>
                </>
            }

            {
                isInvalid(props) ?
                    <span className='invalid-feedback'>{errorMessage || 'Įveskite teisingą reikšmę!'}</span>
                    : null
            }
        </div >
    );
};

export default Input;