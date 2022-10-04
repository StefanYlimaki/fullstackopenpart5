
const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  if(type){
    return (
      <div className="error">
        {message}
      </div>
    )
  } else {
    return (
      <div className="notification">
        {message}
      </div>
    )
  }
}

export default Notification