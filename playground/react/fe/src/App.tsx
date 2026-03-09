import './App.css';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Home from './components/home';
import Blog from './components/blog';
import More from './components/More';
import MoreInfo from './components/MoreInfo';
import NoPage from './components/NoPage';
import Layout from './components/Layout';


function App() {

  return (
    <BrowserRouter>
      <Link to="/">Allen</Link>
      |
      <Link to="/more">more</Link> 
      |
      <Link to="/blog">blog</Link>

      <Routes>
          <Route path="/" element={<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path="blog" element={<Blog/>}>
                <Route path="moreinfo" element={<MoreInfo/>}/>
              </Route>
              <Route path="more" element={<More/>}/>
              <Route path="*" element={<NoPage/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
