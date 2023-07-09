import React from 'react'
import { ButtonToolbar } from '../../components/ButtonToolbar'
import { Button } from '../../components/Button'
import { usePageData } from '../../hook/usePageData'
import { Table } from '../../components/Table'
import { useDatabase } from '../../hook/useDatabase'
import { StorageType } from '../../types/StorageType'
import style from './StoragePage.module.scss'
import { useFormLayout } from '../../hook/useFormLayout'

export type StoragePageDataType = {
	filters: Map<string, any>
	showNewStorage: StorageType | null
}

export const StoragePage = () => {
	const { content, save } = useDatabase<StorageType>('storage')
	const { data, updateData } = usePageData<StoragePageDataType>('storage', {
		filters: new Map(),
		showNewStorage: null,
	})

	const storageForm = useFormLayout<StorageType>({
		fields: [
			{
				id: 'name',
				label: 'Nome do Armazem',
			},
			{
				id: 'description',
				label: 'Descrição',
			},
			{
				id: 'localization',
				label: 'Local',
			},
			{
				id: 'code',
				label: 'Código',
			},
		],
		value: data.showNewStorage,
		onChange: (value) =>
			updateData({
				...data,
				showNewStorage: value,
			}),
	})

	return (
		<>
			<ButtonToolbar align="right">
				<div className={style.newStorage}>
					<Button
						leftIcon="add"
						onClick={() => {
							updateData({
								...data,
								showNewStorage: !data.showNewStorage
									? {
											name: 'Novo Storage',
									  }
									: null,
							})
						}}
					>
						Novo Armazem
					</Button>
					{data.showNewStorage && (
						<div className={style.newStorageForm}>
							{storageForm.name}
							{storageForm.description}
							{storageForm.localization}
							{storageForm.code}
							<ButtonToolbar align="right">
								<Button
									leftIcon="save"
									onClick={() => {
										if (data.showNewStorage) {
											save(data.showNewStorage, () => {
												updateData({
													...data,
													showNewStorage: null,
												})
											})
										}
									}}
								>
									Salvar
								</Button>
								<Button
									leftIcon="close"
									variation="secondary"
									onClick={() => {
										updateData({
											...data,
											showNewStorage: null,
										})
									}}
								>
									Cancelar
								</Button>
							</ButtonToolbar>
						</div>
					)}
				</div>
				<Button leftIcon="add" disabled={!!data.showNewStorage}>
					Novo Produto
				</Button>
			</ButtonToolbar>
			<Table
				definition={[
					{
						field: 'name',
						label: 'Nome do Armazem',
						filterPlaceholder: 'Buscar por armazens...',
					},
					{
						field: 'localization',
						label: 'Local',
					},
					{
						field: 'code',
						label: 'Código',
					},
				]}
				value={content}
				filters={data.filters}
				onChangeFilters={(value) =>
					updateData({
						...data,
						filters: new Map(value),
					})
				}
			/>
		</>
	)
}
