import './App.css'
import {BrowserRouter , Routes , Route} from "react-router-dom"
import {Signup} from "./pages/Signup"
import {Signin} from "./pages/Signin"
import {Blog} from "./pages/Blog"
import {Blogs} from "./pages/Blogs"
import {Publish} from "./pages/Publish"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = "/signup" element = {<Signup />}></Route>
          <Route path = "/signin" element = {<Signin />}></Route>
          <Route path = "/blog/:id" element = {<Blog />}></Route>
          <Route path = "/blogs" element = {<Blogs />}></Route>
          <Route path = "/publish" element = {<Publish />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
