import Blog from './Blog'

const DisplayBlogs = ({ a }) => (
  <>
    {a.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </>
)

export default DisplayBlogs