const LoginForm = ({ a, b, c, d, e }) => {

  return(
    <>
      <h2>Login</h2>
      <form onSubmit={a}>
        <div>
          username
          <input type="text" value={b} name="username" onChange={ ({ target }) => d(target.value)}/>
        </div>
        <div>
          password
          <input type="text" value={c} name="password" onChange={ ({ target }) => e(target.value)}/>
        </div>
      <button type="submit">login</button>
      </form> 
    </>
  )
}

export default LoginForm