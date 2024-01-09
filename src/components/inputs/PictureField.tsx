import React, { useRef, useState } from 'react'
import style from './PictureField.module.scss'
import { UserPicture } from '../UserPicture'
import { Button } from '../Button'
import { FileUtils } from '../../utils/FileUtils'

export const PictureField = ({
	field,
	size,
	disabled,
	value,
	onChange,
	placeholder,
	name,
	type,
}) => {
	const [oldPicture, setOldPicture] = useState((value?.[field] || {})?.value)
	const ref = useRef<HTMLInputElement>(null)
	const { value: picture, type: valueType } = value?.[field] || {}

	return (
		<div data-field={field} className={style.pictureField} style={{ width: size || '150px' }}>
			<UserPicture
				picture={picture}
				placeholder={
					placeholder || (!!name ? undefined : !value[field] && 'Sem Imagem Selecionada')
				}
				size={size || '150px'}
				type={type}
				name={name}
				randomId={Math.random()}
			/>
			{!disabled && (
				<div className={style.pictureOptions}>
					{valueType === 'file' && (
						<Button
							leftIcon="undo"
							onClick={() => {
								if (!disabled) {
									value[field] = {
										value: oldPicture,
										type: 'url',
									}
									onChange({ ...value })
								}
							}}
						/>
					)}
					<Button
						leftIcon="folder_open"
						onClick={() => {
							if (!disabled) {
								ref.current.click()
							}
						}}
					/>
					{value[field] && (
						<Button
							leftIcon="close"
							onClick={() => {
								if (!disabled) {
									value[field] = undefined
									onChange({ ...value })
								}
							}}
						/>
					)}
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
						})
					}
				}}
			/>
		</div>
	)
}
