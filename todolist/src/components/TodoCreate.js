import React, {useState} from 'react';
import styled, {css} from 'styled-components';
//더하기모양 아이콘
import {MdAdd} from 'react-icons/md';   
import { useTodoDispatch, useTodoNextId } from '../TodoContext';

const CircleButton = styled.button`
    background: #91a7ff;

    &:hover{
        background: #4c6ef5;
    }

    &:active{
        background: #91a7ff;
    }

    z-index: 5; //다른 것 가려야하기 때문
    cursor: pointer;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

    //가운데 맨 아래 보여지게 됨
    position: absolute;
    left: 50%;
    bottom: 0px;
    //버튼의 위치 더 정확하게 설정(해당 버튼사이즈의 오십퍼씩 더 움직임)
    transform: translate(-50%, 50%);

    font-size: 60px;    //아이콘 크기
    color: white;
    border-radius: 40px;

    border: none;
    outline: none;

    transition: 0.125s all ease-in;

    //오픈이라는 값이 투르일때 css
    ${props => props.open && css`
        background: #ff6b6b;

        &:hover{
            background: #ff8787;
        }

        &:active{
            background: #fa5252;
        }

        transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

// 어떤 폼의 위치를 정해주는 것
const InsertFormPositioner = styled.div`
    width: 100%;
    bottom: 0;
    left: 0;
    position: absolute;
`;

const InsertForm = styled.form`
    background: #f8f9fa;
    padding: 32px;
    padding-bottom: 72px;
    //모서리 둥글게했던거 안삐져나오게 하는것
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width: 100%;
    outline: none;
    font-size: 18px;
    box-sizing: border-box;
`;

function TodoCreate(){
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    
    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();

    const onToggle = () => setOpen(!open);
    const onChange = (e) => setValue(e.target.value);
    const onSubmit = e => {
        //새로고침 안하게 하는 함수(상태 날라가는것을 방지)
        e.preventDefault();

        dispatch({
            type: 'CREATE',
            todo: {
                id: nextId.current,
                text: value,
                done: false,
            }
        });

        setValue('');
        setOpen(false);
        nextId.current += 1;
    };

    return(
        <>
        {open && (
            <InsertFormPositioner>
                <InsertForm onSubmit={onSubmit}>
                    <Input 
                        placeholder='할 일을 입력 후, Enter를 눌러주세요' 
                        autoFocus
                        onChange={onChange}
                        value={value} 
                    />
                </InsertForm>
            </InsertFormPositioner>
        )}
        <CircleButton onClick={onToggle} open={open}>
            <MdAdd/>
        </CircleButton>
        </>
    );
}

//리엑트.메모해주고 괄호로 감싸주면 최적화,,
export default React.memo(TodoCreate);