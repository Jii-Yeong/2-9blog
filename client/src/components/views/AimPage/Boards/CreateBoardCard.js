import { passActionAsync } from 'components/middleware/CreateBoardMiddle';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBoard } from '../../../../store/reducer/boards';
import './BoardCardStyle.scss';
import { Card, Button, Modal } from 'react-bootstrap'

const CreateBoardCard = ({ closed }) => {

    const tareaRef = useRef();
    const AimRef = useRef();
    const dispatch = useDispatch();

    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        closed(true);
    };

    const BoardConstruct = (e) => {
        const title = AimRef.current.value;

        if (title === "") {
            alert("세울 목표의 주제를 적어주세요. ex) 동아리 프로젝트")
        }
        else{
            const action = createBoard(title);
            console.log(e.key)
            dispatch(action);
            e.currentTarget.value = "";
        }
    }

    const deleteBoard = () => {
        console.log('f')
    }

    return (
        <>
            {show ? (
                <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Dialog style={{position : "fixed"}}>
                    <Modal.Header closeButton onClick={handleClose}>
                        <Modal.Title>Write your Aim</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <input type="text" ref={AimRef} placeholder="목표 주제를 적어주세요"
                            onKeyPress={(e) => { if (e.key == "Enter") BoardConstruct(e) }} />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={(e) => BoardConstruct(e)}>저장</Button>
                    </Modal.Footer>
                </Modal.Dialog>
                </Modal> ) : ''}
        </>
    )
}

export default CreateBoardCard;