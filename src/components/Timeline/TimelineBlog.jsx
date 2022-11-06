import React from 'react'
import '../Timeline/Timeline.css'
import CardPostTheme from '../Post/CardPostTheme';


class TimelineBlog extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            posts:[],
            DataisLoaded: false,
        };
    }

    componentDidMount(){
    const sub_id = localStorage.getItem("subcategory_id")
    fetch("https://univelear.herokuapp.com/api/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({sub_id})
        }).then(data => data.json()).then(data => {this.setState({posts:data})});
    
    }

    
    render(){

        const { posts } = this.state;

        return(
            <div className="Post-card">
                {posts.data&&posts.data.map((data)=>{
                    return {data},
                    <CardPostTheme key={data.id} id={data.id} title={data.title} body={data.body} sub_id={data.sub_id} nameCreate={data.nameCreate} user_id={data.userID} image={data.image} hastag={data.hastag} created_at={data.created_at} updated_at={data.updated_at} />
                    }
                )}
            </div>
        )
    }
}

export default TimelineBlog;