import { useFormLayoutDefinitionType } from '../hooks/useFormLayout'
import { Button, ButtonGhost } from '../components/Button'
import React from 'react'
import { ProductType } from '../types/AllTypes'
import { StringUtils } from '../utils/StringUtils'
import { v4 as uuid } from 'uuid'

export const ProductDefinition = (
	value: ProductType,
	setMessage,
	edit,
	customerData
): useFormLayoutDefinitionType => {
	return {
		picture: {
			label: 'Imagem do Cliente',
			leftSide: <ButtonGhost leftIcon="photo" disabled={true} />,
			type: 'file',
			placeholder: value?.name
				? StringUtils.initialLetters(value.name || '', 2).toUpperCase()
				: '',
			size: '200px',
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
		name: {
			label: 'Nome do Produto',
			leftSide: <ButtonGhost leftIcon="person" disabled={true} />,
		},
		description: {
			label: 'Descrição',
			leftSide: <ButtonGhost leftIcon="description" disabled={true} />,
		},
		customer_id: {
			label: 'Cliente',
			type: 'select',
			options: customerData.map((customer) => [customer._id, customer.name]),
			leftSide: <ButtonGhost leftIcon="person" disabled={true} />,
		},
		code: {
			label: 'Código do Produto',
			leftSide: <ButtonGhost leftIcon="code" disabled={true} />,
			rightSide: (
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<ButtonGhost
						leftIcon="refresh"
						onClick={() => {
							value.code = uuid()
							edit(value)
						}}
					/>
					<ButtonGhost
						leftIcon="qr_code"
						onClick={() => {
							setMessage({
								header: value.name,
								content: (
									<>
										<span dangerouslySetInnerHTML={{ __html: value.qrcode }} />
										<Button
											leftIcon="print"
											onClick={() => {
												var a = window.open()
												a.document.write(
													'<html><body style="width: 6cm; height: 6cm;">'
												)
												a.document.write(value.qrcode)
												a.document.write('</body></html>')
												a.document.close()
												a.print()
											}}
										>
											imprimir
										</Button>
									</>
								),
							})
						}}
					/>
				</div>
			),
		},
		categories: {
			label: 'Categorias (separadas por ponto e virgula)',
			leftSide: <ButtonGhost leftIcon="list" disabled={true} />,
		},
		hashtags: {
			label: 'Hashtags',
			leftSide: <ButtonGhost leftIcon="tag" disabled={true} />,
		},
		price: {
			label: 'Preço',
			type: 'currency',
			leftSide: <ButtonGhost leftIcon="price_check" disabled={true} />,
		},
	}
}
