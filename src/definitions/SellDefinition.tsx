import { useFormLayoutDefinitionType } from '../hooks/useFormLayout'
import { ButtonGhost } from '../components/Button'
import React from 'react'
import { CustomerType } from '../types/AllTypes'
import { UserPicture } from '../components/UserPicture'
import style from '../pages/private/ProductPage.module.scss'
import { SortUtils } from '../utils/SortUtils'
import { SellStatus } from '../constants/SellStatus'

export const SellDefinition = (customerData?: CustomerType[]): useFormLayoutDefinitionType => {
	return {
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
		customer_id: {
			label: 'Cliente',
			type: 'select',
			options: (customerData || []).sort((x, y) => SortUtils.sort(x, y, 'full_name')),
			idModifier: (value: CustomerType) => value._id,
			valueRender: (x: CustomerType) => (
				<div className={style.selectValueRender}>
					<UserPicture size="28px" picture={x.picture?.value} name={x.full_name} />
					<p>{x.full_name}</p>
				</div>
			),
			numberOfOptions: 3,
			optionValueRender: (x: CustomerType) => (
				<div className={style.selectValueRender}>
					<UserPicture size="36px" picture={x.picture?.value} name={x.full_name} />
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
			options: Object.keys(SellStatus).map((status) => [status, SellStatus[status]]),
			idModifier: (value: any) => value[0],
			valueRender: (value: any) => value[1],
		},
		finalPrice: {
			label: 'Preço Final',
			type: 'currency',
			leftSide: <ButtonGhost leftIcon="price_check" disabled={true} />,
		},
	}
}
