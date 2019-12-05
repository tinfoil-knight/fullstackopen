import React from 'react'

const Filter = ({newQuery, handleQueryChange}) => {
  return (
    <form>
      <div>
        <div>filter shown with <input value={newQuery} onChange={handleQueryChange}/></div>
      </div>
    </form>
  )
}

export default Filter
