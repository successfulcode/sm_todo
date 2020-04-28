import React from 'react';
import classes from './AppHeader.module.scss'
import { connect } from 'react-redux';

const AppHeader = ({ items }) => {

    let doneCount, importantCount, toDoCount, itemCount

    if (items) {
        doneCount = items.filter((item) => item.done).length;
        importantCount = items.filter((item) => item.important).length;
        toDoCount = items.length - doneCount;
        itemCount = items.length
    };

    return (
        <div className={classes.AppHeader}>
            {items ?
                <h2 style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    Turite užduočių - {itemCount} ,  svarbių - {importantCount}, neatliktų - {toDoCount},  atlikta - {doneCount}!
                </h2>
                :
                <h2 style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>Sveiki atvykę į programą Todo SM</h2>
            }
        </div>

    )
};

const mapStateToProps = (state) => {
    return {
        items: state.label.items
    }
};

export default connect(mapStateToProps, null)(AppHeader);
