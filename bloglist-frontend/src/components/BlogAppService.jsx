const BlogApp = ({setErrorMessage, notificationMessage, setNotificationMessage }) => {

  const errorMessageFunc = (user, blog, service, err) => {
    //console.log("User: ", user, " blog: ", blog, " Service: ", service, " error: ", err)
    if (service === "login") {
      setNotificationMessage("info")
      setErrorMessage(`${user.name} has logged in!`)
    } else if (service === "logout") {
      setNotificationMessage("info")
      setErrorMessage(`${user.name} has logged out!`)
    } else if (service === "add") {
      setNotificationMessage("info")
      setErrorMessage(`You have added a blog '${blog.title}' by ${blog.author}`)
    } else if (service === "credentials") {
      setNotificationMessage("error")
      setErrorMessage(`${err}`)
    } else if (service === "error") {
        setNotificationMessage("error")
        setErrorMessage(`${err}`)
      }

    setTimeout(() => {
      setErrorMessage(null);
    }, 5000)
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className={notificationMessage === "error" ? "error" : "info"}>
        {message}
      </div>
    )
  }

  return {
    errorMessageFunc,
    Notification
  }
}

export default BlogApp
