import Login from "./Login";
import SignUp from "./SignUp";
import WriteImpression from "./WriteImpression";
import ModalImpression from "./impression/ModalImpression";
import View from "./View";
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {

  /*const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios({
      method:'GET',
      url:'https://jsonplaceholder.typicode.com/posts'
    }).then(response => setPosts(response.data))
  })

  <div>
    <ul>
    {posts.map(post => (
      <li key={post.id}>{post.title}</li>
    ))}
    </ul>
  </div>*/
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="save" element={<SignUp />} />
        <Route path="write-impression" element={<WriteImpression />} />
        <Route path="view" element={<View />} />
        <Route path="view-modal" element={<ModalImpression />} />
       </Routes>
       
    </BrowserRouter>
  );
}

export default App;