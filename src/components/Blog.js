import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog,setBlogs, blogs }) => {
  const [showFullBlog, setShowFullBlog] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  const user = JSON.parse(loggedUserJSON)

  const toggleShowFull = () => {
    setShowFullBlog(!showFullBlog)
  }

  const handleLike = async () => {
    const blogObject = {...blog, likes: likes + 1}
    const id = blogObject.id
    await blogService.update(id, blogObject)
    setLikes(likes + 1)
  }

  const removeBlog = async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(a => a.id !== blog.id))
    }
  }

  if(showFullBlog) {
    return(
      <div className='blog'>
        <div>
          <strong>Title:</strong> {blog.title} 
          <button onClick={ toggleShowFull }>hide</button>
          {blog.user.username === user.username
            ? <button onClick={removeBlog}>remove</button>
            : <></>
          }
        </div>
        <div><strong>Author:</strong> {blog.author} </div>  
        <div><strong>Url:</strong> {blog.url} </div>
        <div>
          <strong>Likes:</strong> {likes} 
          <button onClick={handleLike}>like</button>
        </div>
        <div><strong>Id:</strong> {blog.id.toString()} </div>
      </div> 
    )
  }

  return(
    <div className='blog'>
      <div>
        <strong>Title:</strong> {blog.title}
        <button onClick={ toggleShowFull }>view</button>
        {blog.user.username === user.username
            ? <button onClick={removeBlog}>remove</button>
            : <></>
          }
      </div> 
      <div><strong>Author:</strong> {blog.author} </div>
    </div> 
  )
}


  
  


export default Blog