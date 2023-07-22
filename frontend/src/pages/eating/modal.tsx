import { Modal } from '../../components/Modal'
import { useFormLayout } from '../../hook/useFormLayout'
import { EatingRecordType } from '../../types/EatingRecordType'
import { Shift } from '../../types/Shift'
import { useModalData } from '../../hook/useModalData'
import React, { useContext } from 'react'
import { useDatabase } from '../../hook/useDatabase'
import { FormDesign, GroupWithLabel } from '../../components/FormDesign'
import { useFormValidation } from '../../hook/useFormValidation'
import { ModalContext } from '../../context/ModalContext'

export const EatingModal = () => {
	const { showQuestion } = useContext(ModalContext)
	const { save, remove } = useDatabase<EatingRecordType>('eating')
	const { modal, update, close } = useModalData<EatingRecordType>('eating')
	const { errors, validate } = useFormValidation<EatingRecordType>((entity, errors) => {
		if (!entity.date) {
			errors.set('date', 'A data é um campo obrigatório')
		}
		if (!entity.shift) {
			errors.set('shift', 'O turno é um campo obrigatório')
		}
		if (!entity.food || entity.food.trim() === '') {
			errors.set('food', 'O alimento é um campo obrigatório')
		}
	})
	const formRecord = useFormLayout<EatingRecordType>({
		fields: [
			{
				id: 'date',
				label: 'Data',
				type: 'date',
			},
			{
				id: 'shift',
				idModifier: (row) => row,
				label: 'Turno',
				nullable: true,
				nullableLabel: '',
				type: 'select',
				options: Shift,
				valueModifier: (row) => row,
			},
			{
				id: 'food',
				label: 'Alimento',
			},
			{
				id: 'amount',
				label: 'Quantidade',
				type: 'number',
			},
			{
				id: 'measureUnit',
				label: 'Unidade de Medida',
				type: 'select',
				options: [
					{
						id: 'kg',
						label: 'Quilos (kg)',
					},
					{
						id: 'g',
						label: 'Gramas (g)',
					},
					{
						id: 'l',
						label: 'Litros (l)',
					},
					{
						id: 'ml',
						label: 'Mililitros (ml)',
					},
					{
						id: 'un',
						label: 'Unidades (un)',
					},
				],
			},
		],
		value: modal,
		onChange: update,
		formValidation: errors,
	})

	return (
		<Modal
			header="Registro de Alimentação"
			onClose={() => {
				close()
			}}
			buttons={[
				{
					children: 'Duplicar',
					disabled: !modal.id,
					leftIcon: 'copy_all',
					onClick: () => {
						showQuestion(
							'Deseja realmente duplicar este registro?',
							'Você devera salvar o registro para efetivar.',
							() => {
								update({
									...modal,
									id: undefined,
									shift: undefined,
								})
							}
						)
					},
					variation: 'secondary',
				},
				{
					children: 'Excluir',
					disabled: !modal.id,
					leftIcon: 'delete',
					onClick: () => {
						showQuestion(
							'Deseja realmente excluir esse registro de alimentação?',
							'',
							() => {
								remove(modal?.id || '', () => {
									close()
								})
							}
						)
					},
					variation: 'secondary',
				},
				{
					children: 'Salvar',
					leftIcon: 'save',
					onClick: () => {
						if (!validate(modal)) {
							return
						}
						save(modal, () => {
							close()
						})
					},
				},
			]}
		>
			<FormDesign>
				<GroupWithLabel label="Período">
					<div data-row>
						{formRecord.date}
						{formRecord.shift}
					</div>
				</GroupWithLabel>
				<GroupWithLabel label="Alimento">
					{formRecord.food}
					<div data-row>
						{formRecord.amount}
						{formRecord.measureUnit as unknown as string}
					</div>
				</GroupWithLabel>
			</FormDesign>
		</Modal>
	)
}
