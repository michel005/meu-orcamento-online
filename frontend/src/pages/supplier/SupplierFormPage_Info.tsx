import { ButtonGroup } from '../../components/button/ButtonGroup'
import { Button } from '../../components/button/Button'
import { InputGroup } from '../../components/input/InputGroup'
import { DivRow } from '../../components/DivRow'
import React from 'react'
import { useValidation } from '../../hooks/useValidation'
import { AddressType, Supplier } from '../../types/Entities.type'
import { useForm } from '../../hooks/useForm'
import { useDatabase } from '../../hooks/useDatabase'
import { useData } from '../../hooks/useData'
import { useMessage } from '../../hooks/useMessage'
import { useNavigate } from 'react-router-dom'

export const SupplierFormPage_Info = () => {
	const { showQuestion } = useMessage()
	const supplierDatabase = useDatabase<Supplier>('supplier')
	const supplierData = useData<Supplier>('supplier')
	const validation = useValidation<Supplier>((value, errors) => {
		if (!value?.picture) {
			errors.set('picture', 'Não foi selecionada uma imagem para o fornecedor')
		}
		if (!value?.name || value?.name.trim() === '') {
			errors.set('name', 'O nome completo deve ser informado')
		}
		if (!value?.email || value?.email.trim() === '') {
			errors.set('email', 'O e-mail deve ser informado')
		}
		if (!value?.id && !value?.active) {
			errors.set('active', 'O fornecedor não pode ser cadastrado inativo')
		}
	})
	const fields = useForm<Supplier>({
		definition: {
			picture: {
				image: true,
				type: 'file',
			},
			name: {
				label: 'Nome Completo',
				type: 'text',
				placeholder: 'Ex: João da Silva',
			},
			email: {
				label: 'E-mail',
				type: 'text',
				placeholder: 'Ex: email@example.com',
			},
			phone: {
				label: 'Telefone',
				type: 'text',
				placeholder: 'Ex: (99) 99999-9999',
			},
			active: {
				disabled: !supplierData.data?.id,
				label: 'Ativo',
				type: 'toggle',
			},
		},
		value: supplierData.data,
		onChange: supplierData.setData,
		errors: validation.errors,
	})
	const addressFields = useForm<AddressType>({
		definition: {
			zipCode: {
				label: 'CEP',
				type: 'text',
			},
			street: {
				label: 'Rua',
				type: 'text',
			},
			number: {
				label: 'Número',
				type: 'text',
			},
			complement: {
				label: 'Complemento',
				type: 'text',
				textArea: true,
			},
			city: {
				label: 'Cidade',
				type: 'text',
			},
			state: {
				label: 'Estado',
				type: 'text',
			},
			country: {
				label: 'País',
				type: 'text',
			},
		},
		value: supplierData.data?.address || {},
		onChange: (value) => supplierData.setDataProp('address', value),
	})
	const navigate = useNavigate()

	return (
		<>
			<ButtonGroup>
				<Button
					leftIcon="save"
					onClick={() => {
						if (!validation.validate(supplierData.data)) {
							return
						}
						if (supplierData.data?.id) {
							supplierDatabase.update(supplierData.data.id, supplierData.data)
						} else {
							supplierDatabase.create(supplierData.data)
						}
						supplierData.setData(null)
						navigate('/supplier')
					}}
				>
					Salvar
				</Button>
				{supplierData.data?.id && (
					<Button
						leftIcon="delete"
						onClick={() => {
							showQuestion(
								'Deseja realmente excluir este fornecedor?',
								'Esta operação não pode ser revertida.',
								() => {
									supplierDatabase.remove(supplierData.data.id)
									navigate('/supplier')
								}
							)
						}}
						variation="ghost"
					>
						Excluir
					</Button>
				)}
			</ButtonGroup>
			<InputGroup
				title="Imagem do Fornecedor"
				subTitle="Esta imagem permite que você identifique seu fornecedor de forma mais fácil"
			>
				{fields.picture as any}
			</InputGroup>
			<InputGroup
				title="Detalhes"
				subTitle="Estas informações ajudam a identificar este fornecedor."
			>
				{fields.name}
				<DivRow className="row">
					{fields.email}
					{fields.phone}
				</DivRow>
			</InputGroup>
			<InputGroup
				title="Endereço"
				subTitle="Saber onde seu fornecedor mora é extremamente importante para realizar cobranças e emitir nota fiscal."
			>
				<DivRow className="row">
					{addressFields.zipCode}
					{addressFields.street}
					{addressFields.number}
				</DivRow>
				{addressFields.complement}
				<DivRow className="row">
					{addressFields.city}
					{addressFields.state}
					{addressFields.country}
				</DivRow>
			</InputGroup>
			<InputGroup
				title="Controle de Estado"
				subTitle="Controle aqui alguns estados do seu fornecedor"
			>
				{fields.active}
			</InputGroup>
		</>
	)
}
