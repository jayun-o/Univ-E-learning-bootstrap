import React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import '../Blog/ShowBlog.css';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import parse from 'html-react-parser'
import NavbarScrollAnotherPage from '../Navbar/AnotherPage/NavbarScrollAnotherPage';
import Swal from "sweetalert2";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { Button } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';







const ShowBlog = () => {

    const [posts,setPosts] = useState([]);
    const postID = localStorage.getItem('post_id');
    const user_id =localStorage.getItem('userID');
    const [textComment, setTextComment] = useState('');
    const [score, setScore] = useState('');
    const [comments, setComments] = useState([]);
    const token = localStorage.getItem('token');
    const [updateStat, setUpdateStat] = useState(false);
    const htmlString = (posts.body || '')
    const { sub_name } = useParams();
    const navigate = useNavigate();
    const [userLogin, setUserlogin] = useState();
    // const {DataisLoaded} = useState(true);


    const str = (posts.hastag || ',')
    const arrayHashtag = typeof str === 'object' ? str : str.split(',');
    // console.log(arrayHashtag); '

    const countComment = (comments.all_comment || []).length;
    // console.log(countComment)

    ///// Sort commenst to show the newest comments on top ///////
    const listComments = (comments.all_comment || [])
    // const list = (comments.all_comment || [])
    listComments.sort((a, b) => (a.id > b.id) ? -1 : 1)

    // const listAscending = (comments.all_comment || [])
    // listAscending.sort((a, b) => (a.id < b.id) ? 1 : -1)
    // console.log(list) sortedProducts.sort((a, b) => {



    
    const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      
      color: '#ff6d75',
    },

    '& .MuiRating-iconHover': {
      
      color: '#ff3d47',
    },
    });


    //////// Display Post ////////////
    useEffect(() => {   
      fetch(`https://univelear.herokuapp.com/api/posts/${postID}`)
        .then(response => response.json())
        .then(data => setPosts(data.data))
    },[])

    // console.log(posts)


    

    /////////////// Display All Comments ///////////////////////////
    const FetchComment = () => {
      return fetch("https://univelear.herokuapp.com/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({postID: postID}),
      })
      .then(response => response.json())
      .then(data => setComments(data.data))
    }

    useEffect(() => {

      FetchComment();
      const userString = localStorage.getItem("user");
      setUserlogin(userString);

    },[updateStat])

  
  const CreateComment = () => {
    // const userLogin = localStorage.getItem("token")
    if(!userLogin){
      Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please Sign in before',
    })
    }
    if(userLogin){
      Swal.fire({
        icon: 'success',
        // title: 'Success',
        text: 'Your comment was added successfully'
    })
    return fetch("https://univelear.herokuapp.com/api/comment/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({postID: postID, description: textComment, score: score}),
    })
      .then((data) => data.json())
      .then(FetchComment())
      .then((data) => setUpdateStat(data.data))
      .then((data) => console.log(data))
     }
    }

  ////////Delete Post////////////////////
  const deletePost = async (id) => {
    const isConfirm = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        return result.isConfirmed
    })

    if (!isConfirm) {
        return;
    }
    await axios.delete(`https://univelear.herokuapp.com/api/delete/post/${id}`,{
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
    .then(({data}) => {
        Swal.fire({
            icon: 'success',
            text: data.message
        })
        navigate(-1)
        FetchComment()
    }).catch(({response:{data}}) => {
        Swal.fire({
            text: data.message,
            icon: 'error'
        })
    })
}
  

////////////Delete Comment////////////////

const deleteComment = async (id) => {
  const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
  }).then((result) => {
      return result.isConfirmed
  })

  if (!isConfirm) {
      return;
  }
  await axios.delete(`https://univelear.herokuapp.com/api/delete/comment/post/${id}`,{
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  })
  .then(({data}) => {
      Swal.fire({
          icon: 'success',
          text: data.message
      })
      FetchComment()
  }).catch(({response:{data}}) => {
      Swal.fire({
          text: data.message,
          icon: 'error'
      })
  })
}

  var relativeTime = require('dayjs/plugin/relativeTime')
  dayjs.extend(relativeTime)


