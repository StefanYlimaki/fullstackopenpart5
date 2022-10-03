import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginFrom'
import DisplayBlogs from './components/DisplayBlogs'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isErrorMessage, setIsErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setIsErrorMessage(true)
      setTimeout(() => {
        setErrorMessage(null)
        setIsErrorMessage(null)
      }, 5000)
    }
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()

    console.log(`Adding ${title} ${author} ${url} to the list`)

    try{
      const blog = {
        title:`${title}`,
        author:`${author}`,
        url:`${url}`
      }
      await blogService.create(blog)
      setTitle('')
      setAuthor('')
      setUrl('')
      setErrorMessage(`a new blog ${title} by ${author} added`)
      setIsErrorMessage(false)
      setTimeout(() => {
        setErrorMessage(null)
        setIsErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('The blog could not be added')
      setIsErrorMessage(true)
      setTimeout(() => {
        setErrorMessage(null)
        setIsErrorMessage(null)
      }, 5000)
    }
  }

  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  return (
    <div>
      <Notification message={errorMessage} type={isErrorMessage} />
      {user === null 
        ? <LoginForm a={ handleLogin } b = { username } c = { password } d = { setUsername } e = { setPassword }/> 
        :
          <div>
            <p>Signed in as { user.name }</p>
            <button onClick={logOut}>log out</button>
            <br />
            <br />
            <h2>Add a new blog</h2>
            <BlogForm a = { handleNewBlog } b = { title } c = { setTitle } d = { author } e = { setAuthor } f = { url } g = { setUrl } />
            <h2>Blogs</h2>
            <DisplayBlogs a={ blogs } />
          </div>
    }
    </div>
  )
}

export default App
