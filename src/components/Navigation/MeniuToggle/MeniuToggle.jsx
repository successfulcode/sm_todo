import React from 'react';
import classes from './MeniuToggle.module.scss';

const MeniuToggle = ({ isOpen, onToggle }) => {

    const burgerFromBootstrap =
        <nav className='navbar navbar-expand-mb navbar-light bg-light' style={{ border: 'none', borderRadius: '80px', padding: '.1px' }}>
            <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarColor03' aria-controls='navbarColor03' aria-expanded='false' aria-label='Toggle navigation' >
                <span className='navbar-toggler-icon' ></span>
            </button>
        </nav>

    return (
        <span className={`${classes.MeniuToggle} ${isOpen && classes.open}`} onClick={onToggle} style={{ display: 'flex', justifContent: 'center' }} >
            {
                isOpen ?
                    <i className='fas fa-window-close' />
                    :
                    burgerFromBootstrap
            }
        </span >
    )
}

export default MeniuToggle;