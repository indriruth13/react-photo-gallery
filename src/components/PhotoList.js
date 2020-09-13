import React from 'react'

const PhotoList = ({ images, removeData }) => {
  return  (
    <div className="grid grid-cols-5 gap-4 mt-10">
      { images.map( image => (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img 
            src={ image.raw }
            className="w-full h-48"
            alt="photos" />
          <div className="px-6 py-4 flex justify-between items-center">
            <div><span className="font-bold">Album :</span> { image.album }</div>
            <button className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full" onClick={() => removeData(image.id, image.album, image.name)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}; 

export default PhotoList
