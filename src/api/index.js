import axios from 'axios'

const BASE_URL = 'http://localhost:8888'

const config = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPhoto = async ( datas ) => {
  try {
    const { data } = await config.post( `/photos/list`, datas )
    return data
  } catch ( err ) {
    throw new Error( err.message )
  }
};

export const uploadPhotos = async ( photos ) => {
  try {
    const { data } = await config.put( `/photos`, photos )
    return data
  } catch ( err ) {
    throw new Error( err.message )
  }
};

export const deletePhotos = async ( photos ) => {
  try {
    const { data } = await config({
      method: 'delete',
      url: `/photos`,
      data: photos,
    })
    return data.message
  } catch ( err ) {
    throw new Error( err.message )
  }
};

export const deletePhoto = async ( photo ) => {
  const album = photo.album.toLowerCase()
  try {
    const { data } = await config.delete( `/photos/${album}/${photo.name}` )
    return data.message;
  } catch ( err ) {
    throw new Error( err.message )
  }
};
