import React from 'react'
import _ from 'lodash'
import './welcome.css'
import { getEmojiSize } from '../../utils/utils'

const Welcome = (props) => (
  <section className="Welcome">
    <span>
      <h1 className="Welcome__verb">Welcome</h1>
      <h2 className="Welcome__name">{_.get(props.currentUser, "name")}</h2>
      <div
        onClick={props.incrementUserCount}
        style={{ fontSize: getEmojiSize(_.get(props.currentUser, "uid")) }}
        className="Welcome__emoji">
        {_.get(props.currentUser, "emoji")}
      </div>
    </span>
  </section>
)

export default Welcome
