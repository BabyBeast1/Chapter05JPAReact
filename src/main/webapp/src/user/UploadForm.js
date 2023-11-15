import React, { useRef, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

import styles from '../css/UploadForm.module.css';
import mainImage from '../image/망상토끼.gif';
import cameraImg from '../image/camera.png';
import axios from 'axios';

const UploadForm = () => {
    const imgRef = useRef()

    const [userUploadDTO, setUserUploadDTO] = useState({
        imageName: '',
        imageContent: '',
        imageFileName: '',
        imageOriginalName: ''
    })
    const { imageName, imageContent } = userUploadDTO

    const [imgList, setImgList] = useState([])
    const [files, setFiles] = useState('')

    const navigate = useNavigate()

    const onInput = (e) => {
        const { name, value } = e.target

        setUserUploadDTO({
            ...userUploadDTO,
            [name]: value
        })
    }

    const onCamera = () => {
        imgRef.current.click()
    }
    
    const onImgInput = (e) => {
        const imgFiles = Array.from(e.target.files)
        var imgArray = []

        imgFiles.map(item => {
            const objectURL = URL.createObjectURL(item)
            imgArray.push(objectURL)

            //map 함수는 배열을 변환하는데, 값을 반환하지 않을 경우 undefined를 반환한다.
            //따라서 명시적으로 값을 반환하도록 수정해야 한다.
            return null;
        })

        setImgList(imgArray) //카메라 아이콘을 누르면 이미지 미리보기 용도
        setFiles(e.target.files) //formData에 넣어서 서버로(스프링 부트) 보내기
    }

    const onUploadSubmit = (e) => {
        e.preventDefault()

        var formData = new FormData()

        formData.append( 'userUploadDTO', new Blob([JSON.stringify(userUploadDTO)], {type: 'application/json' }) )
        // for(var i=0; i<files.length; i++){
        //     formData.append('img', files[i])
        // }    // 아래 오브젝트와 같은 성능을 가짐
        Object.values(files).map((item, index) => {
            formData.append('img', item)
        })

        axios.post('/user/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            alert('이미지 업로드 완료')
            navigate('/user/uploadList')
        })
        .catch(error => console.log(error))
    }

    const onReset = (e) => {
        e.preventDefault()

        setUserUploadDTO({
            imageName: '',
            imageContent: '',
            imageFileName: '',
            imageOriginalName: ''
        })

        setImgList([])
        imgRef.current.value = ''
    }

    // const readURL = (input) => {
    //     var reader = new FileReader();
    //     reader.readAsDataURL(input.files[0])

    //     reader.onload = () => {
    //         console.log(input.files[0])
    //         setShowImgSrc(reader.result)
    //         setFile(input.files[0])

    //     }
    // }

    return (
        <div>
            <h3>
                <Link to='/'>
                <img src={ mainImage } alt='망상토끼' width='100' height='100' />
                </Link>
            </h3>
            <form className={ styles.UploadForm}>
                <table border={1}>
                    <thead/>
                    <tbody>
                        <tr>
                            <th>상품명</th>
                            <td>
                                <input type="text" name="imageName" size='35' value={ imageName } onChange={ onInput } />
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={2} align="center">
                                <textarea name='imageContent' rows='10' cols='60' value={ imageContent } onChange={ onInput } ></textarea>
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={2}>
                                <span>
                                    {
                                        // 선택한 이미지를 미리보기
                                        imgList.map((item, index) => <img key={ index } 
                                                                          src={ item } 
                                                                          style={{ width: '100px', height: '100px' }} 
                                                                          alt='' />)
                                    }
                                </span>

                                <img id="camera" src={ cameraImg } alt="카메라"
                                     onClick={ onCamera }
                                     style={{ width: 40, height: 40, borderRadius: 20 }} />
                                <input type="file" name="img[]" multiple='multiple'
                                    ref={ imgRef }
                                    onChange={ onImgInput }
                                    style={{visibility: "hidden"}} />
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={2} align="center">
                                <button onClick={ onUploadSubmit }>이미지 업로드</button> &nbsp;
                                <button onClick={ onReset }>취소</button>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot/>
                </table>
            </form>
        </div>
    );
};

export default UploadForm;