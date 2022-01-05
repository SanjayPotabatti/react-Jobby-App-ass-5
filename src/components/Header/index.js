import {Link, withRouter} from 'react-router-dom'

import {BsFillBriefcaseFill, BsFillHouseFill} from 'react-icons/bs'
import {AiOutlineLogout} from 'react-icons/ai'
import './index.css'
import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navBackground navbar">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="logoImg"
      />
      <ul className="d-block d-md-none">
        <li>
          <Link to="/">
            <BsFillHouseFill color="#ffffff" className="m-2" />
          </Link>
        </li>
        <li>
          <Link to="/Jobs">
            <BsFillBriefcaseFill color="#ffffff" className="m-2" />
          </Link>
        </li>
        <li>
          <button type="button" onClick={onClickLogout}>
            <AiOutlineLogout color="#ffffff" className="m-2" />
          </button>
        </li>
      </ul>
      <ul className="smallContainer d-none d-md-block">
        <li>
          <Link to="/" className="homePara m-2">
            Home
          </Link>
        </li>
        <li>
          <Link to="/Jobs" className="homePara m-2">
            Jobs
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="logoutButton m-2"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
