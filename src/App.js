import React, { Component }        from 'react'
import Rebase                      from 're-base'
import firebase                    from 'firebase'
import _                           from 'lodash'

import Logout                      from     './components/Login/Logout'
import Welcome                     from     './components/0_Welcome/Welcome'

import firebaseConf                from './config/firebase'
import wheel                       from './assets/img/wheel.svg'

import './assets/styles/App.css'

const firebaseApp = firebase.initializeApp(firebaseConf)
const base = Rebase.createClass(firebaseApp.database());

class App extends Component {

  constructor() {
    super()
    this.state = {
      users: {},
      isLoading: true,
    }
  }

  componentDidMount() {
    base.bindToState('users', {
      context: this,
      state: 'users',
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isLoading: false
        })
      }
      else {
        this.setState({
          isLoading: true
        })
        this.anonymousLogin()
      }
    })
  }

  anonymousLogin = () => firebase.auth().signInAnonymously().catch((error) => alert(error.code))

  render() {
    const { users, isLoading } = this.state
    const firebaseSession = firebase.auth().currentUser

    return (
      <main>
        <header>
          <h2><span aria-label="fire" role="img">🔥</span> Firebase Meetup <span aria-label="fire" role="img">🔥</span></h2>
        </header>

        {isLoading && <img alt="loading" className="loading" src={wheel} />}

        {!isLoading && firebaseSession && <Logout firebase={firebase} />}

        {
          !isLoading &&
          firebaseSession &&
          _.has(users, firebaseSession.uid) && (
          <Welcome currentUser={_.get(users, firebaseSession.uid, null)} />
        )}

      </main>
    )
  }
}

export default App
