import React, { CSSProperties, useRef, useState } from 'react'
import style from './PictureField.module.scss'
import { UserPicture } from '../UserPicture'
import { Button, ButtonGhost, ButtonSecondary, ButtonWhite } from '../Button'
import { FileUtils } from '../../utils/FileUtils'
import { ButtonGroup } from '../ButtonGroup'

export const PictureField = ({
	field,
	size,
	disabled = false,
	value,
	onChange = (value: any) => {},
	placeholder = undefined,
	name,
}) => {
	const [oldPicture, setOldPicture] = useState((value?.[field] || {})?.value)
	const [background, setBackground] = useState(null)
	const [changed, setChanged] = useState(false)
	const ref = useRef<HTMLInputElement>(null)
	const { value: picture, type: valueType } = value?.[field] || {}

	const currentSize = size || '150px'

	return (
		<div
			data-field={field}
			className={style.pictureField}
			style={
				{
					'--size': currentSize,
					width: currentSize,
					backgroundImage: background ? `url(${background})` : null,
				} as CSSProperties
			}
		>
			<UserPicture
				className={style.picture}
				picture={picture}
				placeholder={
					placeholder || (!!name ? undefined : !value[field] && 'Sem Imagem Selecionada')
				}
				size={currentSize}
				name={name}
				dataCallback={(x) => {
					setBackground(x)
				}}
			/>
			{!disabled && (
				<div className={style.pictureOptions}>
					<ButtonGroup>
						{changed && (
							<Button
								leftIcon="undo"
								onClick={() => {
									if (oldPicture) {
										value[field] = {
											value: oldPicture,
											type: 'url',
										}
									} else {
										value[field] = null
									}
									onChange({ ...value })
									setOldPicture(null)
									setChanged(false)
								}}
							>
								Desfazer
							</Button>
						)}
						<Button
							leftIcon="folder_open"
							onClick={() => {
								ref.current.click()
							}}
						>
							Procurar
						</Button>
						{value[field] && (
							<Button
								leftIcon="delete"
								onClick={() => {
									value[field] = undefined
									onChange({ ...value })
									setBackground(null)
									setChanged(true)
								}}
							>
								Remover
							</Button>
						)}
					</ButtonGroup>
				</div>
			)}
			<input
				ref={ref}
				style={{ display: 'none' }}
				type="file"
				accept="image/*"
				onChange={(event) => {
					if (event.target.files?.[0]) {
						FileUtils.fileToBase64(event.target.files[0], (response) => {
							value[field] = {
								value: response,
								type: 'file',
							}
							onChange({ ...value })
							ref.current.value = ''
							setChanged(true)
						})
					}
				}}
			/>
		</div>
	)
}
