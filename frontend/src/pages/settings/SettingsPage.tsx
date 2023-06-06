import React, { useContext, useEffect, useState } from 'react'
import style from './SettingsPage.module.scss'
import { DatabaseContext, Settings } from '../../context/DatabaseContext'
import { Input } from '../../components/Input'
import { FormLayout } from '../../components/FormLayout'
import { Button } from '../../components/Button'

export const SettingsPage = () => {
	const { settings, create, update } = useContext(DatabaseContext)

	const [config, setConfig] = useState<Settings | null>(settings || {})

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

	useEffect(() => {
		setConfig(settings)
	}, [settings])

	return (
		<div className={style.settings}>
			<FormLayout
				fields={[
					{
						id: 'colorSchema',
						label: 'Esquema de Cores',
						type: 'color',
					},
					{
						id: 'showCards',
						label: 'Mostrar cartões de saldo',
						type: 'checkbox',
					},
					{
						id: 'pendentMovements',
						label: 'Mostrar lançamentos pendentes',
						type: 'checkbox',
					},
					{
						id: 'goals',
						label: 'Mostrar metas financeiras',
						type: 'checkbox',
					},
					{
						id: 'balanceByDay',
						label: 'Mostrar saldo por dia do mês',
						type: 'checkbox',
					},
				]}
				value={config || {}}
				onChange={setConfig}
			>
				{(fields) => (
					<>
						<h1>Configurações</h1>
						{fields.colorSchema}
						<h2>Dashboard</h2>
						{fields.showCards}
						{fields.pendentMovements}
						{fields.goals}
						{fields.balanceByDay}
					</>
				)}
			</FormLayout>
			<div>
				<Button
					leftIcon="save"
					onClick={() => {
						updateColorSchema(config?.colorSchema || '#3399ff')
					}}
				>
					Salvar
				</Button>
			</div>
		</div>
	)
}
