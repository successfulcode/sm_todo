import React, { Component } from 'react';
import classes from './Loyout.module.scss';
import Drawer from '../components/Navigation/Drawer/Drawer';
import MeniuToggle from '../components/Navigation/MeniuToggle/MeniuToggle';
import { connect } from 'react-redux';
import ButtonLogInOut from '../components/Auth/ButtonLogInOut/ButtonLogInOut';
import { logout } from '../redux/actions/auth';
import { resetState } from '../redux/actions/tasksActionsThunks';
import ParticlesBg from 'particles-bg';

class Loyout extends Component {

    state = {
        navigationIisOpen: false
    };

    toggleNavigationHandler = () => {
        this.setState({
            navigationIisOpen: !this.state.navigationIisOpen
        })
    };

    navigationCloseHandler = () => {
        this.setState({
            navigationIisOpen: false
        })
    };

    render() {

        const { isAuth, logout } = this.props

        let config = {
            position: 'all'
        }

        return (
            <div>
                < ParticlesBg type='circle' bg={true} config={config} />
                <div className='container' >

                    <div className={classes.Loyout} >
                        <br />
                        <Drawer isOpen={this.state.navigationIisOpen}
                            onClose={this.navigationCloseHandler}
                            isAuth={isAuth}
                        />
                        <MeniuToggle
                            onToggle={this.toggleNavigationHandler}
                            isOpen={this.state.navigationIisOpen}
                        />
                        <ButtonLogInOut
                            isAuth={isAuth}
                            logout={logout}
                            resetState={this.props.resetState}
                        />
                        <main className='container' >
                            {this.props.children}
                        </main>
                    </div>
                </div>
            </div>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        isAuth: !!state.auth.token
    };
};

export default connect(mapStateToProps, { logout, resetState })(Loyout);

