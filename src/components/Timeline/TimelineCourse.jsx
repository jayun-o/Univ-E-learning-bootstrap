import React from 'react'
import '../Timeline/Timeline.css'
import CardCourseTheme from '../Course/CourseComponents/CardCourseTheme';


class TimelineCourse extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            courses:[],
            DataisLoaded: false,
        };
    }

    componentDidMount(){
    const sub_id = localStorage.getItem("subcategory_id")
    fetch("https://univelear.herokuapp.com/api/course", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({sub_id})
        }).then(data => data.json()).then(data => {this.setState({courses:data})});
    }

    
    
    render(){

        const { courses } = this.state;

        return(
            <div className="Post-card">
                {courses.data&&courses.data.map((data)=>{
                    return <div key={data.id}/>,{data},
                    <CardCourseTheme  id={data.id} title={data.title} body={data.body} sub_id={data.sub_id} nameCreate={data.nameCreate} user_id={data.userID} image={data.image} hastag={data.hastag} created_at={data.created_at} updated_at={data.updated_at} />
                    }
                )}
            </div>
        )
    }
}

export default TimelineCourse;