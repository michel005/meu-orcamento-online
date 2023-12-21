import React, { useRef } from 'react'
import { Button, ButtonGhost } from '../../../components/Button'
import { usePage } from '../../../hooks/usePage'
import { createPortal } from 'react-dom'

export const ImportCustomerButton = ({ onClose }) => {
	const { form } = usePage('customer')
	const importRef = useRef(null)

	return (
		<>
			<Button
				leftIcon="download"
				style={{ flexGrow: 0 }}
				onClick={() => {
					importRef.current.click()
				}}
				title="Importar cliente"
			>
				Importar
			</Button>
			{createPortal(
				<input
					style={{ display: 'none' }}
					type="file"
					ref={importRef}
					onChange={(event) => {
						const file = event.target.files[0]

						if (file) {
							const reader = new FileReader()

							reader.onload = (e) => {
								const content = e.target.result
								const jsonValue = JSON.parse(String(content))
								form.show(
									{
										...jsonValue,
										id: undefined,
										picture: null,
										favorite: false,
										address_id: undefined,
										active: true,
									},
									onClose
								)
							}

							reader.readAsText(file)
						}
					}}
				/>,
				document.getElementById('root')
			)}
		</>
	)
}
