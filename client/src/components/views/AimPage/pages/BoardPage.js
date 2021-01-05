import React, { Fragment, useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import uuid from 'uuid/v4';
import CreateBoardCard from '../Boards/CreateBoardCard';
import BoardCard from '../Boards/BoardCard';
import { BoardType } from '../../../../store/reducer/boards';
import './BoardStyle.scss';
import { Card, Button, Accordion, Modal, ButtonGroup, Pagination, PageItem } from 'react-bootstrap'
import { createBoard } from '../../../../store/reducer/boards';

function BoardPage() {

    const check = useSelector((state) => {
        return state.board.boards.filter((board,index) => board.id !== "")
    });

    const [open, setOpen] = useState(false);
    const pageRef = useRef();

    const handleClose = () => {
        setOpen(false);
    }
    const handleShow = () => {
        setOpen(true)
    };

    const isClosed = (result) => {
        handleClose();
    }

    let pageItem = [];
    let pageCard = [];

    const [activeValue, setActiveValue] = useState(1);

    const pageClick = (e) => {
        if(e.currentTarget.innerText.indexOf('current') == -1) //지금 현재 클릭한 버튼이 활성화되지 않으면
            setActiveValue(e.currentTarget.innerText);
    }

    for (let num = 1; num <= Math.ceil(check.length / 5); num++) { //
        pageItem.push(
            <Pagination.Item key={num} active={num == activeValue} onClick={(e) => pageClick(e)}>
                {num}
            </Pagination.Item>
        )
    }

    pageCard = check.filter((board, index) =>{
        return 5 * activeValue - 5 <= index && index <= 5 * activeValue-1 
    });

    return (
        <div className="BoardPage" ref={pageRef}>
            <Button onClick={handleShow} size="30px" size="sm">CreateBoard</Button>
            <div className="BoardStyle">
                {pageCard.map((board) =>
                    <BoardCard key={board.id} board={board} />
                )}
            </div>
            {open ? <CreateBoardCard closed={isClosed} /> : ''}
            <div className="paging">
                <Pagination size="md">{pageItem}</Pagination>
            </div>
        </div>
    );
}


export default BoardPage;