import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Drawer.module.scss';
import Backdrop from '../Backdrop/Backdrop';

export default class Drawer extends Component {
    clickHeandler = () => {
        this.props.onClose()
    };

    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>

                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={link.active}
                        onClick={this.clickHeandler}
                        target={link.target}
                    >
                        <i className={link.imageName} style={{ color: link.imageColor }} />
                        {this.label = link.label}
                    </NavLink>
                </li>
            )
        })
    };

    render() {
        const links = [
            {
                to: '/', label: '', exact: true,
                imageName: '', imageColor: ''
            }
        ];

        if (this.props.isAuth) {
            links.push({ to: '/', label: 'Pagrindinis', exact: false, imageName: 'fas fa-home', imageColor: '#CADB06' })
        } else {
            links.push({ to: '/Login', label: 'Pagrindinis', exact: false, imageName: 'fas fa-home', imageColor: '#CADB06' })
            links.push({ to: '/Privacy', label: 'Privatumas', exact: false, imageName: 'fas fa-key', imageColor: '#FB3105' })
            links.push({ to: '/Login', label: 'Prisijungti', exact: false, imageName: 'fas fa-sign-in-alt', imageColor: 'green' })
            links.push({ to: '/Registration', label: 'Registruotis', exact: false, imageName: 'fas fa-user-plus', imageColor: 'red' })
        };

        return (
            <>
                <nav className={`${classes.Drawer} ${!this.props.isOpen && classes.close}`}>
                    <ul>
                        {this.renderLinks(links)}
                        <li> <a href='https://www.linkedin.com/in/mickevic' target='_blank' rel='noopener noreferrer'>
                            <i className='fab fa-linkedin' style={{ color: 'blue' }} />
                            Apie</a> </li>
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClose={this.props.onClose} /> : null}
            </>
        )

    }
};