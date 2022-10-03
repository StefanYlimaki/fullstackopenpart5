import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginFrom'
import DisplayBlogs from './components/DisplayBlogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null 
        ? <LoginForm a={ handleLogin } b = { username } c = { password } d = { setUsername } e = { setPassword }/> 
        :
          <div>
            <p>Signed in as { user.name }</p>
            <button onClick={logOut}>log out</button>
            <br />
            <br />
            <DisplayBlogs a={ blogs } />
          </div>
    }
    </div>
  )
}

export default App
