import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) {
    return null
  }

  const style = {
    border: notification.type === 'error' ? '2px solid red' : '2px solid green',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    backgroundColor: notification.type === 'error' ? '#ffebee' : '#e8f5e9',
  }

  return <div style={style}>{notification.message}</div>
}

export default Notification

