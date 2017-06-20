import React from 'react'
import './welcome.css'

const Welcome = (props) => (
  <section className="Welcome">
            <span>
              <h1 className="Welcome__verb">Welcome</h1>
              <h2 className="Welcome__name">{props.currentUser.name}</h2>
              <div className="Welcome__emoji">{props.currentUser.emoji}</div>
            </span>
  </section>
)

export default Welcome