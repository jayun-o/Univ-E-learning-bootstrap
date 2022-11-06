import React, { useState } from 'react'
import '../Post/CardPost.css'
import { Link } from 'react-router-dom';
import ReactReadMoreReadLess from "react-read-more-read-less";
import { useParams } from "react-router-dom";


const CardPost = ({id,title,body,sub_id,user_id,nameCreate,image,hastag,created_at,updated_at})=> { //post info 
  const { sub_name } = useParams(); //subcategory.info = id,subcategorys
  
  const arrayHashtag = typeof(hastag) === 'object' ? hastag : hastag.split(',')

  const delBodytag = body.replace(/(<([^>]+)>)/ig, '');


  return (
      <div className='main'>
        <div className='card-post'>
            <div className='user-detail'>
                <div className='img-user'></div>
                <div className='name-user'>{nameCreate}</div>
                <div className='created-at'>{created_at}</div>
            </div>
            <div className='content'style={{display:'flex' ,marginLeft:'2rem'}}>
              {/*should be date */}
                <div className='detail-post' style={{display:'flexbox',width:'70%'}}>
                  <div className='post-title'>
                    <Link to={{ pathname:`/timeline/${sub_name}/${id}`}} onClick={() => localStorage.setItem('post_id', id)}>
                    {title}
                    </Link>
                  </div>
                    {/* limits 200 words */}
                        <div className='post-body'>
                            <ReactReadMoreReadLess
                            charLimit={200}
                            readMoreText={""}>
                            {delBodytag}
                            </ReactReadMoreReadLess>
                        </div>
                  </div>
                  <div className='post-img' style={{marginLeft:'2rem'}}>
                      <img src={image} alt="" />
                  </div>
              </div>
            <div className='footer'>
              <div className='ft-l'>
                  <div className='hashtagButton' style={{display:'flex',marginTop:'10px'}}>
                    {arrayHashtag.map((item)=>{
                        return <div key={item.id} className='hashtag'>{item}</div>
                      })}
                  </div>
              </div>
              <br/>
            </div>
        </div>
      </div>
  )
}

export default CardPost