if(user_id!=posts.userID){
    return (
      <div>

        <div class='container-xl'>
        <div className='navbar-timeline'>
            <NavbarScrollAnotherPage/>
          </div>
        {/* Post Content */}
          <header>
          <p className='blog-date'>Published {posts.created_at}</p>
          <p className='blog-title'>{posts.title}</p>
          </header>
          <br></br>
          <div className='blog-author-detail'>
          <div className='author-user-name'>{posts.nameCreate}</div>
          </div>
          <div className='blog-subCategory'>
            <p>
            <div className='hastag-post'>#{sub_name}</div>
            </p>
            
          </div>
         <div class="row  d-flex justify-content-center"> 
          <div className='post-img-blog'>
            <img src={posts.image} alt='cover img' />
          </div>
          </div>

          <div className='blog-body'>
            {parse(htmlString)}
          </div>

          <br></br>

        {/* End Post Content */}


        {/* Comment Form */}
          
          <div className="container-comment">
            <div className='comment-box'>
              <div className='comment-title'>
                <p>Comments</p> 
              </div>
              <div className='comment-area'>
                <Box>
                <StyledRating
                  name="simple-controlled"
                  precision={0.5}
                  icon={<FavoriteIcon fontSize="inherit" />}
                  emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                  value={score}
                  onChange={(e) => {setScore(e.target.value);}}
                />
                </Box>
                
                <input
                element="textarea"
                className="form-control"
                placeholder="  Leave a comment here"
                defaultValue={textComment}
                onChange={(e) => setTextComment(e.target.value)}
                />

                <button 
                  type="submit"
                  className='submit-comment'
                  onClick={CreateComment}
                > review
                </button>
              </div>
            </div>     
          </div>

          {/* End Comment Form */}
        

        {/* Comment List */}
        
        <div class="container mt-5">

            <div class="row d-flex justify-content-center">

                <div class="col">

                    <div class="headings d-flex justify-content-between align-items-center mb-3">
                        <h6>All Comments({countComment})</h6>
                        
                    </div>
                    
                    {listComments.map((data)=>{

                    if(!userLogin){
                        return {data},

                    <div class="card p-3 w-100">
                      <div class="d-flex justify-content-between align-items-center">

                        <div class="user d-flex flex-row align-items-center">
                          <span><small class="font-weight-bold text-primary">{data.nameCreate} </small></span>
                          <span>
                            <Box >
                              <StyledRating
                                className='rating-score'
                                value={data.score}
                                precision={0.5}
                                // edit={false}
                                disabled={true} 
                                count={5}
                                icon={<FavoriteIcon fontSize="inherit" />}
                                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                              />
                            </Box>
                          </span>
                      </div>
                      <small>{dayjs(data.created_at).fromNow()}</small>

                      </div>
                      <span><small class="font-weight-bold">{data.description}</small></span>

                    </div>
                      }

                      if(data.userID != user_id){
                        return {data},
                        <div class="card p-3 w-100">
                        <div class="d-flex justify-content-between align-items-center">
  
                          <div class="user d-flex flex-row align-items-center">
                            <span><small class="font-weight-bold text-primary">{data.nameCreate} </small></span>
                            <span>
                              <Box >
                                <StyledRating
                                  className='rating-score'
                                  value={data.score}
                                  precision={0.5}
                                  // edit={false}
                                  disabled={true} 
                                  count={5}
                                  icon={<FavoriteIcon fontSize="inherit" />}
                                  emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                />
                              </Box>
                            </span>
                        </div>
                        <small>{dayjs(data.created_at).fromNow()}</small>
  
                        </div>
                        <span><small class="font-weight-bold">{data.description}</small></span>
  
                      </div>
                      }
                      if(data.userID == user_id){
                        return {data},
                        <div class="card p-3 w-100">
                        <div class="d-flex justify-content-between align-items-center">
  
                          <div class="user d-flex flex-row align-items-center">
                            <span><small class="font-weight-bold text-primary">{data.nameCreate} </small></span>
                            <span>
                              <Box >
                                <StyledRating
                                  className='rating-score'
                                  value={data.score}
                                  precision={0.5}
                                  // edit={false}
                                  disabled={true} 
                                  count={5}
                                  icon={<FavoriteIcon fontSize="inherit" />}
                                  emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                />
                              </Box>
                            </span>
                        </div>
                        <small>{dayjs(data.created_at).fromNow()}</small>
                        </div>
                        <span><small class="font-weight-bold">{data.description}</small></span>
                        <div class="d-flex align-items-end flex-column">
                          <div class="mt-auto p-2">
                            <Button variant='danger' onClick={() => deleteComment(data.id)}>Delete</Button>
                          </div>
                        </div>
                      </div>
                      }
                      }
                    )}
                
                </div>
              </div>
            </div>

        {/* End Comment List */}
         {/* ///blog-wrap////  */}
    </div> {/* ///blog ////  */}
  </div>
      
    )
  }


