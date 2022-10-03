import Blog from './Blog'

const DisplayBlogs = ({ a }) => {
  return(
  <>
    {a.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </>
  )
}

export default DisplayBlogs