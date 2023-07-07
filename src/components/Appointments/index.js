import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

const initialAppointmentList = []
const initialStaredList = []

class Appointments extends Component {
  state = {
    appointmentList: initialAppointmentList,
    titleInput: '',
    dateInput: '',
    starred: false,
    staredList: initialStaredList,
  }

  onChangeTitle = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (id === each.id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  onStarredList = () => {
    const {appointmentList} = this.state
    this.setState(prevState => ({starred: !prevState.starred}))
    const filteredList = appointmentList.filter(each => each.isStarred === true)

    this.setState({staredList: filteredList})
  }

  render() {
    const {
      appointmentList,
      starred,
      staredList,
      titleInput,
      dateInput,
    } = this.state
    const displayList = starred ? staredList : appointmentList
    const classname = starred ? 'button2' : 'button1'

    return (
      <div className="background">
        <div className="background2">
          <div className="background1">
            <div>
              <h1>Add Appointment</h1>
              <form
                className="form-background"
                onSubmit={this.onAddAppointment}
              >
                <label htmlFor="title">TITLE</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  onChange={this.onChangeTitle}
                  value={titleInput}
                />
                <label htmlFor="date">DATE</label>
                <input
                  type="date"
                  id="date"
                  placeholder="dd/mm/yyyy"
                  onChange={this.onChangeDate}
                  value={dateInput}
                />
                <button className="button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr />
          <div className="back">
            <div className="back1">
              <h1>Appointments</h1>
              <div>
                <button
                  className={classname}
                  type="button"
                  onClick={this.onStarredList}
                >
                  Starred
                </button>
              </div>
            </div>
            <ul>
              {displayList.map(each => (
                <AppointmentItem
                  appointmentList={each}
                  key={each.id}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
