
// class
import React, { Component } from 'react';
import classes from './List.module.scss';
import ListItem from '../ListItem/ListItem';
import { connect } from 'react-redux';
import {
    deleteTaskFromData,
    changeDoneStatus,
    changeImportantStatus,
    onPushDeleteButton,
    offPushDeleteButton,
    getTasksFromData
} from '../../redux/actions/tasksActionsThunks';
import Loader from '../../loader/Loader';

class List extends Component {

    state = {
        UIDD: localStorage.getItem('UID'),
        TOKENN: localStorage.getItem('token')
    }

    componentDidMount() {
        this.props.getTasksFromData(this.state.UIDD, this.state.TOKENN);
    };

    render() {

        const {
            //props
            itemsRx,
            filterRx,
            searchRx,
            deleteTaskFromData,
            changeDoneStatus,
            changeImportantStatus,
            loading,
            deleteLoading,
            importantLoading,
            onPushDeleteButton,
            offPushDeleteButton
        } = this.props

        const { UIDD, TOKENN } = this.state

        const searchItems = (itemsRx, searchRx) => {
            if (searchRx.length === 0) {
                return itemsRx;
            }
            return itemsRx.filter((item) => {
                return item.label.toLowerCase().indexOf(searchRx.toLowerCase()) > -1;
            });
        };

        const filterItems = (itemsRx, filterRx) => {
            if (filterRx === 'all') {
                return itemsRx;
            } else if (filterRx === 'active') {
                return itemsRx.filter((item) => (!item.done));
            } else if (filterRx === 'done') {
                return itemsRx.filter((item) => item.done);
            }
            else if (filterRx === 'important') {
                return itemsRx.filter((item) => item.important && !item.done);
            }
        }

        const visibleItems = searchItems(filterItems(itemsRx, filterRx), searchRx);



        let elements;
        if (visibleItems) {
            elements = visibleItems.map((item) => {
                const { id, important, done, label, date } = item;
                return (
                    <li key={id} className="list-group-item">
                        <ListItem
                            onToggleImportant={() => changeImportantStatus(id, important ? false : true, UIDD, TOKENN)}
                            onToggleDone={() => changeDoneStatus(id, done ? false : true, UIDD, TOKENN)}
                            onDelete={() => deleteTaskFromData(id, UIDD, TOKENN)}
                            important={important}
                            done={done}
                            label={label}
                            date={date}
                            deleteLoading={deleteLoading}
                            id={id}
                            importantLoading={importantLoading}
                            onPushDeleteButton={() => onPushDeleteButton(id, deleteLoading ? true : false)}
                            offPushDeleteButton={() => offPushDeleteButton(id, false)}
                        />
                    </li>
                );
            });
        }

        return (
            <div className={classes.List}>
                {
                    loading ?
                        <Loader />
                        :
                        !itemsRx || !visibleItems.length ?

                            <div className='jumbotron' style={{ background: 'rgb(255, 255, 255, 0.5)' }} >
                                <h2 style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>Neturite užduočių...</h2>
                            </div>

                            :
                            <div>
                                <ul className={`list-group ${classes.List}`} style={{ height: 'auto', marginBottom: '2rem' }} >
                                    {elements}
                                </ul >
                            </div>
                }
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        itemsRx: state.label.items,
        filterRx: state.label.filterRx,
        searchRx: state.label.search,
        loading: state.label.loading,
        deleteLoading: state.label.deleteLoading,
        importantLoading: state.label.importantLoading
    };
};


export default connect(mapStateToProps, {
    deleteTaskFromData,
    changeDoneStatus,
    changeImportantStatus,
    onPushDeleteButton,
    offPushDeleteButton,
    getTasksFromData
})(List);
