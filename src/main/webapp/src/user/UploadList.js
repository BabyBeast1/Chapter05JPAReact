import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import mainImage from '../image/망상토끼.gif';
import axios from 'axios';

const UploadList = () => {
    const [list, setList] = useState([])

    useEffect(() => {
        axios.get('/user/uploadList')
             .then(res => {
                setList(res.data)
                console.log(res.data)
             })
             .catch(error => console.log(error))
    }, [])

    return (
        <div>
            <h3>
                <Link to='/'>
                <img src={ mainImage } alt='망상토끼' width='100' height='100' />
                </Link>
            </h3>
            <table border='1'>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>이미지</th>
                        <th>상품명</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map(item => <tr key={ item.seq } style={{ textAlign: 'center'}}>
                            <td>{ item.seq }</td>
                            <td>
                                <img src={`../storage/${encodeURIComponent(item.imageOriginalName)}`} 
                                     alt={ item.imageName } 
                                     style={{ width: 100, height: 100 }} />
                            </td>
                            <td>{ item.imageName }</td>
                        </tr>)
                    }

                </tbody>
                <tfoot></tfoot>

            </table>
        </div>
    );
};

export default UploadList;