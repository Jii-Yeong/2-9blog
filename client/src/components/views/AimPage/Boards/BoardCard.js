import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteBoard, updateBoard } from '../../../../store/reducer/boards'
import './BoardCardStyle.scss';
import '../pages/BoardStyle.scss';
import { Card, Button } from 'react-bootstrap'
import note2 from './img/note2.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPen } from "@fortawesome/free-solid-svg-icons";
import ChangeBoardTitle from './ChangeBoardTitle';

const cardStyle = {
    width: "100%",
    height: "100%"
}

function BoardCard({ board}) {

    const dispatch = useDispatch();
    const [ChangeTitle, setChangeTitle] = useState(false);

    const BoardDelete = () => {
        const action = deleteBoard(board.id);
        console.log(action);
        dispatch(action);
    }

    const BoardUpdate = () => {
        setChangeTitle(true);
    }

    const updateComplete = ()=>{
        setChangeTitle(false);
    }

    return (
        <div className="BoardCardPage">
            <Card size="xl" style={{ cardStyle }}>
                <Card.Img variant="top" src={note2} />
                <Card.Body>
                    <Card.Title>
                        <Link to={`/board/${board.id}`}>{board.title}</Link>
                    </Card.Title>
                    <div className="boardIcon">
                        <FontAwesomeIcon icon={faMinus} onClick={BoardDelete} />
                        <FontAwesomeIcon icon={faPen} onClick={BoardUpdate} />
                    </div>
                    {ChangeTitle && <ChangeBoardTitle board={board} update={updateComplete} />}
                </Card.Body>
            </Card>
        </div>)
}

export default BoardCard;