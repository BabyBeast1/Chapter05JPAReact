import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './main/Index';
import WriteForm from './user/WriteForm';
import List from './user/List';
import UpdateForm from './user/UpdateForm';
import UploadForm from './user/UploadForm';
import UploadList from './user/UploadList';


const App = () => {
  return (
    <BrowserRouter>
      <>
        {/* 화면에 보이는 영역 */}
        <Routes>
          <Route path='/' element={ <Index /> } />
          {/* <Route path='/user/writeForm' element={ <WriteForm /> } />
          <Route path='/user/list' element= { <List /> } />
          <Route path='/user/updateForm/:userId' element={ <UpdateForm />} /> */}

          <Route path='/user'>
            <Route path='writeForm' element={ <WriteForm />} />
            <Route path='list/:page' element={ <List />} />

            <Route path='updateForm'>
              <Route path=':userId' element={ <UpdateForm />} />
            </Route>

            <Route path='uploadForm' element={ <UploadForm /> } />
            <Route path='uploadList' element={ <UploadList /> } />

          </Route>

        </Routes>
      </>
    </BrowserRouter>
  );
};

export default App;

/*
REST API                    axios
                            => axios의 request method
POST : 데이터 등록 및 전송    axios.post()
GET : 데이터 조회            axios.get()
PUT : 데이터 수정            axios.put()
DELETE : 데이터 삭제         axios.delete()
*/

