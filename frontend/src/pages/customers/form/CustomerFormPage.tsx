import React, { useContext, useEffect, useState } from 'react'
import style from '../../Page.module.scss'
import { useData } from '../../../hooks/useData'
import { Address, Customer } from '../../../types/Entities.type'
import { useForm } from '../../../hooks/useForm'
import { InputGroup } from '../../../components/input/InputGroup'
import { useNavigate, useParams } from 'react-router-dom'
import { useDatabase } from '../../../hooks/useDatabase'
import { ConfigContext } from '../../../contexts/ConfigContext'
import { Button } from '../../../components/button/Button'
import { useMessage } from '../../../hooks/useMessage'
import { StickyButtonGroup } from '../../../components/button/StickyButtonGroup'
import { DivRow } from '../../../components/DivRow'

export const CustomerFormPage = () => {
	const { status } = useContext(ConfigContext)
	const { showQuestion } = useMessage()
	const { customerId } = useParams()
	const customerDatabase = useDatabase<Customer>('customer')
	const [loaded, setLoaded] = useState<boolean>(false)
	const formData = useData<Customer>('customerForm', {
		name: 'Novo Cliente',
		active: true,
	})
	const { fields, validate } = useForm<Customer>({
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
					[null, 'Não selecionado'],
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
				options: [null, 'RG', 'CPF', 'CNPJ'],
				idModifier: (row) => row,
				labelModifier: (row) => row,
				valueModifier: (row) => row,
			},
			documentNumber: {
				label: 'Número do Documento',
				type: 'text',
			},
			active: {
				label: 'Ativo',
				type: 'toggle',
			},
		},
		value: formData.data,
		onChange: formData.setData,
		validate: (value, errors) => {
			if (!value) {
				value = {}
			}
			if (!value.name) {
				errors.set('name', 'Nome não informado')
			}
			if (!value.email) {
				errors.set('email', 'E-mail não informado')
			}
			if (!value.phone) {
				errors.set('phone', 'Telefone não informado')
			}
			if (!value.personType) {
				errors.set('personType', 'Tipo de pessoa não informado')
			}
			if (!value.documentType) {
				errors.set('documentType', 'Tipo de documento não informado')
			}
			if (!value.documentNumber) {
				errors.set('documentNumber', 'Número do documento não informado')
			}
		},
	})
	const { fields: addressFields, validate: validateAddress } = useForm<Address>({
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
		validate: (value, errors) => {
			if (!value) {
				value = {}
			}
			if (!value.streetName) {
				errors.set('streetName', 'Nome da rua não informado')
			}
			if (!value.streetNumber) {
				errors.set('streetNumber', 'Número da rua não informado')
			}
			if (!value.streetName) {
				errors.set('streetName', 'Nome da rua não informado')
			}
			if (!value.zipCode) {
				errors.set('zipCode', 'CEP não informado')
			}
		},
	})
	const navigate = useNavigate()

	useEffect(() => {
		if (!loaded && status.database) {
			setLoaded(true)
			if (customerId) {
				const find = customerDatabase.findById(parseFloat('0.' + customerId))
				if (find) {
					formData.setData(find)
				} else {
					navigate('/customers')
				}
			}
		}
	}, [loaded, status])

	return (
		<div className={style.page}>
			<DivRow style={{ alignItems: 'center' }}>
				<Button
					leftIcon="arrow_back"
					onClick={() => {
						navigate('/customers')
					}}
					variation="secondary"
				/>
				<h1>Formulário de Cliente</h1>
			</DivRow>
			<InputGroup
				icon="photo"
				title="Foto do Cliente"
				subTitle="Foto para ajudar a identificar este cliente na hora de criar um orçamento ou emitir um relatório."
			>
				{fields.picture}
			</InputGroup>
			<InputGroup
				icon="person"
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
				icon="description"
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
				icon="map"
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
				icon="checklist"
				title="Indicadores"
				subTitle="Flags usadas para indicar a situação deste cliente"
			>
				{fields.active}
			</InputGroup>
			<StickyButtonGroup>
				<Button
					leftIcon="save"
					variation="primary"
					onClick={() => {
						if (formData.data.active === true) {
							const validate1 = validate(formData.data)
							const validate2 = validateAddress(formData.data.address || null)
							if (!validate1 || !validate2) {
								return
							}
						}
						if (!formData.data?.id) {
							customerDatabase.create(formData.data)
						} else {
							customerDatabase.update(formData.data?.id, formData.data)
						}
						formData.setData(null)
						navigate('/customers')
					}}
				>
					Salvar
				</Button>
				{formData.data?.id && (
					<Button
						leftIcon="delete"
						variation="secondary"
						onClick={() => {
							showQuestion(
								'Deseja realmente excluir este cliente?',
								'Esta operação não podera ser revertida.',
								() => {
									customerDatabase.remove(formData.data?.id as number)
									formData.setData(null)
									navigate('/customers')
								}
							)
						}}
					>
						Excluir
					</Button>
				)}
				{!formData.data?.id && (
					<Button
						leftIcon="close"
						onClick={() => {
							navigate('/customers')
						}}
						variation="secondary"
					>
						Cancelar
					</Button>
				)}
			</StickyButtonGroup>
		</div>
	)
}
