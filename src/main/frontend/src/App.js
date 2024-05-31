import Login from "./Login";
import SignUp from "./SignUp";
import WriteImpression from "./WriteImpression";
import Nothing from "./Nothing";
import View from "./View";
import Genre from "./Genre";
import MyMain from "./myPage/MyMain";
import MyLog from "./myPage/MyLog";
//import axios from 'axios';
import React from 'react';
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
        <Route path="/member/save" element={<SignUp />} />
        <Route path="/board/bookSave" element={<WriteImpression />} />
        <Route path="/board" element={<View />} />
        <Route path="/nothing" element={<Nothing />} />
        <Route path="/board/genre" element={<Genre />} />
        <Route path="/member" element={<MyMain />} />
        <Route path="/member/log" element={<MyLog />} />
       </Routes>
       
    </BrowserRouter>
  );
}

export default App;