import React, { HTMLAttributes, useEffect, useRef, useState } from 'react'
import { InputImage, InputImageValue } from './InputImage'
import style from './ImageList.module.scss'
import { Image } from './Image'
import { FileUtils } from '../utils/FileUtils'
import { Button } from './Button'

export interface ImageHTMLAttributes<T> extends HTMLAttributes<T> {
	value: InputImageValue[]
	onChange: (value: any) => void
}

export type ImageListType = ImageHTMLAttributes<HTMLDivElement> & {
	imageLimit?: number
}

export const ImageList = ({ value, onChange, imageLimit = 10, ...props }: ImageListType) => {
	const [images, setImages] = useState<InputImageValue[]>(value || [])
	const [mainImage, setMainImage] = useState<InputImageValue | null>(null)
	const ref = useRef<HTMLInputElement>(null)

	useEffect(() => {
		onChange(images)
		if (!mainImage) {
			setMainImage(images?.[0] || null)
		}
	}, [images])

	return (
		<div {...props} className={style.imageList}>
			<InputImage
				readOnly={images.length === 0}
				className={style.mainImage}
				value={mainImage}
				onChange={(value) => {
					const parsedValue = value as InputImageValue
					const foundIndex = images.findIndex(
						(s) => s.identifier === mainImage?.identifier
					)
					if (value) {
						setImages((x) => {
							if (foundIndex !== -1) {
								x[foundIndex].base64 = parsedValue.base64
								x[foundIndex].position = parsedValue.position
								return [...x]
							} else {
								return [...x, parsedValue]
							}
						})
					} else {
						setImages((x) => {
							if (foundIndex !== -1) {
								x.splice(foundIndex, 1)
							}
							setMainImage(x?.[0] || null)
							return [...x]
						})
					}
				}}
				enableRepositioning={true}
				placeholder="Nenhuma imagem adicionada"
			/>
			<div className={style.allIMages}>
				<Button
					className={style.addImage}
					leftIcon="add"
					onClick={() => {
						if (ref.current) {
							ref.current.click()
						}
					}}
				/>
				{(images || []).map((image, imageKey) => {
					return (
						<Image
							{...image}
							key={imageKey}
							size="50px"
							onClick={() => {
								setMainImage(image)
							}}
							data-active={image.identifier === mainImage?.identifier}
						/>
					)
				})}
			</div>
			<input
				ref={ref}
				type="file"
				value={''}
				multiple={true}
				onChange={(e) => {
					if (e.target.files) {
						for (var i = 0; i <= e.target.files.length; i++) {
							const file = e.target.files.item(i)
							if (file) {
								FileUtils.fileToBase64(file, (imageBase64) => {
									setImages((x) => {
										return [
											...x,
											{
												identifier: Math.random().toString(),
												base64: imageBase64,
												zoom: 100,
												position: {
													x: 0,
													y: 0,
												},
											},
										]
									})
								})
							}
						}
					}
				}}
				accept="image/*"
			/>
		</div>
	)
}
