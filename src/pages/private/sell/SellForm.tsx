import React from 'react'
import style from './SellForm.module.scss'
import { FormModal } from '../../../components/FormModal'
import { usePage } from '../../../hooks/usePage'
import { ProductType } from '../../../types/AllTypes'
import { ProductDefinition } from '../../../definitions/ProductDefinition'
import { useFormLayout } from '../../../hooks/useFormLayout'
import { Button, ButtonGhost, ButtonSecondary, ButtonWhite } from '../../../components/Button'
import { Bag } from '../../../components/Bag'
import { ErrorUtils } from '../../../utils/ErrorUtils'
import { useApiData } from '../../../hooks/useApiData'
import { FlexRow } from '../../../components/FlexRow'
import { SellDefinition } from '../../../definitions/SellDefinition'

export const SellForm = () => {
	const { api, form } = usePage<ProductType>('sell', ProductDefinition)
	const customerApiData = useApiData('customer')
	const sellFormLayout = useFormLayout<ProductType>({
		definition: SellDefinition(customerApiData.data),
		value: form.form,
		onChange: form.edit,
	})

	const onSuccess = () => {
		form.close()
	}

	const onError = (errors: any) => {
		sellFormLayout.setErrors(ErrorUtils.convertErrors(errors.response.data || {}))
	}

	return (
		<FormModal
			title="Formulário de Venda"
			onClose={() => {
				form.close(false)
			}}
		>
			<div className={style.content}>
				<section>
					{sellFormLayout.getField('customer_id')}
					{sellFormLayout.getField('finalPrice')}
					{sellFormLayout.getField('status', {
						optionsPosition: 'top',
					})}
				</section>
			</div>
			<div className={style.options}>
				<Button
					leftIcon="save"
					onClick={() => {
						if (form.form?._id) {
							api.update({
								id: form.form._id,
								data: form.form,
								onSuccess,
								onError,
							})
						} else {
							api.create({
								data: form.form,
								onSuccess,
								onError,
							})
						}
					}}
				>
					Salvar
				</Button>
				{form.form._id && (
					<Bag
						button={(show, setShow) => (
							<ButtonSecondary
								leftIcon="delete"
								onClick={() => {
									setShow(true)
								}}
							>
								Excluir
							</ButtonSecondary>
						)}
						arrowPosition="bottom-left"
					>
						{(show, setShow) => (
							<>
								<p style={{ whiteSpace: 'nowrap' }}>Deseja realmente excluir?</p>
								<FlexRow style={{ justifyContent: 'flex-end' }}>
									<Button
										onClick={() => {
											setShow(false)
											api.remove({
												id: form.form?._id,
												onSuccess,
												onError,
											})
										}}
									>
										Sim
									</Button>
									<ButtonWhite
										onClick={() => {
											setShow(false)
										}}
									>
										Não
									</ButtonWhite>
								</FlexRow>
							</>
						)}
					</Bag>
				)}
			</div>
		</FormModal>
	)
}
