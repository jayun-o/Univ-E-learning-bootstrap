import React, { useEffect, useState } from 'react'
import NavbarScrollAnotherPage from '../Navbar/AnotherPage/NavbarScrollAnotherPage'
import CourseList from './CourseComponents/CourseList'
import { Form } from 'react-bootstrap'
import styled from "styled-components";
import ReactPlayer from 'react-player';
import Records from './records.json';
import Banner1  from '../Banner/univbanner1.png'

const ShowCourse = () => {
  const [courses,setCourses] = useState([]);
  const course_id = localStorage.getItem('course_id');
  
  const [video, setVideo] = useState('https://youtu.be/vv3um0BlygY');
  const change = (e) =>{

    setVideo('https://youtu.be/VnKNNOAhb4o')

  }
  // console.log(Records);

  return (
    <main className="container">
    <div className='navbar'>
      <NavbarScrollAnotherPage/>
    </div>
    <hr/><hr/>
      <div className='data'>
        {
            Records.data.map((data,index)=>{
              return(
              <div className="p-4 mb-4 rounded p-md-5">
                <div className='bg-image'style={{backGround:{Banner1}}}>
                <div className="px-0">
                  <div className='datatitle' key={index}>
                    <h1 className="display-4 fst-italic">{data.title}</h1>
                    <p>{data.body}</p>
                    </div>
                  </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        
      <div className='video-player'>
            <ReactPlayer url={video}       
            className="react-player"
            playing
            width="auto"
            height="550px"
            controls={true} />
      </div>
      <Form.Group className="mb-3">
        <Form.Label>playlist</Form.Label>
      


      <div className='videolist'>
        {
          Records.data.map((data,index)=>{
            return(
              <div key={index}>
                {
                  data.videoList.map((vd,id)=>{
                    return(
                      <div key={id}>
                        {/* <p>{vd.videoname}</p> */}
                        <CourseList videoid={vd.videoid} videoname={vd.videoname} videolink={vd.videolink} videodescription={vd.videodescription} />
                      </div>
                    );
                  })
                }
              </div>
            );
          })
        }

      </div>
      </Form.Group>

  </main>
  )
}
export const container = styled.div`
.video-player {
  position: relative;
}

`;


export default ShowCourse;