import React from 'react';
import classes from './ItemStatusFilter.module.scss'
import { connect } from 'react-redux';
import { onFilterChangeRx } from '../../redux/actions/tasksActionsThunks';

const ItemStatusFilter = ({ filterRx, filterButtonsRx, onFilterChangeRx, items }) => {

    const buttons = filterButtonsRx.map(({ name, label }) => {
        const isActive = name === filterRx;
        const classNames = 'btn ' + (isActive ? 'btn-danger' : 'btn-outline-secondary');

        return (
            <button key={name}
                type='button'
                onClick={() => onFilterChangeRx(name)}
                className={classNames}
                disabled={!items}
            >{label}</button>

        );
    });

    return (
        <div className={`btn-group ${classes.ItemStatusFilter}`}>
            <div>{buttons}</div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        filterButtonsRx: state.label.filterButtonsRx,
        filterRx: state.label.filterRx,
        items: state.label.items
    }
};

export default connect(mapStateToProps, { onFilterChangeRx })(ItemStatusFilter);

