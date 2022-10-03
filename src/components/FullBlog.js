const FullBlog = ({ blog, toggleShowFull, handleLike }) => {



    return(
        <div className='blog'>
          <div>
            <strong>Title:</strong> {blog.title} 
            <button onClick={ toggleShowFull }>hide</button>
          </div>
          <div><strong>Author:</strong> {blog.author} </div>  
          <div><strong>Url:</strong> {blog.url} </div>
          <div>
            <strong>Likes:</strong> {blog.likes} 
            <button onClick={handleLike}>like</button>
          </div>
          <div><strong>Id:</strong> {blog.id.toString()} </div>
        </div> 
      )
}

export default FullBlog