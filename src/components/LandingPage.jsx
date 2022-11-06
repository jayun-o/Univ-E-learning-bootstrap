import React from 'react'
import BasicExample from './Accordion/BasicExample'
import NavbarScroll from './Navbar/NavbarScroll'
import Banner from './Banner/Banner'
import Category from './Category/Category'


class LandingPage extends React.Component {
    constructor(props) {
      super(props);
    }

  render(){
    return (
            <div className="App">
                <NavbarScroll/>
                <Banner/>
                <Category/>
            </div>
      )
  }
}
            

      

export default LandingPage