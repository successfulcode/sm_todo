import React, { useState } from 'react';
import classes from './Paginator.module.scss';

const Paginator = ({ totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10 }) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;


    return (
        <>
            <div className={classes.Paginator}>
                <ul className='pagination pagination-sm'>
                    <li className='page-item disabled'>
                        <a className='page-link' href='#'>&laquo;</a>
                    </li>
                    <li className='page-item active'>
                        <a className='page-link' href='#'>1</a>
                    </li>
                    <li className='page-item'>
                        <a className='page-link' href='#'>2</a>
                    </li>
                    <li className='page-item'>
                        <a className='page-link' href='#'>3</a>
                    </li>
                    <li className='page-item'>
                        <a className='page-link' href='#'>4</a>
                    </li>
                    <li className='page-item'>
                        <a className='page-link' href='#'>5</a>
                    </li>
                    <li className='page-item'>
                        <a className='page-link' href='#'>&raquo;</a>
                    </li>
                </ul>
            </div>
            {/* 
            <div>
                PUSLAPIAI:
                <div className={styles.paginator}>
                    {portionNumber > 1 &&
                        <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}

                    {pages
                        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                        .map((p) => {
                            return <span className={cn({
                                [styles.selectedPage]: currentPage === p
                            }, styles.pageNumber)}
                                key={p}
                                onClick={(e) => {
                                    onPageChanged(p);
                                }}>{p}</span>
                        })}
                    {portionCount > portionNumber &&
                        <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>}
                </div>
            </div> */}

            {/* https://firebase.google.com/docs/database/rest/retrieve-data */}
        </>
    );
};

export default Paginator;
