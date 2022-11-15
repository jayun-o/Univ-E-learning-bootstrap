import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CreateBlog from './CreateBlog';
import CreateCourse from '../Course/CreateCourse';
import {BiArrowBack} from 'react-icons/bi'
import { Link } from 'react-router-dom';
function TabCreate() {
  return (
    <div className='tabtab'>
      
    <Tabs
      defaultActiveKey="Blog"
      id="uncontrolled-tab-example"
      className="mb-3"
   >
      <Tab eventKey="Blog" title="Blog">
        <Link  to='/'><p style={{display:'flex',marginLeft:'1rem'}}> back to homepage </p></Link>
        <CreateBlog/>
      </Tab>
      <Tab eventKey="Course" title="Course">
        <Link  to='/'><p style={{display:'flex',marginLeft:'1rem'}}> back to homepage </p></Link>
        <CreateCourse />
      </Tab>
    </Tabs>
    </div>
  );
}

export default TabCreate;