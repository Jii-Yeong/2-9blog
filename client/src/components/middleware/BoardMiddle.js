import React from 'react';
import ReduxThunk from 'redux-thunk';
import store from 'store';
import { useDispatch } from 'react-redux';
import { createBoard, updateBoard, deleteBoard } from '../../store/reducer/boards';
import { v4 as uuid } from 'uuid';
import axios from 'axios';


//thunk 함수
export const BoardCreateAction=(boardTitle) => async dispatch => {
    
    const url = '/todos/createBoard/';
    const option = {
        method: 'POST',
        url: url,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            boardId: uuid(),
            boardTitle: boardTitle
        }
    }
    dispatch(createBoard(option)); //dispatch to redux

    const res = await axios(option);
    const data = res.data;

    console.log(res);
    // if(res.statusText === "OK" && res.status === 200 && data.message === "ok" )
}


export function BoardUpdateAction(boardId, boardTitle) {
    return async dispatch => {
        const url = '/todos/updateBoard/';
        const option = {
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                boardId: boardId,
                boardTitle: boardTitle
            }
        }
        dispatch(updateBoard());
    }
}

export function BoardDeleteAction(boardId, boardTitle) {
    return async dispatch => {
        const url = '/todos/deleteBoard/';
        const option = {
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                boardId: boardId
            }
        }
        dispatch(deleteBoard());
    }
}

//createBoard는 action을 받는다.