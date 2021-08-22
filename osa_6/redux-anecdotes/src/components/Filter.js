import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  const handleChange = (event) => {
    const filter = event.target.value
    props.setFilter(filter)
  }

  return (
    <div style={{marginBottom: 10}}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(
  null,
  { setFilter }
)(Filter)

