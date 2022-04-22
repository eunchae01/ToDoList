import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../TodoContext';
import TodoItem from './TodoItem';

const TodoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto;
`;

function TodoList(){
    //state를 참조한다는 것
    const state = useTodoState();

    console.log(state);

    return (
        <TodoListBlock>
            <TodoItem text="프로젝트 생성하기" done={true}/>
            <TodoItem text="프로젝트 생성하기1" done={true}/>
            <TodoItem text="프로젝트 생성하기2" done={false}/>
            <TodoItem text="프로젝트 생성하기3" done={false}/>
        </TodoListBlock>
    );
}

export default TodoList;