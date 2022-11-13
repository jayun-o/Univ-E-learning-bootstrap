import Accordion from 'react-bootstrap/Accordion';

const CourseList = ({videoid,videoname,videolink,videodescription}) => {
  console.log(videodescription);
  return (
    <Accordion alwaysOpen>
      <Accordion.Item eventKey={videoid}>
        <Accordion.Header>บทที่ {videoid} : {videoname}</Accordion.Header>
        <Accordion.Body>
          {videodescription}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

  );
}

export default CourseList;