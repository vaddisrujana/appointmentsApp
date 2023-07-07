import './index.css'

const AppointmentItem = props => {
  const {appointmentList, toggleIsStarred} = props
  const {title, date, id, isStarred} = appointmentList

  const starred = () => {
    toggleIsStarred(id)
  }

  const star = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li>
      <div className="list-background">
        <div className="list-background1">
          <p>{title}</p>
          <button onClick={starred} type="button" data-testid="star">
            <img src={star} alt="star" />
          </button>
        </div>
        <p>Date:{date} </p>
      </div>
    </li>
  )
}

export default AppointmentItem
