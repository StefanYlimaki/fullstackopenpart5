import Blog from './Blog'
import PropTypes from 'prop-types'

const DisplayBlogs = ({ blogs, setBlogs }) => {
  let sortedBlogs = blogs.sort((a, b) => {
    if(a.likes < b.likes) {
      return 1
    }
    if(a.likes > b.likes){
      return -1
    }
    return 0
  })

  const user = JSON.parse(window.localStorage.getItem('loggedUser'))

  return(
    <>
      {sortedBlogs.map(blog =>
        <Blog id='blog' key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} user={user} />
      )}
    </>
  )
}

DisplayBlogs.propTypes = {
  setBlogs: PropTypes.func.isRequired
}

export default DisplayBlogs