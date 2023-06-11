import React, { HTMLAttributes, useEffect, useRef, useState } from 'react'
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
	id: string | null
	base64?: string | null
	position?: InputImagePositionType
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
	const [position, setPosition] = useState<InputImagePositionType>(
		value?.position || {
			x: 0,
			y: 0,
		}
	)
	const [oldPosition, setOldPosition] = useState<InputImagePositionType | null>({
		x: 0,
		y: 0,
	})
	const [start, setStart] = useState<InputImagePositionType | null>(null)
	const [showModal, setShowModal] = useState<boolean>(false)
	const [rootMouseDown, setRootMouseDown] = useState<boolean>(false)
	const ref = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (position && value) {
			onChange({
				...value,
				position,
			})
		}
	}, [position])

	return (
		<div
			{...props}
			data-full-width={fullWidth}
			data-value={!!value}
			data-read-only={readOnly}
			data-mouse-down={rootMouseDown && !showModal}
			onMouseUp={() => {
				setRootMouseDown(false)
			}}
			onMouseOut={() => {
				setRootMouseDown(false)
			}}
			onMouseDown={() => {
				setRootMouseDown(true)
			}}
			style={
				{
					'--position-x': `${position.x * -1}%`,
					'--position-y': `${position.y * -1}%`,
				} as CSSProperties
			}
			className={`${style.input} ${props.className}`}
		>
			{label && <div className={style.label}>{label}</div>}
			<img
				alt="image"
				onMouseDown={(e) => {
					if (!start && enableRepositioning) {
						setStart({
							y: e.clientY,
							x: e.clientX,
						})
						setOldPosition({ ...position })
					}
				}}
				onMouseUp={() => {
					setStart(null)
					setOldPosition(null)
				}}
				onMouseOut={() => {
					setStart(null)
					setOldPosition(null)
				}}
				onMouseMove={(e) => {
					if (!!start && !!oldPosition) {
						setPosition((pos) => {
							pos.y = (oldPosition?.y || 0) + e.clientY - start.y
							pos.x = (oldPosition?.x || 0) + e.clientX - start.x
							if (pos.y > 0) {
								pos.y = 0
							}
							if (pos.y < -100) {
								pos.y = -100
							}
							if (pos.x > 0) {
								pos.x = 0
							}
							if (pos.x < -100) {
								pos.x = -100
							}
							return { ...pos }
						})
					}
				}}
				onDragStart={(e) => {
					e.preventDefault()
					e.stopPropagation()
				}}
				src={value?.base64 || ''}
			/>
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
							id: Math.random().toString(),
							base64: x,
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
