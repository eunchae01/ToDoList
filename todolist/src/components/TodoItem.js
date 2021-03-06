import React from 'react';
import styled, {css} from 'styled-components';
import {MdDone, MdDelete} from 'react-icons/md';
import { useTodoDispatch } from '../TodoContext';

// 왼쪽에 있는 체크를 보여주는 컴포넌트
const CheckCircle = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    border: 1px solid #ced4da;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;

    ${props => props.done && css`
        border: 1px solid #91a7ff;
        color: #91a7ff;
    `}
`;

// 텍스트 보여주는 컴포넌트
const Text = styled.div`
    flex: 1;
    font-size: 21px;
    color: #495057;

    ${props => props.done && css`
        color : #ced4da;
    `}
`;

// 쓰레기통 아이콘 보여주는 컴포넌트
const Remove = styled.div`
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 24px;
    cursor: pointer;
    &:hover{
        color: #ff6b6b;
    }
`;

// 위 세개의 내용이 이 안에 들어옴
const TodoItemBlock = styled.div`
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;

    &:hover{
        ${Remove}{
            opacity: 1;
        }
    }
`;

function TodoItem({id, done, text}){
    const dispatch = useTodoDispatch();
    const onToggle = () => dispatch({
        type: 'TOGGLE',
        id
    });

    const onRemove = () => dispatch({
        type: 'REMOVE',
        id
    });

    return(
        <TodoItemBlock>
            <CheckCircle done={done} onClick={onToggle}>
                {done && <MdDone/>}
            </CheckCircle>
            <Text done={done}>{text}</Text>
            <Remove onClick={onRemove}>
                <MdDelete/>
            </Remove>
        </TodoItemBlock>
    );
}

export default React.memo(TodoItem);