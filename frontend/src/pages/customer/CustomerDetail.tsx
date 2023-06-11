import { FormLayout } from '../../components/FormLayout'
import React, { useContext, useEffect, useState } from 'react'
import { PageContext } from '../../context/PageContext'
import { useNavigate } from 'react-router-dom'
import { Path } from '../../components/Path'
import { Button } from '../../components/Button'
import style from './CustomerDetail.module.scss'
import { DatabaseContext } from '../../context/DatabaseContext'
import { PersonType } from '../../constants/PersonType'
import { Table } from '../../components/Table'
import { Modal } from '../../components/Modal'
import { AddressType } from '../../types/AddressType'
import { useFormValidation } from '../../hook/useFormValidation'
import { CustomerType } from '../../types/CustomerType'
import { ModalContext } from '../../context/ModalContext'

export const CustomerDetail = () => {
	const { save, remove } = useContext(DatabaseContext)
	const { showQuestion } = useContext(ModalContext)
	const { data, defineData } = useContext(PageContext)

	const navigate = useNavigate()
	const { errors, validate } = useFormValidation<CustomerType>((entity, errors) => {
		if (!entity?.fullName || entity.fullName.trim() === '') {
			errors.set('fullName', 'Nome completo é obrigatório')
		}
		if (!entity?.birthday) {
			errors.set('birthday', 'Aniversário é obrigatório')
		}
		if (!entity?.email || entity.email.trim() === '') {
			errors.set('email', 'E-mail é obrigatório')
		}
		if (!entity?.cpfCnpj || entity.cpfCnpj.trim() === '') {
			errors.set('cpfCnpj', 'CPF/CNPJ é obrigatório')
		}
		if (!entity?.type) {
			errors.set('type', 'Tipo de pessoa é obrigatório')
		}
		if (entity?.cpfCnpj) {
			if (entity?.type === 'PF' && entity?.cpfCnpj.length !== 11) {
				errors.set('cpfCnpj', 'CPF deve ter 11 dígitos')
			}
			if (entity?.type === 'PJ' && entity?.cpfCnpj.length !== 14) {
				errors.set('cpfCnpj', 'CNPJ deve ter 14 dígitos')
			}
		}
	})
	const {
		errors: addressErrors,
		validate: addressValidate,
		reset: addressReset,
	} = useFormValidation<AddressType>((entity, errors) => {
		if (!entity?.name || entity.name.trim() === '') {
			errors.set('name', 'Nome descritivo é obrigatório')
		}
		if (!entity?.zipCode || entity.zipCode.trim() === '') {
			errors.set('zipCode', 'CEP é obrigatório')
		}
		if (entity?.zipCode && entity.zipCode.length !== 8) {
			errors.set('zipCode', 'CEP deve ter 8 números')
		}
		if (!entity?.street || entity.street.trim() === '') {
			errors.set('street', 'Rua é obrigatório')
		}
		if (!entity?.number || entity.number.trim() === '') {
			errors.set('number', 'Número é obrigatório')
		}
		if (!entity?.neighborhood || entity.neighborhood.trim() === '') {
			errors.set('neighborhood', 'Bairro é obrigatório')
		}
		if (!entity?.city || entity.city.trim() === '') {
			errors.set('city', 'Cidade é obrigatório')
		}
		if (!entity?.state || entity.state.trim() === '') {
			errors.set('state', 'Estado é obrigatório')
		}
		if (!entity?.country || entity.country.trim() === '') {
			errors.set('country', 'País é obrigatório')
		}
	})

	const [address, setAddress] = useState<AddressType | null>()

	const entity = data.customer.detail

	useEffect(() => {
		if (!entity) {
			navigate('/customer')
		}
	}, [entity])

	return (
		<div className={style.customerDetail}>
			<Path
				paths={[
					{
						name: 'Clientes',
						onClick: () => {
							navigate('/customer')
						},
					},
					{
						name: 'Detalhes',
					},
					entity?.id
						? {
								name: entity.fullName,
						  }
						: {
								name: 'Novo Cliente',
						  },
				]}
			/>
			<h1>{entity?.fullName}</h1>
			<FormLayout
				fields={[
					{
						id: 'picture',
						type: 'image',
						label: 'Imagem de Usuário',
						enableRepositioning: true,
					},
					{
						id: 'fullName',
						label: 'Nome Completo',
					},
					{
						id: 'type',
						type: 'select',
						label: 'Tipo de Pessoa',
						options: Object.keys(PersonType).map((x) => x),
						idModifier: (row) => row,
						valueModifier: (row) => PersonType[row],
					},
					{
						id: 'cpfCnpj',
						label: entity?.type === 'PF' ? 'CPF' : 'CNPJ',
					},
					{
						id: 'birthday',
						label: 'Aniversário',
						type: 'date',
					},
					{
						id: 'email',
						label: 'E-mail',
					},
				]}
				formValidation={errors}
				value={entity}
				onChange={(value) => {
					defineData('customer', 'detail', value)
				}}
			>
				{(fields) => (
					<>
						{fields.picture}
						<div data-row>
							{fields.fullName}
							{fields.type}
						</div>
						<div data-row>
							{fields.cpfCnpj}
							{fields.birthday}
						</div>
						{fields.email}
					</>
				)}
			</FormLayout>
			<h3>Endereços</h3>
			<div className={style.buttons}>
				<Button
					leftIcon="add"
					onClick={() => {
						addressReset()
						setAddress({})
					}}
				>
					Novo Endereço
				</Button>
			</div>
			<Table
				definition={[
					{
						field: 'name',
						label: 'Nome',
					},
					{
						field: 'street',
						label: 'Rua',
					},
					{
						field: 'number',
						label: 'Número',
					},
					{
						field: 'neighborhood',
						label: 'Bairro',
					},
					{
						field: 'city',
						label: 'Cidade',
					},
					{
						field: 'phoneNumber',
						label: 'Telefone',
					},
				]}
				value={entity?.addresses || []}
				noDataFoundLabel="Nenhum endereço cadastrado"
				onClick={(row, rowIndex) => {
					addressReset()
					setAddress({ ...row, index: rowIndex })
				}}
			/>
			<div className={style.buttons}>
				<Button
					leftIcon="save"
					onClick={() => {
						if (!validate(entity as CustomerType)) {
							return
						}
						save({
							entity: 'customer',
							value: { ...entity },
							success: () => {
								navigate('/customer')
							},
						})
					}}
				>
					Salvar
				</Button>
				<Button
					leftIcon="delete"
					variation="secondary"
					onClick={() => {
						showQuestion(
							'Deseja realmente excluir este cliente?',
							'Esta operação não pode ser desfeita',
							() => {
								remove({
									entity: 'customer',
									id: entity?.id || '',
									success: () => {
										navigate('/customer')
									},
								})
							}
						)
					}}
				>
					Excluir
				</Button>
			</div>
			{address && (
				<Modal
					header="Formulário de Endereço"
					onClose={() => {
						setAddress(null)
					}}
					buttons={[
						{
							children: 'Salvar',
							leftIcon: 'save',
							onClick: () => {
								if (!addressValidate(address)) {
									return
								}
								if (entity) {
									if (!entity?.addresses) {
										entity.addresses = []
									}
									if (address?.index !== undefined) {
										entity.addresses[address.index] = {
											...address,
											index: undefined,
										}
									} else {
										entity.addresses.push({
											...address,
											index: undefined,
										})
									}
									defineData('customer', 'detail', entity)
									setAddress(null)
								}
							},
						},
						{
							children: 'Excluir',
							leftIcon: 'delete',
							variation: 'secondary',
							onClick: () => {
								showQuestion(
									'Deseja realmente excluir este endereço?',
									'Para efetivar a exclusão você precisa salvar o cliente.',
									() => {
										if (entity) {
											if (address?.index !== undefined && entity?.addresses) {
												entity.addresses.splice(address.index, 1)
											}
											defineData('customer', 'detail', entity)
											setAddress(null)
										}
									}
								)
							},
						},
					]}
				>
					<FormLayout
						fields={[
							{
								id: 'name',
								label: 'Nome Descritivo',
							},
							{
								id: 'zipCode',
								label: 'CEP',
								type: 'number',
							},
							{
								id: 'street',
								label: 'Rua',
							},
							{
								id: 'number',
								label: 'Número',
							},
							{
								id: 'complement',
								label: 'Complemento',
							},
							{
								id: 'neighborhood',
								label: 'Bairro',
							},
							{
								id: 'city',
								label: 'Cidade',
							},
							{
								id: 'state',
								label: 'Estado',
							},
							{
								id: 'country',
								label: 'País',
							},
							{
								id: 'phoneNumber',
								label: 'Telefone',
							},
						]}
						value={address}
						formValidation={addressErrors}
						onChange={setAddress}
					>
						{(fields) => (
							<>
								{fields.name}
								{fields.zipCode}
								<div data-row>
									{fields.street}
									{fields.number}
								</div>
								{fields.neighborhood}
								{fields.complement}
								<div data-row>
									{fields.city}
									{fields.state}
									{fields.country}
								</div>
								{fields.phoneNumber}
							</>
						)}
					</FormLayout>
				</Modal>
			)}
		</div>
	)
}
