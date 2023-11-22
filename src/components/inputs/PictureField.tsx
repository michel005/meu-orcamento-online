import { useMessage } from '../../hooks/useMessage'
import React, { useRef } from 'react'
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
	const { message } = useMessage()
	const ref = useRef(null)
	return (
		<div data-field={field} className={style.pictureField} style={{ width: size || '150px' }}>
			<UserPicture
				picture={value?.[field]}
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
									value[field] = null
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
						FileUtils.fileToBase64(event.target.files?.[0], (base64) => {
							if (!base64.startsWith('data:image')) {
								message(
									'Arquivo inválido!',
									'O arquivo informado não é uma imagem.'
								)
								return
							}
							value[field] = base64
							onChange({ ...value })
						})
					}
				}}
			/>
		</div>
	)
}