//Permission for delete post
if(user_id==posts.userID){

  return (
    <div class='container-xxl'>
        <div className='navbar-timeline'>
          <NavbarScrollAnotherPage/>
        </div>
      <div class='container-xl'>
        {/* Post Content */}
        <header>
        <Button variant='danger' onClick={() => deletePost(posts.id)}>Delete Post</Button>
        <br></br>
        <br></br>
        <p className='blog-date'>Published {posts.created_at}</p>
        <p className='blog-title'>{posts.title}</p>
        </header>
        {/* <div class="d-flex flex-column">
          <div class="p-2">
            <Button variant='danger' onClick={() => deletePost(posts.id)}>Delete Post</Button>
          </div>
          <div class="p-2">Published {posts.created_at}</div>
          <div class="p-2">{posts.title}</div>
        </div>
        <br></br> */}

        <div className='blog-author-detail'>
        <div className='author-user-name'>{posts.nameCreate}</div>
        </div>

        <div className='blog-subCategory'>
          <p><div className='hastag-post'>#{sub_name}</div></p>
        </div>
        <div class="row  d-flex justify-content-center"> 
          <div className='post-img-blog'>
            <img src={posts.image} alt='cover img' />
          </div>
        </div>

        <div className='blog-body'>{parse(htmlString)}</div>
        <br></br>
      {/* End Post Content */}


      {/* Comment Form */}
        
        <div className="container-comment">
          <div className='comment-box'>
            <div className='comment-title'>
              <p>Comments</p> 
            </div>
            <div className='comment-area'>
              <Box>
              <StyledRating
                name="simple-controlled"
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                value={score}
                onChange={(e) => {setScore(e.target.value);}}
              />
              </Box>
              

              <input
              element="textarea"
              className="form-control"
              placeholder="  Leave a comment here"
              defaultValue={textComment}
              onChange={(e) => setTextComment(e.target.value)}
              />

              <button 
                type="submit"
                className='submit-comment'
                onClick={CreateComment}
              > review
              </button>
            </div>
          </div>     
        </div>

        {/* End Comment Form */}
      

      {/* Comment List */}
      
      <div class="container mt-5">
          <div class="row d-flex justify-content-center">
              <div class="col">

                  <div class="headings d-flex justify-content-between align-items-center mb-3">
                      <h6>All Comments({countComment})</h6>
                  </div>
                  
                  {listComments.map((data)=>{

                  if(!userLogin){
                      return {data},

                  <div class="card p-3 w-100">
                    <div class="d-flex justify-content-between align-items-center">

                      <div class="user d-flex flex-row align-items-center">
                        <span><small class="font-weight-bold text-primary">{data.nameCreate} </small></span>
                        <span>
                          <Box >
                            <StyledRating
                              className='rating-score'
                              value={data.score}
                              precision={0.5}
                              // edit={false}
                              disabled={true} 
                              count={5}
                              icon={<FavoriteIcon fontSize="inherit" />}
                              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                            />
                          </Box>
                        </span>
                    </div>
                    <small>{dayjs(data.created_at).fromNow()}</small>

                    </div>
                    <span><small class="font-weight-bold">{data.description}</small></span>

                  </div>
                    }

                    if(data.userID != user_id){
                      return {data},
                      <div class="card p-3 w-100">
                      <div class="d-flex justify-content-between align-items-center">

                        <div class="user d-flex flex-row align-items-center">
                          <span><small class="font-weight-bold text-primary">{data.nameCreate} </small></span>
                          <span>
                            <Box >
                              <StyledRating
                                className='rating-score'
                                value={data.score}
                                precision={0.5}
                                // edit={false}
                                disabled={true} 
                                count={5}
                                icon={<FavoriteIcon fontSize="inherit" />}
                                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                              />
                            </Box>
                          </span>
                      </div>
                      <small>{dayjs(data.created_at).fromNow()}</small>

                      </div>
                      <span><small class="font-weight-bold">{data.description}</small></span>

                    </div>
                    }
                    if(data.userID == user_id){
                      return {data},
                      <div class="card p-3 w-100">
                      <div class="d-flex justify-content-between align-items-center">

                        <div class="user d-flex flex-row align-items-center">
                          <span><small class="font-weight-bold text-primary">{data.nameCreate} </small></span>
                          <span>
                            <Box >
                              <StyledRating
                                className='rating-score'
                                value={data.score}
                                precision={0.5}
                                // edit={false}
                                disabled={true} 
                                count={5}
                                icon={<FavoriteIcon fontSize="inherit" />}
                                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                              />
                            </Box>
                          </span>
                      </div>
                      <small>{dayjs(data.created_at).fromNow()}</small>
                      </div>
                      <span><small class="font-weight-bold">{data.description}</small></span>
                        <div class="d-flex align-items-end flex-column">
                          <div class="mt-auto p-2">
                            <Button variant='danger' onClick={() => deleteComment(data.id)}>Delete</Button>
                          </div>
                        </div>

                    </div>
                    }
                    }
                  )}
              
              </div>
            </div>
          </div>

      {/* End Comment List */}
       {/* ///blog-wrap////  */}
  </div> {/* ///blog ////  */}
</div>
    
  )

}

}


export default ShowBlog;