import React from 'react'
import style from './CustomerPage.module.scss'
import { CustomerType } from '../../utils/CustomerType'
import { useDatabase } from '../../hook/useDatabase'
import { Table } from '../../components/Table'
import { ButtonToolbar } from '../../components/ButtonToolbar'
import { Button } from '../../components/Button'
import { useModalData } from '../../hook/useModalData'
import { PersonType } from '../../constants/PersonType'
import { Label } from '../../components/Label'
import { Image } from '../../components/Image'
import { usePageData } from '../../hook/usePageData'
import { Path } from '../../components/Path'
import { useNavigate } from 'react-router-dom'

export const CustomerPage = () => {
	const { content } = useDatabase<CustomerType>('customer')
	const { data, updateData } = usePageData<{
		filters: Map<string, any>
	}>('customer', {
		filters: new Map([['active', true]]),
	})
	const { data: formData, updateData: formUpdateData } = usePageData<CustomerType | null>(
		'customer_form',
		null
	)

	const navigate = useNavigate()

	return (
		<>
			<ButtonToolbar align="right">
				<Path
					paths={[
						{
							icon: 'group',
							name: 'Clientes',
							onClick: () => {
								navigate('/customer')
							},
						},
						{
							name: 'Todos',
						},
					]}
				/>
				<div style={{ flexGrow: 1 }} />
				<Button
					leftIcon="person_add"
					onClick={() => {
						formUpdateData({
							active: true,
						})
						navigate('/customer/form')
					}}
				>
					Novo Cliente
				</Button>
			</ButtonToolbar>
			<Table
				initialSort={{
					field: 'fullName',
					direction: 'ASC',
				}}
				definition={[
					{
						headerIcon: 'person',
						className: style.fullName,
						field: 'fullName',
						label: 'Nome Completo',
						valueModifier: (customer: CustomerType) => (
							<div className={style.insideFullName}>
								{customer.profilePicture ? (
									<Image {...customer.profilePicture} />
								) : (
									<Button
										className={style.profilePictureFallback}
										leftIcon="person"
									/>
								)}
								<span>{customer.fullName}</span>
							</div>
						),
					},
					{
						headerIcon: 'card_membership',
						className: style.personType,
						field: 'personType',
						label: 'Tipo de Pessoa',
						valueModifier: (row) => (
							<div>
								<Label data-type={row?.personType}>
									{PersonType?.[row?.personType]}
								</Label>
							</div>
						),
						type: 'select',
						selectValues: new Map([
							['PF', 'Pessoa Física'],
							['PJ', 'Pessoa Jurídica'],
						]),
						width: '200px',
					},
					{
						field: 'birthday',
						headerIcon: 'calendar_today',
						label: 'Data de Nascimento',
						type: 'date',
					},
					{
						headerIcon: 'mail',
						field: 'email',
						label: 'E-mail',
						width: '300px',
					},
					{
						align: 'right',
						headerIcon: 'star',
						field: 'active',
						label: 'Situação',
						type: 'boolean',
						valueModifier: (row) => (row.active ? 'Ativo' : 'Inativo'),
					},
				]}
				onClick={(row) => {
					formUpdateData({ ...row })
					navigate('/customer/form')
				}}
				value={content}
				filters={data.filters}
				onChangeFilters={(value) => {
					updateData({
						...data,
						filters: value,
					})
				}}
			/>
		</>
	)
}
