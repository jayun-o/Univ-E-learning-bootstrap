import React from 'react'
import { Link, useParams } from 'react-router-dom';
import ReactReadMoreReadLess from "react-read-more-read-less";
import styled from "styled-components";


const CardPostTheme = ({id,title,body,sub_id,user_id,nameCreate,image,hastag,created_at,updated_at})=> {
    const { sub_name } = useParams(); //subcategory.info = id,subcategorys
  
    const arrayHashtag = typeof(hastag) === 'object' ? hastag : hastag.split(',')
  
    const delBodytag = body.replace(/(<([^>]+)>)/ig, '');

    return (
        <div className='cardpost'>
        <div className="row mb-2">
            <div className="col">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary">{sub_name}</strong>
                <h3 className="mb-0">
                    {title}
                </h3>
                <div className="mb-1 text-muted" style={{textDecoration:"none"}}>{created_at} {" "} by {nameCreate}</div>
                <p className="card-text mb-auto">
                    <ReactReadMoreReadLess
                        charLimit={200}
                        readMoreText={""}>
                        {delBodytag}
                    </ReactReadMoreReadLess>
                </p>
                    <div className="sub-link">
                        <Link to={{ pathname:`/Timeline/${sub_name}/Post/${id}`}} onClick={() => localStorage.setItem('post_id', id)}>
                            Continue reading
                        </Link>
                    </div>
                </div>
                <div className="col-auto d-none d-lg-block">
                    <img style={{height:'215px',width:'200px'}} src={image} alt="" />
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export const cardpost = styled.div`
.img {
  position: relative;
}

`;

export default CardPostTheme