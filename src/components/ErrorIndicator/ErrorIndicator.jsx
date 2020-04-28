import React from 'react';
import classes from './ErrorIndicator.module.scss';
import icon from './../../assets/error_image.png';

const ErrorIndicator = () => {
    return (
        <div className={classes.ErrorIndicator}>
            <img src={icon} alt="error_image" />
            <span>Oi, Kažkas atsitiko!</span>
            <span>
                Atsiprašome, mes jau tai tvarkome gedimą...
            </span>
        </div>
    );
};

export default ErrorIndicator;