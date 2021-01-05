import produce from 'immer';
import { createAction, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const CREATE_BOARD = "todo/CREATE_BOARD";
export const DELETE_BOARD = "todo/DELETE_BOARD";
export const UPDATE_BOARD = "todo/UPDATE_BOARD";

//define createBoard action 
export const createBoard = boardInfo =>({
    type: CREATE_BOARD,
    boardId : boardInfo.data.boardId,
    boardTitle : boardInfo.data.boardTitle 
}); 

export const deleteBoard = createAction(DELETE_BOARD, function prepare(boardId) {
    return {
        payload: {
            boardId: boardId
        }
    }
})

export const updateBoard = createAction(UPDATE_BOARD, function prepare(boardId, boardTitle) {
    return {
        payload: {
            boardId: boardId,
            boardTitle: boardTitle,
        }
    }
});


const actions = {
    CREATE_BOARD
};

export { actions };

const initialState = {
    boards: [{
        boardId: "",
        boardTitle: ""
    }]
};

//리듀서에도 저장하고 디비에서도 저장해야하는 건가



export default createReducer(initialState, {
    [CREATE_BOARD]: (state, action) => {
        return produce(state, draft => {
            draft.boards = [...state.boards, { boardId: action.boardId, boardTitle: action.boardTitle }];
        })
    },
    [DELETE_BOARD]: (state, action) => {
        return produce(state, draft => {
            draft.boards = state.boards.filter((board) => board.boardId !== action.payload.boardId);
        })
    },
    [UPDATE_BOARD]: (state, action) => {
        return produce(state, draft => {
            draft.boards = state.boards.map((board) => {
                if (board.boardId == action.payload.boardId) {
                    board = { ...board, boardTitle: action.payload.boardTitle };
                }
                return board;
            })
        })
    }
});
/*produce는 불변성을 관리할 수 있는 immer를 불러온 것으로
  (수정하고 싶은 상태, 업데이트 정의 함수)로 넣어준다.*/
