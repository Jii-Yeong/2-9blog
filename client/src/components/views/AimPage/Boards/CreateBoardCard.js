import { passActionAsync } from 'components/middleware/BoardMiddle';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBoard } from '../../../../store/reducer/boards';
import { BoardCreateAction } from '../../../middleware/BoardMiddle';
import './BoardCardStyle.scss';
import './BoardModal.scss';
import { Card, Button, Modal } from 'react-bootstrap'

const CreateBoardCard = ({ closed }) => {

    const tareaRef = useRef();
    const AimRef = useRef();
    const dispatch = useDispatch();

    const [showing, setShowing] = useState(true);

    const handleClose = (e) => {
        setShowing(false);
        closed(true);
        console.log(e)
    };


    const BoardConstruct = (e) => {
        const title = AimRef.current.value;

        if (title === "") {
            alert("세울 목표의 주제를 적어주세요. ex) 동아리 프로젝트")
        }
        else {
            dispatch(BoardCreateAction(title));
        }
    }
    
    return (
        <div>
            {showing ? (
                <Modal
                    show={showing}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false} >
                    <div className="modalContent">
                        <Modal.Dialog>
                            <Modal.Header closeButton onClick={(e) => handleClose(e)} className="modal-dialog-css">
                                <Modal.Title>목표 주제가 무엇인가요?</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <input type="text" ref={AimRef} size="40" placeholder="목표 주제를 적어주세요"
                                    onKeyPress={(e) => { if (e.key == "Enter") BoardConstruct(e) }} />
                            </Modal.Body>

                            <Modal.Footer className="modalFooter">
                                <Button variant="primary" className="boardModalButton" onClick={(e) => BoardConstruct(e)}>저장</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                </Modal >
            ) : ''}
        </div>
    )
}

export default CreateBoardCard;