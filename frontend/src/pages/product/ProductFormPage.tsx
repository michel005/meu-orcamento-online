import React, { useContext } from 'react'
import { ProductFormPageStyle } from './ProductFormPage.style'
import { useForm } from '../../hooks/useForm'
import { ProductType, Supplier } from '../../types/Entities.type'
import { useData } from '../../hooks/useData'
import { InputGroup } from '../../components/input/InputGroup'
import { DivRow } from '../../components/DivRow'
import { ButtonGroup } from '../../components/button/ButtonGroup'
import { Button } from '../../components/button/Button'
import { useNavigate } from 'react-router-dom'
import { useDatabase } from '../../hooks/useDatabase'
import { ConfigContext } from '../../contexts/ConfigContext'
import { DivColumn } from '../../components/DivColumn'

export const ProductFormPage = () => {
	const { status } = useContext(ConfigContext)
	const productData = useData<ProductType>('productForm')
	const productDatabase = useDatabase<ProductType>('product')
	const supplierDatabase = useDatabase<Supplier>('supplier')
	const supplierData = useData<Supplier>('supplier')
	const supplierTabData = useData<string>('supplier_tab', 'Info')
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
		value: productData.data,
		onChange: productData.setData,
	})
	const navigate = useNavigate()

	if (!status.data) return <></>
	const supplier = supplierDatabase.findById(productData?.data?.supplierId)

	return (
		<ProductFormPageStyle>
			<header>
				<h1>Formulário de Produto</h1>
				{!supplier && (
					<p>
						Este produto sera cadastrado como pertencente a seu próprio bazar. Isso
						significa que ele não tera divisão de porcentagem de venda após a mesma ser
						concretizada.
					</p>
				)}
			</header>
			<ButtonGroup>
				<Button
					leftIcon="save"
					onClick={() => {
						if (productData.data?.id) {
							productDatabase.update(productData.data.id, productData.data)
						} else {
							productDatabase.create(productData.data)
						}
						productData.setData(null)
						navigate('/product')
					}}
				>
					Salvar
				</Button>
				{productData.data?.id && (
					<Button leftIcon="delete" variation="ghost" onClick={() => {}}>
						Excluir
					</Button>
				)}
			</ButtonGroup>
			{supplier && (
				<InputGroup title="Fornecedor" subTitle="Dados do fornecedor.">
					<DivRow className="supplierInfo">
						<img src={supplier?.picture?.base64} />
						<header>
							<a
								onClick={() => {
									supplierTabData.setData('Info')
									supplierData.setData(supplier || null)
									navigate('/supplier/form')
								}}
							>
								<h1>{supplier?.name}</h1>
							</a>
							<small>{supplier?.email}</small>
							<small>{supplier?.phone}</small>
						</header>
					</DivRow>
				</InputGroup>
			)}
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
		</ProductFormPageStyle>
	)
}
