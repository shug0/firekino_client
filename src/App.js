import React, { Component }  from 'react'
import Rebase                from 're-base'
import firebase              from 'firebase'
import _                     from 'lodash'

import Logout                from     './components/Login/Logout'
import Welcome               from     './components/0_Welcome/Welcome'

import firebaseConf          from './config/firebase'
import loading               from './assets/img/loading_2.gif'

import './assets/styles/App.css'

const firebaseApp = firebase.initializeApp(firebaseConf)
const base = Rebase.createClass(firebaseApp.database())

class App extends Component {
  constructor() {
    super()
    this.state = {
      users: {},
      stats: {},
      count: 0
    }
  }

  componentDidMount() {
    base.syncState('users', {
      context: this,
      state: 'users',
    });
    base.bindToState('stats', {
      context: this,
      state: 'stats',
    });
    firebase.auth().onAuthStateChanged(user => (!user) && this.anonymousLogin())
  }

  anonymousLogin = () => firebase.auth().signInAnonymously()

  incrementUserCount = (uid) => {
    const { stats, count } = this.state

    this.setState({
      count: count + 1
    })

    const currentUserCountRef = firebase.database().ref(`users/${uid}/count`);

    if (_.get(stats, 'lock')) {
      currentUserCountRef.set(count);
    }
  }

  render() {
    const { users } = this.state
    const firebaseSession = firebase.auth().currentUser

    const currentUser = _.get(users, _.get(firebaseSession, "uid"), false)
    const uid = _.get(firebaseSession, "uid")

    return (
      <main>
        <header>
          <h2><span aria-label="fire" role="img">🔥</span> Firebase Meetup <span aria-label="fire" role="img">🔥</span></h2>
        </header>

        {!currentUser && <img alt="loading" className="loading" src={loading} />}

        {!currentUser && firebaseSession && <Logout firebase={firebase} />}

        {currentUser &&
          <Welcome currentUser={currentUser} incrementUserCount={() => this.incrementUserCount(uid) }/>
        }

      </main>
    )
  }
}

export default App
