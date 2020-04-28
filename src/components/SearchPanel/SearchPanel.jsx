import React, { Component } from 'react';
import classes from './SearchPanel.module.scss';
import { connect } from 'react-redux';
import { onSearchChangeRx } from '../../redux/actions/tasksActionsThunks';

class SearchPanel extends Component {

    state = {
        terms: ''
    };

    onTermChange = (e) => {
        const { onSearchChangeRx = () => { } } = this.props;
        this.setState({
            terms: e.target.value
        });
        onSearchChangeRx(e.target.value);
    };

    render() {
        return (
            <div>
                <input type='text'
                    className={`input-group-text ${classes.SearchPanel}`}
                    placeholder='Paieška...'
                    value={this.state.terms}
                    onChange={this.onTermChange}
                    disabled={!this.props.items}
                />
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        items: state.label.items
    }
};

export default connect(mapStateToProps, { onSearchChangeRx })(SearchPanel)
