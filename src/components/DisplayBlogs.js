import Blog from './Blog'

const DisplayBlogs = ({ blogs, setBlogs}) => {

  let sortedBlogs = blogs.sort((a, b) => {
    if(a.likes < b.likes) {
      return 1
    }
    if(a.likes > b.likes){
      return -1
    }
    return 0
  })

  return(
    <>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} />
      )}
    </>
  )
}

export default DisplayBlogs