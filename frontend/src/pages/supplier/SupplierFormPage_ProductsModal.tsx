import React from 'react'
import { Table } from '../../components/Table'
import { ProductType, Supplier } from '../../types/Entities.type'
import { useDatabase } from '../../hooks/useDatabase'
import { useData } from '../../hooks/useData'
import { ButtonGroup } from '../../components/button/ButtonGroup'
import { Button } from '../../components/button/Button'
import { Modal } from '../../components/Modal'
import { useForm } from '../../hooks/useForm'
import { InputGroup } from '../../components/input/InputGroup'
import { useModal } from '../../hooks/useModal'
import { DivRow } from '../../components/DivRow'
import { useNavigate } from 'react-router-dom'

export const SupplierFormPage_ProductsModal = () => {
	const productData = useData<ProductType>('productForm')
	const productModal = useModal<ProductType>('supplierProduct')
	const productDatabase = useDatabase<ProductType>('product')
	const fields = useForm<ProductType>({
		definition: {
			picture: {
				image: true,
				type: 'file',
			},
			name: {
				label: 'Nome',
				placeholder: 'Ex: Casaco Grande',
				type: 'text',
			},
			description: {
				label: 'Descrição',
				placeholder:
					'Ex: Roupa de microfibra, tamanho G, com manga longa na cor azul e preto.',
				textArea: true,
				type: 'text',
			},
			price: {
				label: 'Preço',
				placeholder: 'Ex: 12,99',
				type: 'number',
			},
			categories: {
				label: 'Categorias (Separadas por virgula)',
				placeholder: 'Ex: Roupa, Inverno, Casual',
				type: 'text',
			},
		},
		value: productModal.modal,
		onChange: productModal.showModal,
	})
	const navigate = useNavigate()

	return (
		<Modal
			width={'1000px'}
			onClose={() => {
				productModal.showModal(null)
			}}
		>
			<h1>Formulário de Produto</h1>
			<InputGroup title="Imagem do Produto" subTitle="Uma foto para identificar o produto.">
				{fields.picture}
			</InputGroup>
			<InputGroup
				title="Detalhes do Produto"
				subTitle="Informações para identificar melhor o produto dentro do sistema."
			>
				{fields.name}
				{fields.description}
				<DivRow className="row">
					{fields.price}
					{fields.categories}
				</DivRow>
			</InputGroup>
			<ButtonGroup className="buttons" align="right">
				{productModal.modal?.id && (
					<Button leftIcon="delete" variation="ghost" onClick={() => {}}>
						Excluir
					</Button>
				)}
				{productModal.modal?.id && (
					<Button
						leftIcon="description"
						variation="ghost"
						onClick={() => {
							productData.setData(productModal.modal)
							productModal.showModal(null)
							navigate('/product/form')
						}}
					>
						Mais Detalhes
					</Button>
				)}
				<Button
					leftIcon="save"
					onClick={() => {
						if (productModal.modal?.id) {
							productDatabase.update(productModal.modal.id, productModal.modal)
						} else {
							productDatabase.create(productModal.modal)
						}
						productModal.showModal(null)
					}}
				>
					Salvar
				</Button>
			</ButtonGroup>
		</Modal>
	)
}
