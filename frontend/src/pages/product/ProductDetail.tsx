import { FormLayout } from '../../components/FormLayout'
import React, { useContext, useEffect } from 'react'
import { PageContext } from '../../context/PageContext'
import { useNavigate } from 'react-router-dom'
import { Path } from '../../components/Path'
import { Button } from '../../components/Button'
import style from './ProductDetail.module.scss'
import { DatabaseContext } from '../../context/DatabaseContext'

export const ProductDetail = () => {
	const { save, remove } = useContext(DatabaseContext)
	const { data, defineData } = useContext(PageContext)

	const navigate = useNavigate()

	const entity = data.product.detail

	useEffect(() => {
		if (!entity) {
			navigate('/product')
		}
	}, [entity])

	return (
		<div className={style.productDetail}>
			<Path
				paths={[
					{
						name: 'Produtos',
						onClick: () => {
							navigate('/product')
						},
					},
					{
						name: 'Detalhes',
					},
					entity?.id
						? {
								name: entity.name,
						  }
						: {
								name: 'Novo Produto',
						  },
				]}
			/>
			<h1>{entity?.name}</h1>
			<FormLayout
				fields={[
					{
						id: 'name',
						label: 'Nome do Produto',
					},
					{
						id: 'description',
						label: 'Descrição',
					},
					{
						id: 'images',
						type: 'imageList',
						label: 'Imagem',
					},
					{
						id: 'currentAmount',
						type: 'number',
						label: 'Quantidade',
					},
					{
						id: 'price',
						label: 'Preço',
						type: 'number',
					},
				]}
				value={entity}
				onChange={(value) => {
					defineData('product', 'detail', value)
				}}
			>
				{(fields) => (
					<>
						{fields.images}
						{fields.name}
						{fields.description}
						{fields.currentAmount}
						{fields.price}
					</>
				)}
			</FormLayout>
			<div className={style.buttons}>
				<Button
					leftIcon="save"
					onClick={() => {
						save({
							entity: 'product',
							value: { ...entity, price: (entity?.price || 0) * 100 },
							success: () => {
								navigate('/product')
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
						remove({
							entity: 'product',
							id: entity?.id || '',
							success: () => {
								navigate('/product')
							},
						})
					}}
				>
					Excluir
				</Button>
			</div>
		</div>
	)
}
