import React, { useContext } from 'react'
import style from './TemplatePage.module.scss'
import { DatabaseContext } from '../../context/DatabaseContext'
import { Table } from '../../components/Table'
import { ModalContext } from '../../context/ModalContext'
import { PageContext } from '../../context/PageContext'
import { TemplateRecurrence } from '../../constants/TemplateRecurrence'
import { Button } from '../../components/Button'

export const TemplatePage = () => {
	const { templates } = useContext(DatabaseContext)
	const { show } = useContext(ModalContext)
	const { data } = useContext(PageContext)

	return (
		<div className={style.template}>
			<Table
				initialSort={{
					field: 'day',
					direction: 'ASC',
				}}
				definition={[
					{
						field: 'day',
						label: 'Dia',
					},
					{
						field: 'description',
						label: 'Descrição',
						className: style.description,
						valueModifier: (row) => (
							<span>
								{row.description}
								{row.goal && (
									<Button variation="link" disabled={true} leftIcon="flag" />
								)}
							</span>
						),
					},
					{
						field: 'account',
						label: 'Conta Financeira',
						valueModifier: (row) => row?.account?.name,
					},
					{
						field: 'recurrence',
						label: 'Recorrência',
						valueModifier: (row) => TemplateRecurrence[row.recurrence],
					},
				]}
				onClick={(row) => {
					show({
						entity: 'template',
						modal: { ...row, value: row.value / 100 },
					})
				}}
				value={templates.filter(
					(x) =>
						!data?.template?.recurrence || x.recurrence === data?.template?.recurrence
				)}
			/>
		</div>
	)
}
