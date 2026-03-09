import {  Link, Outlet} from "react-router-dom"

const Blog = () => {
  return (
    <>
        <div>Blog</div>
        
        <Link to="/blog/moreinfo">More Info</Link>

        <Outlet/>
        
    </>
    
  )
}

export default Blog