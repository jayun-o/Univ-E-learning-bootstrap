import Accordion from 'react-bootstrap/Accordion';

const CourseList = ({videoid,videoname,videolink,videodescription}) => {

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>บทที่ {videoid} : {videoname}</Accordion.Header>
        <Accordion.Body>
          {videodescription}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default CourseList;