import React from 'react'
import TabFilter from '../Tab/TabFilter'
import NavbarScrollAnotherPage from '../Navbar/AnotherPage/NavbarScrollAnotherPage'
function TimelineBlogHead() {
    
  return (
    <main className="container">
      <div className='navbar-timeline'>
        <NavbarScrollAnotherPage/>
      </div>
      <hr/><hr/>
        <div className="p-4 p-md-5 mb-4 rounded text-bg-dark">
            <div className="col-md-6 px-0">
                <h1 className="display-4 fst-italic">Title of a longer featured blog post</h1>
                <p className="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.</p>
            </div>
        </div>
        <div className='tab-fliter'>
            <TabFilter/>
        </div>
    </main>
  )
}

export default TimelineBlogHead