import React, { useContext, useState } from 'react'
import style from './SettingsPage.module.scss'
import { DatabaseContext, Settings } from '../../context/DatabaseContext'
import { Input } from '../../components/Input'

export const SettingsPage = () => {
	const { settings, create, update } = useContext(DatabaseContext)

	const [config, setConfig] = useState<Settings | null>(settings)

	const updateColorSchema = (color: string) => {
		if (config?.id) {
			update('settings', {
				...config,
				colorSchema: color,
			})
		} else {
			create('settings', {
				...config,
				colorSchema: color,
			})
		}
	}

	return (
		<div className={style.settings}>
			<h1>Configurações</h1>
			<Input
				label="Esquema de Cores"
				type="color"
				value={config?.colorSchema}
				onChange={(value: any) => {
					setConfig((x) => {
						return { ...x, colorSchema: value }
					})
				}}
				rightButton={{
					children: 'Salvar',
					onClick: () => {
						updateColorSchema(config?.colorSchema || '#3399ff')
					},
				}}
			/>
		</div>
	)
}
