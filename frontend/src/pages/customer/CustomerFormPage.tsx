import React, { useContext } from 'react'
import { CustomerType } from '../../utils/CustomerType'
import { useDatabase } from '../../hook/useDatabase'
import { ButtonToolbar } from '../../components/ButtonToolbar'
import { Button } from '../../components/Button'
import { PersonType } from '../../constants/PersonType'
import { usePageData } from '../../hook/usePageData'
import { Path } from '../../components/Path'
import { useNavigate } from 'react-router-dom'
import { useFormValidation } from '../../hook/useFormValidation'
import { useFormLayout } from '../../hook/useFormLayout'
import { ModalContext } from '../../context/ModalContext'
import style from './CustomerFormPage.module.scss'
import { FormDesign } from '../../components/FormDesign'

export const CustomerFormPage = () => {
	const { save, remove } = useDatabase('customer')
	const { showQuestion } = useContext(ModalContext)
	const { data, updateData } = usePageData<CustomerType>('customer_form')
	const { errors, validate } = useFormValidation<CustomerType>((value, errors) => {
		if (!value.fullName || value.fullName.trim().length === 0) {
			errors.set('fullName', 'O nome completo é obrigatório')
		}
		if (!value.email || value.email.trim().length === 0) {
			errors.set('email', 'O e-mail é obrigatório')
		}
		if (!value.personType) {
			errors.set('personType', 'O tipo de pessoa é obrigatório')
		}
		if (!value.document || value.document.trim().length === 0) {
			errors.set('document', 'O CPF/CNPJ é obrigatório')
		}
	})
	const fields = useFormLayout<CustomerType>({
		fields: [
			{
				id: 'birthday',
				label: 'Data de Nascimento',
				type: 'date',
			},
			{
				id: 'profilePicture',
				label: 'Imagem de Usuário',
				type: 'image',
				enableRepositioning: true,
			},
			{
				id: 'fullName',
				label: 'Nome Completo',
			},
			{
				id: 'email',
				label: 'E-mail',
			},
			{
				id: 'personType',
				label: 'Tipo de Pessoa',
				type: 'select',
				options: [null, 'PF', 'PJ'],
				idModifier: (x) => x,
				valueModifier: (x) => PersonType[x],
			},
			{
				id: 'document',
				label: 'CPF/CNPJ',
			},
			{
				id: 'active',
				type: 'checkbox',
				label: 'Ativo',
			},
		],
		value: data,
		onChange: (value) => updateData(value),
		formValidation: errors,
	})

	const navigate = useNavigate()

	if (!data) {
		navigate('/customer')
	}

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
							name: !data?.id ? 'Cadastrar' : data.fullName,
						},
					]}
				/>
				<div style={{ flexGrow: 1 }} />
				{data?.id && (
					<Button
						leftIcon="delete"
						onClick={() => {
							showQuestion('Deseja realmente excluir este cliente?', '', () => {
								remove(data?.id || '', () => {
									navigate('/customer')
								})
							})
						}}
						variation="secondary"
					>
						Excluir
					</Button>
				)}
				<Button
					leftIcon="save"
					onClick={() => {
						if (!validate({ ...data })) {
							return
						}
						save({ ...data }, () => {
							navigate('/customer')
						})
					}}
				>
					Salvar
				</Button>
			</ButtonToolbar>
			<FormDesign>
				<div data-label="Foto Principal">{fields.profilePicture}</div>
				<div data-label="Dados do Cliente">
					{fields.fullName}
					{fields.personType}
					{fields.document}
					{fields.email}
					{fields.birthday}
				</div>
				<div data-label="Ajustes">{fields.active}</div>
			</FormDesign>
		</>
	)
}
