import React from 'react'
import { CardLayout } from '../../components/CardLayout'
import { Card } from '../../components/Card'
import { Button } from '../../components/Button'
import { useModalData } from '../../hook/useModalData'
import { GymTrainingType } from '../../types/GymTrainingType'
import { useDatabase } from '../../hook/useDatabase'
import { Text } from '../../components/Text'

export const GymPage = () => {
	const { content } = useDatabase<GymTrainingType>('gym')
	const { show } = useModalData<GymTrainingType>('gym')

	return (
		<>
			<h1>Academia</h1>
			<CardLayout>
				<div data-row style={{ flexGrow: 1 }}>
					<div data-column>
						<Card>
							<h2>Qual será o seu treino hoje?</h2>
							<p>
								Aqui você registra os seu treino, e registra seus resultados
								diários. Com o tempo você consegue analizar sua progressão de carga.
							</p>
							<Button
								leftIcon={'add'}
								onClick={() => {
									show({
										name: 'Novo Treino',
									})
								}}
							>
								Novo Registro
							</Button>
						</Card>
					</div>
					<div data-column style={{ flexGrow: 3 }}>
						{content.map((training) => {
							return (
								<Card
									header={
										<Button
											onClick={() => {
												show({
													...training,
												})
											}}
											style={{ width: '100%' }}
											variation="link"
										>
											<h2>{training.name}</h2>
										</Button>
									}
									label={
										training.expirationDate && (
											<Text leftIcon="calendar_month" style={{ gap: '7px' }}>
												{training.expirationDate}
											</Text>
										)
									}
								>
									{training.description && <p>{training.description}</p>}
								</Card>
							)
						})}
					</div>
				</div>
			</CardLayout>
		</>
	)
}
