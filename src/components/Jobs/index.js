import Cookies from 'js-cookie'
import {Component} from 'react'
import {BsSearch, BsUpload} from 'react-icons/bs'
import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    userDetails: false,
  }

  componentDidMount() {
    this.getUserDetails()
  }

  getUserDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const fetchedData = await response.json()

    const updatedData = {
      name: fetchedData.profile_details.name,
      profileImageUrl: fetchedData.profile_details.profile_image_url,
      shortBio: fetchedData.profile_details.short_bio,
    }
    this.setState({
      userDetails: updatedData,
    })
  }

  render() {
    const {userDetails} = this.state
    const {name, shortBio, profileImageUrl} = userDetails

    return (
      <div className="jobsBg">
        <Header />
        <div>
          <div className="inputContainer">
            <input type="text" placeholder="Seach" className="seachInput" />
            <BsSearch className="searchIcon" />
          </div>
          <div className="d-flex flex-row justify-content-center mt-2">
            <div className="userDetailsContainer">
              <img
                src={profileImageUrl}
                alt="profileImg"
                className="profileImg"
              />
              <h1 className="userName">{name}</h1>
              <p className="userBio">{shortBio}</p>
            </div>
          </div>
          <hr className="hrStyle" />
        </div>
      </div>
    )
  }
}
export default Jobs
