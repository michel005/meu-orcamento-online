import React from 'react'
import style from './ProductForm.module.scss'
import { useFormLayout } from '../hook/useFormLayout'
import { ProductType } from '../types/ProductType'
import { FormType } from './FormType'

export const ProductForm = ({ entity, onChange }: FormType<ProductType>) => {
	const fields = useFormLayout<ProductType>({
		fields: [
			{
				className: style.productImage,
				id: 'picture',
				type: 'image',
				enableRepositioning: true,
				style: {
					width: '300px',
				},
			},
			{
				id: 'name',
				label: 'Nome',
				placeholder: 'Nome do produto',
			},
			{
				id: 'description',
				label: 'Descrição',
				placeholder: 'Texto descritivo sobre o produto',
				textArea: true,
			},
			{
				id: 'group',
				label: 'Grupo',
				placeholder: 'Grupo principal',
			},
			{
				id: 'subGroup',
				label: 'Sub Grupo',
				placeholder: 'Sub grupo para categorização',
			},
		],
		value: entity || {},
		onChange: onChange,
	})

	return (
		<>
			{fields.picture}
			{fields.name}
			{fields.description}
			<div className={style.row}>
				{fields.group}
				{fields.subGroup}
			</div>
		</>
	)
}
