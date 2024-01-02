import { useFormLayoutDefinitionType } from '../hooks/useFormLayout'
import { ButtonGhost } from '../components/Button'
import React from 'react'
import { CustomerType, ProductType } from '../types/AllTypes'
import { StringUtils } from '../utils/StringUtils'
import { UserPicture } from '../components/UserPicture'
import style from '../pages/private/ProductPage.module.scss'
import { ProductStatus } from '../constants/ProductStatus'
import { SortUtils } from '../utils/SortUtils'

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
			size: '320px',
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
			label: 'Vendedor',
			type: 'select',
			options: (customerData || []).sort((x, y) => SortUtils.sort(x, y, 'full_name')),
			idModifier: (value: CustomerType) => value._id,
			valueRender: (x: CustomerType) => (
				<div className={style.selectValueRender}>
					<UserPicture size="28px" picture={x.picture} name={x.full_name} />
					<p>{x.full_name}</p>
				</div>
			),
			numberOfOptions: 3,
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
			label: 'Categorias',
			type: 'labels',
			labelsValueType: 'string',
		},
		price: {
			label: 'Preço',
			type: 'currency',
			leftSide: <ButtonGhost leftIcon="price_check" disabled={true} />,
		},
	}
}
