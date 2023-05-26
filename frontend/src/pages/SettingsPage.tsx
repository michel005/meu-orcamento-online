import React, { useContext, useState } from 'react'
import style from './SettingsPage.module.scss'
import buttonGroupStyle from '../components/ButtonGroup.module.scss'
import { DatabaseContext, Settings } from '../context/DatabaseContext'
import { Button } from '../components/Button'
import { ColorSchema } from '../constants/ColorSchema'

export const SettingsPage = () => {
	const databaseContext = useContext(DatabaseContext)

	const [config, setConfig] = useState<Settings>(databaseContext.settings)

	const updateColorSchema = (color: string) => {
		if (config.id) {
			databaseContext.update('settings', {
				...config,
				colorSchema: color,
			})
		} else {
			databaseContext.create('settings', {
				...config,
				colorSchema: color,
			})
		}
	}

	return (
		<div className={style.settings}>
			<h1>Configurações</h1>
			<div className={style.field}>
				<b>Esquema de Cores</b>
				<div className={style.colorList}>
					<div className={buttonGroupStyle.buttonGroup}>
						{Object.keys(ColorSchema).map((color) => {
							return (
								<Button
									onClick={() => updateColorSchema(color)}
									data-color-schema={color}
								>
									{ColorSchema[color]}
								</Button>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}
