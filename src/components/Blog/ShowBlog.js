import React from 'react';
import { styled } from '@mui/material/styles';
import '../Blog/ShowBlog.css';
import { useEffect, useState} from 'react';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {DebounceInput} from 'react-debounce-input';
import parse from 'html-react-parser'
import NavbarScrollAnotherPage from '../Navbar/AnotherPage/NavbarScrollAnotherPage';



const ShowBlog = () => {

    const [posts,setPosts] = useState([]);
    const postID = localStorage.getItem('post_id');
    const [textComment, setTextComment] = useState('');
    const [score, setScore] = useState('');
    const [comments, setComments] = useState([]);
    const token = localStorage.getItem('token');
    const [updateStat, setUpdateStat] = useState(false);
    const htmlString = (posts.body || '')



    const str = (posts.hastag || ',')
    const arrayHashtag = typeof str === 'object' ? str : str.split(',');
    // console.log(arrayHashtag); 

    const countComment = (comments.all_comment || []).length;
    // console.log(countComment)

    ///// Sort commenst to show the newest comments on top ///////
    const list = (comments.all_comment || [])
    list.sort((a, b) => (a.id > b.id) ? -1 : 1)
    // console.log(list)
    
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

    console.log(posts)
    

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
    console.log(comments)

    useEffect(() => {

      FetchComment()

    },[updateStat])


  const CreateComment = () => {

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
  // console.log(comments)


    return (

      <div>
          <div className='navbar-timeline'>
            <NavbarScrollAnotherPage/>
          </div>

        <div className='blog'>
        
        <div className='blog-wrap'>

        {/* Post Content */}
          <header>
          <p className='blog-date'>Published {posts.created_at}</p>
          <p className='blog-title'>{posts.title}</p>
          </header>
          <br></br>

          <div className='blog-author-detail'>
            {/* <div className='author-user-img'>
              <img src='' alt="" />
            </div> */}
          <div className='author-user-name'>{posts.nameCreate}</div>
          </div>

          <div className='blog-subCategory'>
            <p>
              {arrayHashtag.map((idx) => {
              return <div key={idx.id} className='hastag-post'>#{idx}</div>
            })}
            </p>
            
          </div>

          <div className='post-img-blog'>
            <img src={posts.image} alt='' />
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
                

                <DebounceInput 
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

        
        <div className='all-Comment-list'>
          <div className='titile-comment'>
            <h1> All Comments ({countComment})</h1>
          </div>

          <div className='comment-section' >
          
          {list.map((data)=>{
              return {data},
            <div className="p-3 cardComment">
              <div className="d-flex justify-content-between align-items-center">

                <div className="flex-row user d-flex align-items-center">
                  <div className='user-detail'>
                    {/* <div className='user-img'>
                      <img src='' alt="" />
                    </div> */}
                    <span>
                      <small className="font-weight-bold text-primary" >{data.nameCreate}</small> 
                    </span>
                    <span>
                      <small className='comment-date font-weight-bold'>{dayjs(data.created_at).format("MMM D, YYYY h:mm A")}</small>

                    </span>
                  </div>

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

                  <span>
                    <small className="font-weight-bold text-grey">{data.description}</small> 
                  </span>
                </div>
      
              </div>
            </div>
            }
          )}
          </div>
        </div> 
       

        {/* End Comment List */}

      </div> {/* ///blog-wrap////  */}
    </div> {/* ///blog ////  */}
  </div>
      

    )
}




export default ShowBlog;