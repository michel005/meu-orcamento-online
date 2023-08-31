import { Button } from '../../components/button/Button'
import React from 'react'
import { useData } from '../../hooks/useData'
import { ProductType } from '../../types/Entities.type'
import { useNavigate } from 'react-router-dom'

export const ProductSidebar = () => {
	const productData = useData<ProductType>('productForm')
	const navigate = useNavigate()

	return (
		<>
			<Button
				leftIcon="add"
				variation="sidebar"
				onClick={() => {
					productData.setData({})
					navigate('/product/form')
				}}
			>
				Novo Produto
			</Button>
		</>
	)
}
