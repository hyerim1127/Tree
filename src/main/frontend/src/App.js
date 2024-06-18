import Login from "./loginSignUp/Login";
import SignUp from "./loginSignUp/SignUp";
import WriteImpression from "./writeBoard/WriteImpression";
import View from "./viewBoard/View";
import Genre from "./genreImpression/Genre";
import MyMain from "./myPage/MyMain";
import MyLog from "./myPage/MyLog";

import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [msg, setMsg] = useState('')

  /*useEffect(() => {
    axios.get('/hello')
      .then(response => setMsg(response.data))
      .catch(error => console.log(error))
  }, []);*/

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/member/login" element={<Login />} />
        <Route path="/member/save" element={<SignUp />} />
        <Route path="/board/bookSave" element={<WriteImpression />} />
        <Route path="/board" element={<View />} />
        <Route path="/board/genre" element={<Genre />} />
        <Route path="/member" element={<MyMain />} />
        <Route path="/member/log" element={<MyLog />} />
       </Routes>

    </BrowserRouter>
  );
}

export default App;



