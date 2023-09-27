import React from 'react'
import { Table } from '../../../../components/table/Table'
import { useData } from '../../../../hooks/useData'
import { Budget } from '../../../../types/Entities.type'
import { DateUtils } from '../../../../utils/DateUtils'
import budgetStatus from '../../../../copyDeck/BudgetStatus.json'

export const HistoryTab = () => {
	const formData = useData<Budget>('budgetForm', {
		date: DateUtils.dateToString(new Date()),
		status: 'pending',
	})

	return (
		<>
			<Table<{}>
				header={{
					date: {
						label: 'Data e Hora',
					},
					title: {
						label: 'Titulo',
						valueModifier: (row: any) => row.value.title,
					},
					status: {
						label: 'Situação',
						valueModifier: (row: any) =>
							budgetStatus[row.value.status as keyof typeof budgetStatus],
					},
				}}
				value={formData.data?.history || []}
			/>
		</>
	)
}
