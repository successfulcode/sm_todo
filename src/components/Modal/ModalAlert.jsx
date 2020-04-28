import React, { Component } from 'react';
import classes from './ModalAlert.module.scss';

export default class ModalAlert extends Component {
    state = {
        isOpen: true
    };

    onOpenChangeHandler = () => {
        this.setState({ isOpen: !this.state.isOpen })
    };

    render() {
        const { isOpen } = this.state;
        const { onDelete, offPushDeleteButton } = this.props

        return (
            <>
                {isOpen &&
                    <div className={`${'modal'} ${classes.ModalAlert}`} >
                        <div className='card border-danger mb-3'>
                            <div className='card-header'>Dėmesio!</div>
                            <div className='card-body'>
                                <p className='card-text'>Ar tikrai norite ištrinti užduoti?</p>
                                <div className={classes.buttonsDiv}>
                                    <button className='btn btn-outline-success' onClick={() => { onDelete(); this.onOpenChangeHandler() }}>Taip</button>
                                    <button className='btn btn-outline-danger' onClick={offPushDeleteButton}>Ne</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>
        );
    };
};
