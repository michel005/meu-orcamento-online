import { Button } from '../../components/Button'
import React, { useContext } from 'react'
import { ModalContext } from '../../context/ModalContext'
import { TemplateRecurrence } from '../../constants/TemplateRecurrence'
import { PageContext } from '../../context/PageContext'
import { Select } from '../../components/Select'

export const TemplateOptions = () => {
	const { show } = useContext(ModalContext)
	const { data, defineData } = useContext(PageContext)

	return (
		<>
			<Button
				leftIcon="add"
				variation="sidebar"
				onClick={() => {
					show({
						entity: 'template',
						modal: {
							description: 'Novo Template',
						},
					})
				}}
			>
				Cadastrar
			</Button>
			<div style={{ flexGrow: 1 }} />
			<Select
				label="Recorrência"
				variation="sidebar"
				options={Object.keys(TemplateRecurrence)}
				idModifier={(x: string) => x}
				valueModifier={(x: string) => TemplateRecurrence[x]}
				nullable={true}
				nullableLabel="Todas as Recorrências"
				value={data?.template?.recurrence}
				onChange={(value) => {
					defineData('template', 'recurrence', value)
				}}
			/>
		</>
	)
}
