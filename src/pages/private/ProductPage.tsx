import React, { useState } from 'react'
import style from './ProductPage.module.scss'
import { Button, ButtonWhite } from '../../components/Button'
import { useApi } from '../../hooks/useApi'

export const ProductPage = () => {
	const { data } = useApi('product')

	return (
		<div className={style.customerPage}>
			<div className={style.customerPageContent}>
				<div className={style.pageHeader}>
					<Button leftIcon="shopping_bag" onClick={() => {}}>
						Novo Produto
					</Button>
					<hr />
					<label className={style.faded}>{data.length} registro(s)</label>
					<div style={{ flexGrow: 1 }} />
					<hr />
					<Button leftIcon="refresh" onClick={() => {}} />
				</div>
				<div className={style.pageContent}></div>
			</div>
		</div>
	)
}
