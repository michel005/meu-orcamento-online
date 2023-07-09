import React, { HTMLAttributes, useRef, useState } from 'react'
import { Button } from './Button'
import style from './InputImage.module.scss'
import { CSSProperties } from 'styled-components'
import { Modal } from './Modal'
import { FileUtils } from '../utils/FileUtils'

export type InputImagePositionType = {
	x: number
	y: number
}

export type InputImageValue = {
	identifier: string | null
	base64?: string | null
	position: InputImagePositionType
}

export type InputImageType = HTMLAttributes<HTMLDivElement> & {
	label?: string
	value?: InputImageValue | null
	onChange?: (value: InputImageValue | null) => void
	fullWidth?: boolean
	enableRepositioning?: boolean
	readOnly?: boolean
	placeholder?: string
}

export const InputImage = ({
	label,
	onChange = () => null,
	value,
	fullWidth = false,
	enableRepositioning = false,
	readOnly = false,
	placeholder = 'Nenhuma imagem selecionada',
	...props
}: InputImageType) => {
	const [oldPosition, setOldPosition] = useState<InputImagePositionType>({
		x: 0,
		y: 0,
	})
	const [start, setStart] = useState<InputImagePositionType | null>(null)
	const [showModal, setShowModal] = useState<boolean>(false)
	const ref = useRef<HTMLInputElement>(null)

	console.log(props.className)

	return (
		<div
			{...props}
			data-full-width={fullWidth}
			data-value={!!value}
			data-read-only={readOnly}
			style={
				{
					'--position-x': `${(value?.position.x || 0) * -1}%`,
					'--position-y': `${(value?.position.y || 0) * -1}%`,
				} as CSSProperties
			}
			className={`${style.input} ${props.className}`}
		>
			{label && <div className={style.label}>{label}</div>}
			{value && (
				<img
					className={style.imageContainer}
					onMouseDown={(e) => {
						if (!start && enableRepositioning && value) {
							setStart({
								y: e.clientY,
								x: e.clientX,
							})
							setOldPosition(value.position)
						}
					}}
					onMouseUp={() => {
						setStart(null)
						setOldPosition({
							x: 0,
							y: 0,
						})
					}}
					onMouseOut={() => {
						setStart(null)
						setOldPosition({
							x: 0,
							y: 0,
						})
					}}
					onMouseMove={(e) => {
						if (!!start && !!oldPosition && value) {
							value.position.y = (oldPosition?.y || 0) + (e.clientY - start.y)
							value.position.x = (oldPosition?.x || 0) + (e.clientX - start.x)
							if (value.position.y > 0) {
								value.position.y = 0
							}
							if (value.position.y < -100) {
								value.position.y = -100
							}
							if (value.position.x > 0) {
								value.position.x = 0
							}
							if (value.position.x < -100) {
								value.position.x = -100
							}
							onChange({ ...value })
						}
					}}
					onDragStart={(e) => {
						e.preventDefault()
						e.stopPropagation()
					}}
					alt="image"
					src={value?.base64 || ''}
				/>
			)}
			{!value && (
				<Button
					data-upload
					className={style.imagePlaceholder}
					leftIcon={readOnly ? 'close' : 'image'}
					disabled={readOnly}
					onClick={() => {
						if (ref.current) {
							ref.current.click()
						}
					}}
				>
					{placeholder}
				</Button>
			)}
			{value && (
				<div className={style.buttons}>
					<Button
						leftIcon="search"
						variation="link"
						onClick={() => {
							setShowModal(true)
						}}
					/>
					<Button
						leftIcon="edit"
						variation="link"
						onClick={() => {
							if (ref.current) {
								ref.current.click()
							}
						}}
					/>
					<Button
						leftIcon="close"
						variation="link"
						onClick={() => {
							onChange(null)
						}}
					/>
				</div>
			)}
			<input
				ref={ref}
				type="file"
				value={''}
				onChange={(e: any) => {
					FileUtils.fileToBase64(e.target.files[0], (x) => {
						onChange({
							identifier: Math.random().toString(),
							base64: x,
							position: {
								x: 0,
								y: 0,
							},
						})
					})
				}}
				accept="image/*"
			/>
			{showModal && (
				<Modal
					header={label}
					onClose={() => {
						setShowModal(false)
					}}
				>
					<img className={style.modalImage} alt={label} src={value?.base64 || ''} />
				</Modal>
			)}
		</div>
	)
}
