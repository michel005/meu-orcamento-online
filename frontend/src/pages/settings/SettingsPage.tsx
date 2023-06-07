import React, { useContext, useEffect, useState } from 'react'
import style from './SettingsPage.module.scss'
import { DatabaseContext, Settings } from '../../context/DatabaseContext'
import { Input } from '../../components/Input'
import { FormLayout } from '../../components/FormLayout'
import { Button } from '../../components/Button'

export const SettingsPage = () => {
	const { settings, create, update } = useContext(DatabaseContext)

	const [config, setConfig] = useState<Settings>(settings || {})

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
						id: 'showBalanceCards',
						label: 'Mostrar cartões de saldo',
						type: 'checkbox',
					},
					{
						id: 'showPendentMovements',
						label: 'Mostrar lançamentos pendentes',
						type: 'checkbox',
					},
					{
						id: 'showGoals',
						label: 'Mostrar metas financeiras',
						type: 'checkbox',
					},
					{
						id: 'showBalanceByDayChart',
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
						{fields.showBalanceCards}
						{fields.showPendentMovements}
						{fields.showGoals}
						{fields.showBalanceByDayChart}
					</>
				)}
			</FormLayout>
			<div>
				<Button
					leftIcon="save"
					onClick={() => {
						if (config?.id) {
							update('settings', config)
						} else {
							create('settings', config)
						}
					}}
				>
					Salvar
				</Button>
			</div>
		</div>
	)
}
