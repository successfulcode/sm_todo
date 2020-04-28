import React from 'react';
import classes from './ButtonLogInOut.module.scss'

const ButtonLogInOut = (props) => {
    return (
        <span className={classes.ButtonLogInOut}>
            {props.isAuth ?
                <button className='btn btn-outline-primary btn-sm' onClick={() => { props.logout(); props.resetState() }
                }>
                    Atsijungti
                    <i className='fas fa-sign-out-alt' />
                </button>
                :
                null
            }
        </span >
    );
};

export default ButtonLogInOut;