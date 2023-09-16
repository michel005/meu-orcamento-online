import React, { CSSProperties, useRef, useState } from 'react'
import style from './FileInput.module.scss'
import { Label } from '../Label.style'
import { FileUtils } from '../../utils/FileUtils'
import { FileInputType } from './FileInput.type'
import { Button } from '../button/Button'

export const FileInput = ({
	error,
	label,
	onChange,
	placeholder,
	value,
	disabled,
	loading,
	image,
}: FileInputType) => {
	const [showDragHint, setShowDragHint] = useState(false)
	const ref = useRef<any>()

	const handleDrop = (e: any) => {
		e.preventDefault()
		setShowDragHint(false)

		const file = e.dataTransfer.files[0]
		const reader = new FileReader()
		reader.onload = () => {
			const base64String = reader.result
			onChange(base64String as string)
		}
		reader.readAsDataURL(file)
	}

	const handleDragOver = (e: any) => {
		e.preventDefault()
		setShowDragHint(true)
	}

	return (
		<div
			className={style.fileInput}
			data-loading={loading}
			data-error={!!error}
			data-disabled={disabled}
		>
			{label && <Label>{label}</Label>}
			{!value && (
				<div
					className={style.dropFileHere}
					onDrop={handleDrop}
					onDragLeave={() => {
						setShowDragHint(false)
					}}
					onDragOver={handleDragOver}
				>
					{showDragHint && <span>Solte o arquivo aqui</span>}
					{!showDragHint && (
						<div>
							<p>Nenhum arquivo selecionado.</p>
							<p>
								<a
									onClick={() => {
										ref.current.showPicker()
									}}
								>
									Selecione um arquivo
								</a>{' '}
								ou arraste ele até aqui
							</p>
						</div>
					)}
				</div>
			)}
			{value && (
				<div
					className={style.imageContent}
					style={
						{
							'--value': `url(${value})`,
						} as CSSProperties
					}
				>
					<img src={value} />
					<Button
						leftIcon="close"
						onClick={() => {
							onChange(null)
						}}
					>
						<span>Remover</span>
					</Button>
				</div>
			)}
			{error && <span>{error}</span>}
			<input
				ref={ref}
				disabled={disabled}
				type="file"
				value={''}
				onChange={(e) => {
					if (e.target.files) {
						const file = e.target.files[0] as File
						FileUtils.fileToBase64(file, (x) => {
							onChange(x)
						})
					}
				}}
				placeholder={placeholder}
			/>
		</div>
	)
}
