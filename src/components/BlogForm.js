import { useState } from 'react'

const BlogForm = ({ a, b, c, d, e, f, g }) => {


  return(
    <>
      <form onSubmit = { a }>
        <div>
          title: 
          <input type="text" value={ b } onChange={ ({ target }) => c(target.value)} />
        </div>
        <div>
          author: 
          <input type="text" value={ d } onChange={ ({ target }) => e(target.value)} />
        </div>
        <div>
          url: 
          <input type="text" value={ f } onChange={ ({ target }) => g(target.value)} />
        </div>
        <button type="submit">add</button>
      </form>
    </>
  )
}

export default BlogForm