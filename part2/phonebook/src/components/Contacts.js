import React from 'react'

const Contacts = ({ namesToShow, handleDelete }) => {
  return (
    namesToShow.map(el => <p key={el.name}>{el.name} {el.number} <button value={el.id} name={el.name} onClick={handleDelete}>delete</button></p>)
  )
}

export default Contacts
