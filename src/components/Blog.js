import { useState } from 'react'
import blogService from '../services/blogs'
import SingleBlog from './SingleBlog'

const Blog = ({ blog, setBlogs, blogs }) => {
  const [likes, setLikes] = useState(blog.likes)
  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  const user = JSON.parse(loggedUserJSON)

  const removeBlog = async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(a => a.id !== blog.id))
    }
  }

  const handleLike = async () => {
    const blogObject = { ...blog, likes: likes + 1 }
    const id = blogObject.id
    await blogService.update(id, blogObject)
    setLikes(likes + 1)
  }


  return(
    <div>
      <SingleBlog  blog={blog} handleLike={handleLike} removeBlog={removeBlog} user={user} likes={likes}/>
    </div>
  )
}






export default Blog