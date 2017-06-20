import React from 'react'

const AnonymousLogin = (props) => (
  <button className="Logout" href="#" onClick={() => props.firebase.auth().signOut()}>
    X
  </button>
)

export default AnonymousLogin
