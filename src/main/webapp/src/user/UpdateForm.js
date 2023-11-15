import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import mainImage from '../image/망상토끼.gif';
import axios from 'axios';
import styles from '../css/UpdateForm.module.css';

const UpdateForm = () => {
    const { userId } = useParams()
    console.log(userId)

    const [userDTO, setUserDTO] = useState({
        name: '',
        id: userId,
        pwd: ''
    }) 
    const { name, id, pwd } = userDTO

    const [nameDiv, setNameDiv] = useState('')
    const [pwdDiv, setPwdDiv] = useState('')

    const navigate = useNavigate()

    const [reset, setReset] = useState(false)

    const onInput = (e) => {
        const { name, value } = e.target

        setUserDTO({ ...userDTO,
             [name]: value 
        })
    }

    const onUpdateSubmit = (e) => {
        e.preventDefault()

        var sw = 1
        if(!name) {
            setNameDiv('이름 입력')
            sw = 0
        }
        if(!pwd) {
            setPwdDiv('비밀번호 입력')
            sw = 0
        }
        if(sw === 1){
            //axios.put('http://localhost:8080/user/update', null, { params: userDTO })
            axios.put('/user/update', null, { params: userDTO })
                 .then(
                    alert('회원님의 정보를 수정하였습니다.'),
                    navigate('/user/list'))
                 .catch(error => console.log(error))
        }
    }

    const onDeleteSubmit = (e) => {
        e.preventDefault()

        //axios.delete(`http://localhost:8080/user/delete?id=${userId}`)
        axios.delete(`/user/delete?id=${userId}`)
             .then(
                alert('회원님의 정보를 삭제하였습니다.'),
                navigate('/user/list'))
             .catch(error => console.log(error))
    }

    const onReset = (e) => {
       setReset(!reset)
    }

    useEffect(() => {
        //axios.get(`http://localhost:8080/user/getUser?id=${userId}`)
        axios.get(`/user/getUser?id=${userId}`)
             .then(res => setUserDTO(res.data))
             .catch(error => console.log(error))
    }, [reset, userId])

    return (
        <div>
             <h3>
                <Link to='/'>
                <img src={ mainImage } alt='망상토끼' width='100' height='100' />
                </Link>
            </h3>
            <form className={ styles.updateForm }>
                <table border='1'>
                    <thead></thead>
                    <tbody>
                    <tr>
                        <th>이름</th>
                        <td>
                            <input type='text' name='name' value={ name } onChange={ onInput } />
                            <div id='nameDiv'>{ nameDiv }</div>
                        </td>
                    </tr>

                    <tr>
                        <th>아이디</th>
                        <td>
                            <input type='text' name='id' value={ id } readOnly />
                        </td>
                    </tr>

                    <tr>
                        <th>비밀번호</th>
                        <td>
                            <input type='password' name='pwd' value={ pwd } onChange={ onInput } />
                            <div id='pwdDiv'>{ pwdDiv }</div>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan='2' align='center'>
                            <button onClick={ onUpdateSubmit }>수정</button> &emsp;
                            <button onClick={ onDeleteSubmit }>삭제</button> &emsp;
                            <button onClick={ () => navigate('/user/list') }>목록</button> &emsp;
                            <button onClick={ onReset }>취소</button>
                        </td>
                    </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </form>
        </div>
    );
};

export default UpdateForm;