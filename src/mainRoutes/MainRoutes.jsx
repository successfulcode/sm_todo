import React, { Component } from 'react';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
import TasksPage from '../components/TasksPage/TasksPage';
import { connect } from 'react-redux';
import { autoLogin, logout } from '../redux/actions/auth';
import Login from '../components/Auth/Login/Login';
import SignUp from '../components/Auth/SignUp/SignUp';
import PrivacyPolicy from '../components/Auth/PrivacyPolicy/PrivacyPolicy';
import { resetState } from '../redux/actions/tasksActionsThunks';

class MainRoutes extends Component {

    componentDidMount() {
        this.props.autoLogin()
    }

    render() {
        let redirect;
        let routes;

        if (this.props.isAutenticated) {
            redirect = <Redirect to={'/'} />
            routes =
                <Switch>
                    <Route exact path='/About' render={() => this.props.logout} />
                    <Route exact path='/Login' render={() => <Login />} />
                    <Route exact path='/Registration' render={() => <SignUp />} />
                    <Route path='/' render={() => <TasksPage />} />
                    <Redirect to='/' />
                </Switch>

        }
        else {
            redirect = <Redirect to={'/Login'} />
            routes =
                <Switch>
                    <Route exact path='/Login' render={() => <Login />} />
                    <Route exact path='/Registration' render={() => <SignUp />} />
                    <Route exact path='/Privacy' render={() => <PrivacyPolicy />} />
                    <Route path='/' render={() => <TasksPage />} />
                    <Redirect to='/Login' />
                    <Redirect to='/' />
                </Switch>
        }
        return (
            <>
                {redirect}
                {routes}
            </>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        isAutenticated: !!state.auth.token
    };
};

export default
    withRouter(
        connect(mapStateToProps, { autoLogin, logout, resetState })(MainRoutes));

