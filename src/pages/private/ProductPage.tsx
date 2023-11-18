import React, { useEffect, useRef, useState } from 'react'
import style from './ProductPage.module.scss'
import { Button, ButtonGhost } from '../../components/Button'
import { usePage } from '../../hooks/usePage'
import { ProductType } from '../../types/AllTypes'
import { useApi } from '../../hooks/useApi'
import { SelectInput } from '../../components/inputs/SelectInput'
import { UserPicture } from '../../components/UserPicture'
import { ProductCard } from './products/ProductCard'
import { Bag } from '../../components/Bag'
import { NumberUtils } from '../../utils/NumberUtils'

export const ProductPage = () => {
	const { api, pageData } = usePage<ProductType>('product')
	const customerApi = useApi('customer')
	const ref = useRef(null)
	const [selectedCards, setSelectedCards] = useState([])

	const apiData = pageData.data.customer ? api.data || [] : []

	const allStatus = ['AVAILABLE', 'Reservado', 'Vendido', 'Devolvido']

	const refreshPage = () => {
		setSelectedCards([])
		api.getAll({ query: { customer_id: pageData.data.customer } })
		if (ref.current) {
			ref.current.scroll({
				top: 0,
				left: 0,
				behavior: 'smooth',
			})
		}
	}

	useEffect(() => {
		refreshPage()
	}, [pageData.data.customer])

	useEffect(() => {
		customerApi.getAll()
		refreshPage()
	}, [])

	return (
		<div className={style.productPage}>
			<div className={style.productPageContent} ref={ref}>
				<div className={style.pageHeader}>
					<SelectInput
						className={style.customerSelect}
						options={customerApi.data}
						idModifier={(x) => x.id}
						placeholder="Nenhum cliente selecionado"
						valueRender={(x) => (
							<div className={style.selectValueRender}>
								<UserPicture size="28px" picture={x.picture} name={x.full_name} />
								<p>{x.full_name}</p>
							</div>
						)}
						optionValueRender={(x) => (
							<div className={style.selectValueRender}>
								<UserPicture size="36px" picture={x.picture} name={x.full_name} />
								<div className={style.nameAndEmail}>
									<b>{x.full_name}</b>
									<p>{x.email}</p>
								</div>
							</div>
						)}
						value={pageData.data.customer}
						onChange={(value: any) => pageData.setProp('customer', () => value)}
					/>
					<Button
						leftIcon="refresh"
						disabled={!pageData.data.customer}
						onClick={refreshPage}
					/>
					<label className={style.faded}>{apiData.length} registro(s)</label>
					<div style={{ flexGrow: 1 }} />
					<Bag
						arrowPosition="top-right"
						button={(show, setShow) => (
							<Button
								className={style.selectionButton}
								variationOverride={selectedCards.length === 0 ? 'white' : undefined}
								leftIcon={
									selectedCards.length === 0
										? 'no_accounts'
										: show
										? 'keyboard_arrow_up'
										: 'keyboard_arrow_down'
								}
								leftBag={
									selectedCards.length > 0 ? selectedCards.length : undefined
								}
								rightBag={
									selectedCards.length === 0
										? undefined
										: NumberUtils.numberToCurrency(
												apiData
													.filter((x) => selectedCards.includes(x.id))
													.map((x) => x.price)
													.reduce((prev, current) => prev + current, 0)
										  )
								}
								onClick={() => {
									setShow((x) => !x)
								}}
							>
								{selectedCards.length > 0 ? 'Seleção' : 'Nada Selecionado'}
							</Button>
						)}
					>
						{(show, setShow) => (
							<>
								<ButtonGhost
									disabled={selectedCards.length === 0}
									leftIcon="assignment_return"
									onClick={() => {
										setShow(false)
									}}
								>
									Devolver
								</ButtonGhost>
								<ButtonGhost
									disabled={selectedCards.length === 0}
									leftIcon="shopping_bag"
									onClick={() => {
										setShow(false)
									}}
								>
									Vender
								</ButtonGhost>
								<ButtonGhost
									disabled={selectedCards.length === 0}
									leftIcon="lock_person"
									onClick={() => {
										setShow(false)
									}}
								>
									Reservar
								</ButtonGhost>
								<ButtonGhost
									disabled={selectedCards.length === 0}
									leftIcon="delete"
									onClick={() => {
										setShow(false)
									}}
								>
									Excluir
								</ButtonGhost>
								<hr />
								<ButtonGhost
									leftIcon="select_all"
									disabled={
										apiData.filter((x) => selectedCards.includes(x.id))
											.length === apiData.length
									}
									onClick={() => {
										setShow(false)
										setSelectedCards(apiData.map((x) => x.id))
									}}
								>
									Selecionar Todos
								</ButtonGhost>
								<ButtonGhost
									disabled={selectedCards.length === 0}
									leftIcon="clear_all"
									onClick={() => {
										setShow(false)
										setSelectedCards([])
									}}
								>
									Limpar Seleção
								</ButtonGhost>
							</>
						)}
					</Bag>
					<hr />
					<Button leftIcon="add" disabled={!pageData.data.customer}>
						Novo Produto
					</Button>
				</div>
				{!pageData.data.customer && (
					<div className={style.selectCustomer}>
						<h1>Selecione um cliente para mostrar seus produtos</h1>
						<p></p>
					</div>
				)}
				{pageData.data.customer && apiData.length === 0 && (
					<div className={style.selectCustomer}>
						<h1>Nenhum produto cadastrado para este cliente</h1>
						<p></p>
					</div>
				)}
				{pageData.data.customer &&
					allStatus
						.filter((x) => apiData.filter((a) => a.status === x).length > 0)
						.map((status) => {
							const allIdsForThisStatus = apiData
								.filter((x) => x.status === status)
								.map((x) => x.id)
							const sumOfPrices = apiData
								.filter((x) => x.status === status)
								.map((x) => x.price)
								.reduce((prev, current) => prev + current, 0)

							return (
								<>
									<div key={`header_${status}`} className={style.statusHeader}>
										<input
											type="checkbox"
											checked={
												allIdsForThisStatus.sort().join(',') ===
												selectedCards
													.filter(
														(x) =>
															apiData.find((a) => a.id === x)
																.status === status
													)
													.sort()
													.join(',')
											}
											onChange={(event) => {
												const allCardsStatus = apiData.filter(
													(x) => x.status === status
												)
												setSelectedCards((x) => {
													let result = [...x]
													if (!event.target.checked) {
														allCardsStatus.forEach((card) => {
															result.splice(
																result.findIndex(
																	(a) => a === card.id
																),
																1
															)
														})
													} else {
														result.push(
															...allCardsStatus.map((x) => x.id)
														)
													}
													return Array.from(
														new Map(result.map((x) => [x, null])).keys()
													)
												})
											}}
										/>
										<h1>{status}</h1>
										<span>
											{NumberUtils.numberToCurrency(sumOfPrices).replace(
												'R$',
												''
											)}
										</span>
									</div>
									<div key={`content_${status}`} className={style.pageContent}>
										{apiData
											.filter((x) => x.status === status)
											.map((product) => {
												return (
													<ProductCard
														key={product.id}
														product={product}
														onClose={refreshPage}
														selected={selectedCards.find(
															(x) => x === product.id
														)}
														onSelect={(selected) => {
															setSelectedCards((x) => {
																if (!selected) {
																	return [
																		...x.filter(
																			(a) => a !== product.id
																		),
																	]
																} else {
																	x.push(product.id)
																	return [...x]
																}
															})
														}}
													/>
												)
											})}
									</div>
								</>
							)
						})}
			</div>
		</div>
	)
}
