
const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  if(type){
    return (
      <div className="error" id='error-notification'>
        {message}
      </div>
    )
  } else {
    return (
      <div className="notification" id='notification'>
        {message}
      </div>
    )
  }
}

export default Notification