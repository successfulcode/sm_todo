import React, { Component } from 'react';
import classes from './AddItem.module.scss';
import { connect } from 'react-redux';
import { sendTask, getTasksFromData, resetError } from '../../redux/actions/tasksActionsThunks';

class AddItem extends Component {
    state = {
        label: '',
        UIDD: localStorage.getItem('UID'),
        TOKENN: localStorage.getItem('token')
    };

    labelOnChange = (e) => {
        this.setState({ label: e.target.value });
    };

    addCreateItem = (e) => {
        e.preventDefault()
        this.props.sendTask(this.state.label, this.state.UIDD, this.state.TOKENN);
        this.setState({ label: '' });
    };

    render() {
        const { label } = this.state
        const { taskInProgress, error, resetError } = this.props

        return (
            <div>
                {
                    error &&
                    <div className='alert alert-dismissible alert-danger'>
                        <button type='button' className='close' data-dismiss='alert' onClick={resetError}>&times;</button>
                        <h4 className='alert-heading'>Dėmesio kažkas atsitiko, nepavyko įvykdyti prašomo veiksmo!</h4>
                        <p className='mb-0'>{error}</p>
                    </div>
                }
                <div className={classes.mainFormDIv}>
                    < div className='jumbotron' style={{ marginBottom: '0px' }}>
                        <form onSubmit={this.addCreateItem} className={classes.AddItem} style={{ width: '100%' }}>
                            <input type='text' className='input-group-text' placeholder='Įveskite užduotį' onChange={this.labelOnChange} value={label} />

                            <button className='btn btn-outline-success' type='submit' disabled={taskInProgress}>
                                {taskInProgress ?
                                    <div className='spinner-border spinner-border-sm' role='status'>
                                        <span className='sr-only' />
                                    </div>
                                    :
                                    'Pridėti'}
                            </button>
                        </form>
                    </div>
                </div>
            </div >
        )
    };
};

const mapStateToProps = (state) => {
    return {
        taskInProgress: state.label.taskInProgress,
        error: state.label.error
    };
};

export default connect(mapStateToProps, {
    sendTask, getTasksFromData, resetError
})(AddItem);
