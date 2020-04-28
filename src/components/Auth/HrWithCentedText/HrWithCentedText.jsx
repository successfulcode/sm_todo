import React from 'react';
import classes from './HrWithCentedText.module.scss';

const HrWithCentedText = (props) => {
    return (
        <div className={classes.HrWithCentedText} >
            <hr className={classes.hrText} data-content={props.hrText} />
        </div>
    )
};

export default HrWithCentedText;