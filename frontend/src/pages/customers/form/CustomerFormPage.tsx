import React, { useEffect } from 'react'
import style from './CustomerFormPage.module.scss'
import { useData } from '../../../hooks/useData'
import { Address, Customer } from '../../../types/Entities.type'
import { useForm } from '../../../hooks/useForm'
import { InputGroup } from '../../../components/input/InputGroup'
import { useNavigate } from 'react-router-dom'

export const CustomerFormPage = () => {
	const formData = useData<Customer | null>('customerForm', null)
	const fields = useForm<Customer>({
		definition: {
			picture: {
				type: 'file',
				image: true,
			},
			name: {
				label: 'Nome Completo',
				type: 'text',
			},
			email: {
				label: 'E-mail',
				type: 'text',
			},
			phone: {
				label: 'Telefone',
				type: 'text',
			},
			personType: {
				label: 'Tipo de Pessoa',
				type: 'select',
				options: [
					['PF', 'Pessoa Física'],
					['PJ', 'Pessoa Jurídica'],
				],
				idModifier: (row) => row[0],
				labelModifier: (row) => row[1],
				valueModifier: (row) => row[0],
			},
			documentType: {
				label: 'Tipo de Documento',
				type: 'select',
				options: ['RG', 'CPF', 'CNPJ'],
				idModifier: (row) => row,
				labelModifier: (row) => row,
				valueModifier: (row) => row,
			},
			documentNumber: {
				label: 'Número do Documento',
				type: 'text',
			},
			created: {
				label: 'Cadastrado',
				type: 'text',
				disabled: true,
			},
			updated: {
				label: 'Alterado',
				type: 'text',
				disabled: true,
			},
		},
		value: formData.data,
		onChange: formData.setData,
	})

	const addressFields = useForm<Address>({
		definition: {
			streetName: {
				label: 'Nome da Rua',
				type: 'text',
			},
			streetNumber: {
				label: 'Número',
				type: 'text',
			},
			complement: {
				label: 'Complemento',
				type: 'text',
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
			zipCode: {
				label: 'CEP',
				type: 'text',
			},
		},
		value: (formData.data?.address || {}) as any | null,
		onChange: (value) => formData.setDataProp('address', value),
	})
	const navigate = useNavigate()

	useEffect(() => {
		if (!formData.data) {
			navigate('/customers')
		}
	}, [formData.data])

	return (
		<div className={style.customerFormPage}>
			<InputGroup
				title="Foto do Cliente"
				subTitle="Foto para ajudar a identificar este cliente na hora de criar um orçamento ou emitir um relatório."
			>
				{fields.picture}
			</InputGroup>
			<InputGroup
				title="Dados Principais"
				subTitle="Estas são as informações principais na hora de identificar seu cliente e também importantes para enviar propostas e se comunicar com ele."
			>
				{fields.name}
				<div className={'row'}>
					{fields.email}
					{fields.phone}
				</div>
			</InputGroup>
			<InputGroup
				title="Documento"
				subTitle="Informe o documento do cliente, necessário para comprovar que este é de fato o cliente cadastrado."
			>
				{fields.personType}
				<div className={'row'}>
					{fields.documentType}
					{fields.documentNumber}
				</div>
			</InputGroup>
			<InputGroup
				title="Endereço"
				subTitle="Coloque aqui onde este cliente esta localizado. Assim você sabe para qual endereço pode enviar encomendas ou usar para a geração de nota fiscal."
			>
				<div className={'row'}>
					{addressFields.zipCode}
					{addressFields.streetName}
				</div>
				<div className={'row'}>
					{addressFields.streetNumber}
					{addressFields.complement}
				</div>
				<div className={'row'}>
					{addressFields.city}
					{addressFields.state}
					{addressFields.country}
				</div>
			</InputGroup>
			<InputGroup
				title="Informações Complementares"
				subTitle="Estas são informações registradas pelo sistema."
			>
				<div className={'row'}>
					{fields.created}
					{fields.updated}
				</div>
			</InputGroup>
		</div>
	)
}
