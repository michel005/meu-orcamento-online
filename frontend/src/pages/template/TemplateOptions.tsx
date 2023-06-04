import { Button } from '../../components/Button'
import React, { useContext } from 'react'
import { ModalContext } from '../../context/ModalContext'
import { ButtonGroup } from '../../components/ButtonGroup'
import { TemplateRecurrence } from '../../constants/TemplateRecurrence'
import { PageContext } from '../../context/PageContext'

export const TemplateOptions = () => {
	const { show } = useContext(ModalContext)
	const { data, defineData } = useContext(PageContext)

	return (
		<>
			<Button
				leftIcon="add"
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
			<h5>Filtros</h5>
			<ButtonGroup
				sidebarMode={true}
				list={Object.keys(TemplateRecurrence).map((x) => ({
					id: x,
					value: x,
					label: TemplateRecurrence[x],
				}))}
				nullable={true}
				nullableLabel="Todas as Recorrências"
				value={{ id: data?.template?.recurrence }}
				onChange={(value) => {
					defineData('template', 'recurrence', value?.value)
				}}
			/>
		</>
	)
}
