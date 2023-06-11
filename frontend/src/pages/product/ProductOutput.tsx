import { FormLayout } from '../../components/FormLayout'
import React, { useContext, useEffect } from 'react'
import { PageContext } from '../../context/PageContext'
import { useNavigate } from 'react-router-dom'
import { Path } from '../../components/Path'
import { Button } from '../../components/Button'
import style from './ProductOutput.module.scss'
import { DatabaseContext } from '../../context/DatabaseContext'

export const ProductOutput = () => {
	const { save, remove } = useContext(DatabaseContext)
	const { data, defineData } = useContext(PageContext)

	const navigate = useNavigate()

	const entity = data.product.output

	useEffect(() => {
		if (!entity) {
			navigate('/product')
		}
	}, [entity])

	return (
		<div className={style.productOutput}>
			<Path
				paths={[
					{
						name: 'Produtos',
						onClick: () => {
							navigate('/product')
						},
					},
					{
						name: 'Saída',
					},
				]}
			/>
			<h1>Saída de Estoque</h1>
			<FormLayout
				fields={[
					{
						id: 'date',
						type: 'date',
						label: 'Data',
					},
				]}
				value={entity}
				onChange={(value) => {
					defineData('product', 'output', value)
				}}
			>
				{(fields) => <>{fields.date}</>}
			</FormLayout>
			<div className={style.buttons}>
				<Button
					leftIcon="save"
					onClick={() => {
						save({
							entity: 'productOutput',
							value: { ...entity },
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
							entity: 'productOutput',
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
