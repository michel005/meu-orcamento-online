import axios from 'axios'
import { useContext } from 'react'
import { DataCacheContext } from '../contexts/DataCacheContext'

export const usePicture = () => {
	const { pictureCache, setPictureCache } = useContext(DataCacheContext)

	const load = async (picture: string) => {
		if (!picture.startsWith('http')) {
			return picture
		}
		const cachedPicture = pictureCache.find(([url]) => url.startsWith(picture))
		if (cachedPicture) {
			return cachedPicture[1]
		} else {
			const response = await axios.get(picture, {
				responseType: 'arraybuffer',
				headers: {
					authorization: `Baerer ${localStorage.getItem('auth_token')}`,
				},
			})
			const base64Image = btoa(
				new Uint8Array(response.data).reduce(
					(data, byte) => data + String.fromCharCode(byte),
					''
				)
			)
			const imageDataUrl = `data:${response.headers['content-type']};base64,${base64Image}`
			setPictureCache((x) => {
				x.push([picture, imageDataUrl])
				return [...x]
			})
			return imageDataUrl
		}
	}

	return {
		load,
	}
}
