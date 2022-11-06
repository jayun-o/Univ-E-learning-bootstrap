import React from 'react';
import LandingPage from './components/LandingPage'
import AnotherPage from './components/AnotherPage';
import Category from './components/Category/Category';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CreatePost from "./components/Post/CreatePost"
// import Timeline from './components/Timeline/TimelineBlog';
import TimelineBlog from './components/Timeline/TimelineBlogHead';
import TabCreate from './components/Blog/TabCreate';
import ShowBlog from './components/Blog/ShowBlog';

function App() {

  return (
    <Router>
    <Routes>
      <Route exact path="/" element={<LandingPage/>} />
      <Route path="/page" element={<AnotherPage/>}/>
      <Route path="/category" element={<Category/>}/>
      {/* <Route path="/create" element={<CreatePost/>} /> */}
      <Route path="/create" element={<TabCreate/>} />
      <Route exact path="/Timeline/:sub_name" element={<TimelineBlog/>} />
      <Route path="/Timeline/:sub_name/:id" element={<ShowBlog/>}/>
      {/* <Route path="/createblogtest" element={<CreateBlogTest/>} /> */}
    </Routes>
  </Router>
  
  );
}

export default App;