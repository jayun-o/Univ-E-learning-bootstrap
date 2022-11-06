import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CreateBlog from './CreateBlog';
import CreateCourse from '../Course/CreateCourse';

function TabCreate() {
  return (
    <Tabs
      defaultActiveKey="Blog"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="Blog" title="Blog">
        <CreateBlog />
      </Tab>
      <Tab eventKey="Course" title="Course">
        <CreateCourse />
      </Tab>
    </Tabs>
  );
}

export default TabCreate;