import React from 'react'

const Pagination = ({ currentPage, nextPage, prevPage }) => {
  return (
    <div className="flex justify-center my-10 items-center">
      <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-10" onClick={ () => prevPage() }>Prev</button>
      <span className="font-bold text-sm">{ currentPage }</span>
      <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-10" onClick={ () => nextPage() }>Next</button>
    </div>
  )
}

export default Pagination
