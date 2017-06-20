import React, { Component }        from 'react'
import Rebase                      from 're-base'
import firebase                    from 'firebase'

import Logout                      from     './components/Login/Logout'
import Welcome                     from     './components/0_Welcome/Welcome'
import {
  getNewAnimal,
  findStoredUserByUid,
  getUsers,
} from './utils/utils'

import firebaseConf                from './config/firebase'
import wheel                       from './assets/img/wheel.svg'

import './assets/styles/App.css'

const firebaseApp = firebase.initializeApp(firebaseConf)
const base = Rebase.createClass(firebaseApp.database());

class App extends Component {

  constructor() {
    super()
    this.state = {
      currentUser: {},
      isLoading: true,
    }
  }

  componentDidMount() {
    const _this = this
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        getUsers(base).then(users => {
          console.log(findStoredUserByUid(user.uid, users))
          _this.setState({
            isLoading: false,
            currentUser: findStoredUserByUid(user.uid, users)
          })
        });
      }
      else {
        _this.anonymousLogin()
      }
    });
  }

  anonymousLogin = () => {
    const _this = this

    getUsers(base).then(users => {

      firebase.auth().signInAnonymously().then(user => {
        const newAnimal = getNewAnimal(users)

        const newUser = {
          name: newAnimal.name,
          emoji: newAnimal.value,
          uid: user.uid,
        }

        base.push('users', {
          data: newUser,
          then(err){
            if(!err){
              _this.setState({
                isLoading: false,
                currentUser: newUser
              })
            }
          }
        });

      }).catch((error) => alert(error.code));
    })
  }

  render() {
    const { isLoading, currentUser } = this.state
    const isLogged = firebase.auth().currentUser

    return (
      <main>
        <header>
          <h2><span aria-label="fire" role="img">🔥</span> Firebase Meetup <span aria-label="fire" role="img">🔥</span></h2>
        </header>

        {isLoading && <img alt="loading" className="loading" src={wheel} />}

        {!isLoading && isLogged && <Logout firebase={firebase} />}

        {!isLoading && isLogged && currentUser && (
          <Welcome currentUser={currentUser} />
        )}

      </main>
    )
  }
}

export default App
