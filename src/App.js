import React, { useState, useEffect } from 'react'
import PhotoList from './components/PhotoList'
import Pagination from './components/Pagination'
import Upload from './components/Upload'
import axios from 'axios'

const URL = 'http://localhost:8888/'

const App = () => {
  const [ images, setImages ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isUploaded, setIsUploaded ] = useState(false)
  const [ showModal, setShowModal ] = useState(false)
  const [ errorAlert, setErrorAlert ] = useState(false)
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ postPerPage, setPostPerPage ] = useState({ skip: 0, limit: 10})
  const [ uploadImage, setUploadImage ] = useState()
  const [ album, setAlbum ] = useState('')

  useEffect(() => {
    const fetchPhoto = async () => {
      setIsLoading(true)
      const res = await axios.post(`${URL}photos/list`, postPerPage)
      setImages(res.data.documents)
      setIsLoading(false)
    }
    fetchPhoto()
  }, [])

  const nextPage = () => {
    setPostPerPage( () => ({
      skip: indexOfLastImage,
      limit: 10
    }));
    axios.post(`${URL}photos/list`, postPerPage).then(res => {
      setImages( res.data.documents )
      setCurrentPage( prevPage => prevPage + 1)
    })
  };
  
  const prevPage = () => {
    setPostPerPage( () => ({
      skip: indexOfLastImage - 10,
      limit: 10
    }));
    axios.post(`${URL}photos/list`, postPerPage).then(res => {
      setImages( res.data.documents )
      setCurrentPage( prevPage => prevPage - 1)
    })
  };

  const removeData = (id, album, filename) => {
    axios.delete(`${URL}photos/${album}/${filename}`).then(res => {
      const del = images.filter(image => id !== image.id)
      setImages(del)
    })
  }

  const handleChange = e => {
    const file = e.target.files[0]
    if ( file ) {
      setUploadImage(file)
    }
  }

  const handleAlbumChange = e => {
    setAlbum(e.target.value)
  }

  const handleUpload = async e => {
    e.preventDefault();
    if ( album && uploadImage ) {
      const formData = new FormData();
      formData.append('album', album);
      formData.append('documents', uploadImage)
      axios.put(`${URL}photos`, formData)
      .then( () => {
        setIsUploaded(true)
        setTimeout( () => {
          setIsUploaded(false)
          setAlbum('')
          setUploadImage()
          setShowModal(false)
        }, 5000)
      })
    } else if ( !album ) {
      setErrorAlert('Album is required')
    } else if ( !uploadImage ) {
      setErrorAlert('Image is required')
    } else if ( !uploadImage && !album ) {
      setErrorAlert('Image and Album is required')
    }
  };

  const indexOfLastImage = currentPage * postPerPage.limit

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-3xl font-medium mt-20">React Photo  by Indri Ruth</h1>
      { isLoading 
      ? 
        <h1 className="font-medium text-xl mx-auto text-center mt-10">Loading ...</h1>
      : 
        <>
          { !showModal 
          ? 
            <div className="text-right">
              <button onClick={() => setShowModal(true) } className="font-medium text-xl border border-blue-500 bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white rounded-full px-4 py-1">
                Upload
              </button> 
            </div>
          : 
            <Upload handleChange={handleChange} handleUpload={handleUpload} isUploaded={isUploaded} album={album} handleAlbumChange={handleAlbumChange} errorAlert={errorAlert} />
          }
          <PhotoList images={images} removeData={removeData} />
          <Pagination nextPage={nextPage} currentPage={currentPage} prevPage={prevPage} />
        </>
      }
    </div>
  );
}

export default App;
