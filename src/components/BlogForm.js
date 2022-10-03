
const BlogForm = ({ 
    handleSubmit,
    title,
    setTitle,
    author,
    setAuthor,
    url,
    setUrl 
}) => {


  return(
    <>
      <form onSubmit = { handleSubmit }>
        <div>
          title: 
          <input type="text" value={ title } onChange={ ({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author: 
          <input type="text" value={ author } onChange={ ({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: 
          <input type="text" value={ url } onChange={ ({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm