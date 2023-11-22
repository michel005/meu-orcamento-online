import { useFormLayoutDefinitionType } from '../hooks/useFormLayout'
import { ButtonGhost } from '../components/Button'
import React from 'react'
import { CustomerType, ProductType } from '../types/AllTypes'
import { StringUtils } from '../utils/StringUtils'
import { UserPicture } from '../components/UserPicture'
import style from '../pages/private/ProductPage.module.scss'
import { ProductStatus } from '../constants/ProductStatus'

export const ProductDefinition = (
	value?: ProductType,
	customerData?: CustomerType[]
): useFormLayoutDefinitionType => {
	return {
		picture: {
			label: 'Imagem do Cliente',
			leftSide: <ButtonGhost leftIcon="photo" disabled={true} />,
			type: 'file',
			placeholder: value?.title
				? StringUtils.initialLetters(value.title || '').toUpperCase()
				: '',
			pictureType: 'square',
			size: '220px',
		},
		created: {
			label: 'Cadastrado',
			leftSide: <ButtonGhost leftIcon="calendar_month" disabled={true} />,
			disabled: true,
		},
		updated: {
			label: 'Ultima Alteração',
			leftSide: <ButtonGhost leftIcon="calendar_month" disabled={true} />,
			disabled: true,
		},
		title: {
			label: 'Nome do Produto',
			leftSide: <ButtonGhost leftIcon="person" disabled={true} />,
		},
		description: {
			label: 'Descrição',
			leftSide: <ButtonGhost leftIcon="description" disabled={true} />,
		},
		seller_id: {
			label: 'Cliente',
			type: 'select',
			options: customerData,
			idModifier: (value: CustomerType) => value.id,
			valueRender: (x: CustomerType) => (
				<div className={style.selectValueRender}>
					<UserPicture size="28px" picture={x.picture} name={x.full_name} />
					<p>{x.full_name}</p>
				</div>
			),
			optionValueRender: (x: CustomerType) => (
				<div className={style.selectValueRender}>
					<UserPicture size="36px" picture={x.picture} name={x.full_name} />
					<div className={style.nameAndEmail}>
						<b>{x.full_name}</b>
						<p>{x.email}</p>
					</div>
				</div>
			),
		},
		status: {
			label: 'Situação',
			type: 'select',
			options: Object.keys(ProductStatus).map((status) => [status, ProductStatus[status]]),
			idModifier: (value: any) => value[0],
			valueRender: (value: any) => value[1],
		},
		code: {
			label: 'Código do Produto',
			leftSide: <ButtonGhost leftIcon="code" disabled={true} />,
		},
		categories: {
			label: 'Categorias (separadas por ponto e virgula)',
			leftSide: <ButtonGhost leftIcon="list" disabled={true} />,
		},
		price: {
			label: 'Preço',
			type: 'currency',
			leftSide: <ButtonGhost leftIcon="price_check" disabled={true} />,
		},
	}
}
