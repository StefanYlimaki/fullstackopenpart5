import { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog }) => {
  const [showFullBlog, setShowFullBlog] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleShowFull = () => {
    setShowFullBlog(!showFullBlog)
  }

  const handleLike = async () => {
    const blogObject = {...blog, likes: likes + 1}
    const id = blogObject.id
    await blogService.update(id, blogObject)
    setLikes(likes + 1)
  }

  if(showFullBlog) {
    return(
      <div className='blog'>
        <div>
          <strong>Title:</strong> {blog.title} 
          <button onClick={ toggleShowFull }>hide</button>
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
      </div> 
      <div><strong>Author:</strong> {blog.author} </div>
    </div> 
  )
}
  
  


export default Blog