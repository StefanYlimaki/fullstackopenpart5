import { useState } from 'react'
const SingleBlog = ({ blog, handleLike, removeBlog, user, likes }) => {

  const [showFullBlog, setShowFullBlog] = useState(false)
  const toggleShowFull = () => {
    setShowFullBlog(!showFullBlog)
  }

  console.log(blog, user)

  if(showFullBlog){
    return(
      <div className='blog'>
        <div>
          <strong>Title:</strong> {blog.title}
          <button onClick={ toggleShowFull }>hide</button>
          {blog.user.username === user.username
            ? <button d='remove-button' onClick={removeBlog}>remove</button>
            : <></>
          }
        </div>
        <div><strong>Author:</strong> {blog.author} </div>
        <div><strong>Url:</strong> {blog.url} </div>
        <div id='likes'>
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
          ? <button id='remove-button' onClick={removeBlog}>remove</button>
          : <></>
        }
      </div>
      <div><strong>Author:</strong> {blog.author} </div>
    </div>
  )
}

export default SingleBlog