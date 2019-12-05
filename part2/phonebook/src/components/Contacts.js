import React from 'react'

const Contacts = ({namesToShow}) => {
  return (
    namesToShow.map(el => <p key={el.name}>{el.name} {el.number}</p>)
  )
}

export default Contacts
