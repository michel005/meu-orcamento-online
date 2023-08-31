import React, { CSSProperties, useRef, useState } from 'react'
import { Label } from '../Label.style'
import { FileInputStyle } from './FileInput.style'
import { FileUtils } from '../../utils/FileUtils'
import { FileInputType } from './FileInput.type'

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
			onChange({
				base64: base64String as string,
				name: file.name,
			})
		}
		reader.readAsDataURL(file)
	}

	const handleDragOver = (e: any) => {
		e.preventDefault()
		setShowDragHint(true)
	}

	return (
		<FileInputStyle
			data-loading={loading}
			data-error={!!error}
			data-disabled={disabled}
			style={
				{
					'--value': `url(${value?.base64})`,
				} as CSSProperties
			}
		>
			{label && <Label>{label}</Label>}
			<section
				onDrop={handleDrop}
				onDragLeave={() => {
					setShowDragHint(false)
				}}
				onDragOver={handleDragOver}
			>
				{showDragHint && (
					<div>
						<span>Solte o arquivo aqui</span>
					</div>
				)}
				{!showDragHint && (
					<div>
						{image && value && value.base64 && <img src={value?.base64} />}
						{!value && (
							<span>
								Nenhum arquivo selecionado.{' '}
								<a
									onClick={() => {
										ref.current.showPicker()
									}}
								>
									Selecione um arquivo
								</a>{' '}
								ou arraste ele até aqui
							</span>
						)}
					</div>
				)}
				{value && (
					<button
						data-icon="close"
						onClick={() => {
							onChange(null)
						}}
					>
						<span>Remover</span>
					</button>
				)}
			</section>
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
							onChange({
								name: file.name,
								base64: x,
							})
						})
					}
				}}
				placeholder={placeholder}
			/>
		</FileInputStyle>
	)
}
