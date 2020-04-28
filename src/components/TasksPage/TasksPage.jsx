import React from 'react';
import classes from './TasksPage.module.scss'
import AppHeader from '../AppHeader/AppHeader';
import List from '../List/List';
import AddItem from '../AddItem/AddItem';
import SearchPanel from '../SearchPanel/SearchPanel';
import ItemStatusFilter from '../ItemStatusFilter/ItemStatusFilter';
// import Paginator from '../Paginator/Paginator';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const TasksPage = ({ isAuth }) => {

    if (!isAuth) { return <Redirect to='/Login' /> }

    return (
        <div className={classes.TasksPage}>
            <AppHeader />
            <AddItem />
            <div className={classes.AlignItem}>
                <div><SearchPanel /></div>
                <div><ItemStatusFilter /></div>
            </div>
            <List />
            {/* <Paginator /> */}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuth: !!state.auth.token
    };
};

export default connect(mapStateToProps, null)(TasksPage);