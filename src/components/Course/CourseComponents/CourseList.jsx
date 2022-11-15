// import Accordion from 'react-bootstrap/Accordion';

const CourseList = ({videoid,videoname,videolink,videodescription}) => {
  console.log(videodescription);
  return (
    <container>
        <div>บทที่ {videoid} : {videoname}</div>
        <div>{videodescription}</div>
    </container>

          


  );
}

export default CourseList;