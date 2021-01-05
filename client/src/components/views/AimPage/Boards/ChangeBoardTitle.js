import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Button, Modal } from 'react-bootstrap'
import { updateBoard } from '../../../../store/reducer/boards'
import './BoardModal.scss';
import './BoardCardStyle.scss';

const ChangeBoardTitle = ({ board, update }) => {

    const [boardTitle, setBoardTitle] = useState('');
    const [show, setShow] = useState(true);
    const dispatch = useDispatch();
    const titleRef = useRef();

    const modalClose = () => {
        setShow(false);
        update()
    }

    const BoardTitleUpdate = (e) => {
        const updateTitle = titleRef.current.value;

        if (updateTitle == "")
            alert("제목을 입력해주세요.")
        else {
            const updateAction = updateBoard(board.id, updateTitle);
            dispatch(updateAction);
        }
        modalClose();
    }

    return (
        <div>
            <Modal className="BoardModal"
                show={show}
                onHide={modalClose}
                backdrop="static"
                keyboard={false} >
                <div className="modalContent">
                    <Modal.Dialog>

                        <Modal.Header closeButton onClick={modalClose} className="modal-header-css">
                            <Modal.Title>수정할 제목을 입력하세요.</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <input type="text" size="40" placeholder="입력" ref={titleRef}
                                onKeyPress={(e) => { if (e.key == "Enter") BoardTitleUpdate() }} />
                        </Modal.Body>

                        <Modal.Footer className="modalFooter">
                            <Button className="boardModalButton" onClick={BoardTitleUpdate}>저장</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                    </div>
            </Modal >
        </div>
        
    )
}

export default ChangeBoardTitle;