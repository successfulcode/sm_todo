import React from 'react';
import classes from './ListItem.module.scss';
import ModalAlert from '../Modal/ModalAlert';

const ListItem = ({ important, done,
    label, date, onToggleImportant, onToggleDone, onDelete, deleteLoading, id, importantLoading, onPushDeleteButton, offPushDeleteButton }) => {

    const deleteLoadingInProgrress = deleteLoading.some(taskId => taskId === id)
    const importantLoadinInProgress = importantLoading.some(taskId => taskId === id)

    //Bootsrap small spiner
    const spiner = (
        < div className='spinner-border spinner-border-sm' role='status' >
            <span className="sr-only" />
        </div>
    )

    return (
        <>
            {deleteLoadingInProgrress && <ModalAlert onDelete={onDelete}
                offPushDeleteButton={offPushDeleteButton} />}
            <span className={`${classes.ListItem} ${important && classes.important} ${done && classes.done}`}>
                <span
                    onClick={onToggleDone}>
                    <span className={`${classes.date}`} >{date}</span> {label}
                </span>

                {/* Delete button */}
                <button type='button'
                    className='btn btn-outline-danger btn-sm float-right'
                    // onClick={onDelete}
                    onClick={onPushDeleteButton}
                    disabled={deleteLoadingInProgrress}
                >
                    {deleteLoadingInProgrress ?
                        spiner
                        :
                        <i className='fas fa-trash-alt'></i>
                    }
                </button>

                {/* Important button */}
                <button type='button'
                    className='btn btn-outline-success btn-sm float-right'
                    onClick={onToggleImportant}
                    disabled={importantLoadinInProgress}
                >
                    {importantLoadinInProgress ?
                        spiner
                        :
                        <i className='fas fa-exclamation-circle'></i>
                    }

                </button>

            </span >
        </>
    )
}

export default ListItem;