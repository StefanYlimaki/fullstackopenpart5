import { useState } from 'react'

const Blog = ({ blog }) => {
  const [showFullBlog, setShowFullBlog] = useState(false)

  const toggleShowFull = () => {
    setShowFullBlog(!showFullBlog)
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
        <div><strong>Likes:</strong> {blog.likes} </div>
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