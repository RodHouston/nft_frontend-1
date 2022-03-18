import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useState, useEffect } from "react";
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'

export const NavBar = (props) => {

  let user = {
    image: '',
    fname: '',
    lname: '',
    password: '',
    collection: '',
    created: '',
    favorited: '',
    offers: '',
    bio: ''
  }
  const [users, setUsers] = useState(user)

  const [currentUser, setCurrentUser] = useState(user)
  let navigate = useNavigate();
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  const getUsers = () => {
    axios.get('https://boiling-island-41564.herokuapp.com/api/user')
      .then(
        (response) => setUsers(response.data),
        (err) => console.error(err)
      )
      .catch((error) => console.error(error))

  }
  const handleUpdate = (editUser) => {
    axios.put('https://boiling-island-41564.herokuapp.com/api/user/' + editUser.id, editUser)
      .then((response) => {
        alert('logged out')
        navigate('/login')
      })
  }
  const loggedOut = async () => {
    console.log('logged out');
    console.log(currentUser.id);
    handleUpdate(currentUser)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    users.map((user) => {
      if (user.bio == 'currentUser') {
        setCurrentUser({ ...user, bio: 'false' })
        const response = loggedOut()
      }

    })
    console.error('logged out pressed ' + currentUser.fname)
  }


  useEffect(() => {
    getUsers()
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);


  return (
    <>

      <div className="nav">

        <Link className="links" to="/login">
          Login
          </Link>

        <Link className="links" to="/home">
          Home
          </Link>
        <Link className="links" to="/showNft">
          Browse NFTs
          </Link>
        <Link className="links" to="/profile">
          Profile
          </Link>
        <Link className="links" to="/addNft">
          Add
          </Link>
        <form onSubmit={handleSubmit}>
          <input className="buttForm1" type='submit' value='Logout' />
        </form>




      </div>


    </>
  );
};
