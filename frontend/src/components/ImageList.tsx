import React, { HTMLAttributes, HTMLProps, useEffect, useState } from 'react'
import { InputImage, InputImageValue } from './InputImage'
import style from './ImageList.module.scss'

export interface ImageHTMLAttributes<T> extends HTMLAttributes<T> {
	value: InputImageValue[]
	onChange: (value: any) => void
}

export type ImageListType = ImageHTMLAttributes<HTMLDivElement> & {
	imageLimit?: number
}

export const ImageList = ({ value, onChange, imageLimit = 10, ...props }: ImageListType) => {
	const [images, setImages] = useState<InputImageValue[]>(value || [])

	useEffect(() => {
		onChange(images)
	}, [images])

	return (
		<div {...props} className={style.imageList}>
			<InputImage
				onChange={(value) => {
					if (value) {
						setImages((x) => {
							return [value as InputImageValue, ...x]
						})
					}
				}}
				placeholder="Adicionar nova imagem"
			/>
			{(images || []).map((image, imageKey) => {
				return (
					<InputImage
						key={image.id}
						value={image}
						onChange={(value) => {
							if (!value || !(value as InputImageValue)?.base64) {
								setImages((x) => {
									x.splice(imageKey, 1)
									return [...x]
								})
							} else {
								setImages((x) => {
									x[imageKey] = value as InputImageValue
									return [...x]
								})
							}
						}}
						enableRepositioning={true}
					/>
				)
			})}
		</div>
	)
}
