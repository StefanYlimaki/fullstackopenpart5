import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import DisplayBlogs from './components/DisplayBlogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isErrorMessage, setIsErrorMessage] = useState(null)
  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      }

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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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

  const createBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(response))
      setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setIsErrorMessage(false)
      setTimeout(() => {
        setErrorMessage(null)
        setIsErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
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
    window.localStorage.clear()
  }

  return (
    <div>
      <Notification message={errorMessage} type={isErrorMessage} />
      {user === null
        ? <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword} />
        :
        <div>
          <p>Signed in as {user.name}</p>
          <button onClick={logOut}>log out</button>
          <br />
          <br />
          <Togglable buttonLabel='create a new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          <h2>Blogs</h2>
          <DisplayBlogs blogs={blogs} setBlogs={setBlogs} />
        </div>
      }
    </div>
  )
}

export default App
