import React from 'react'

const Modal = ({ isUploaded, handleAlbumChange, handleChange, handleUpload, album, errorAlert }) => {
  return (
    <div>
      { isUploaded 
        ? 
          <span className="flex justify-end font-medium">Your file has been uploaded!</span> 
        :
          <div className="flex flex-col items-end mt-10">
            <div>
              <input
                type="file"
                id="upload-button"
                onChange={ e => handleChange(e) }
              />
              <label className="mr-2 font-bold">Album</label>
              <select value={album} onChange={e => handleAlbumChange(e) }>
                <option value=""></option>
                <option value="travel">Travel</option>
                <option value="nature">Nature</option>
                <option value="food">Food</option>
                <option value="personal">Personal</option>
                <option value="other">Other</option>
              </select>
              <button className="border border-blue-500 bg-transparent rounded text-blue-500 px-2 py-1 ml-8" onClick={ e => handleUpload(e) }>Submit</button>
            </div>
            { errorAlert ? <div className="mt-2 text-red-600 font-medium text-sm">{ errorAlert }</div> : ''}
          </div>
        }
    </div>
  )
}

export default Modal
