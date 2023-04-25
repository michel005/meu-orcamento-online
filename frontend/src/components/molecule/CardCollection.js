import { useEffect, useRef, useState } from 'react'
import { CardCollectionStyle } from './CardCollectionStyle'
import styled from 'styled-components'

const Style = styled.div`
	flex-grow: 1;
	height: 100%;

	& > div {
		transition: all 0.25s;
	}

	@media (max-width: 1200px) {
		width: 100%;
		& > div {
			border-color: var(--ACTIVE);
			box-shadow: var(--ACTIVE) 0 0 4px;
		}
	}
`

export const CardCollection = ({ header, description, cards = [], box = false }) => {
	const [isShowing, setIsShowing] = useState(new Array((cards || []).length).fill(false))
	const [isShowingAux, setIsShowingAux] = useState(new Array((cards || []).length).fill(false))
	const itemsRef = useRef(new Array((cards || []).length).fill(null))
	const observers = cards.map((card, cardKey) => {
		return new IntersectionObserver(([entry]) => {
			setIsShowing((e) => {
				e[cardKey] = entry.isIntersecting
				return [...e]
			})
		})
	})

	useEffect(() => {
		observers.forEach((o, cardKey) => {
			if (itemsRef.current[cardKey]) {
				observers[cardKey].observe(itemsRef.current[cardKey])
			}
		})
	}, [itemsRef])

	useEffect(() => {
		if (isShowing.filter((x) => x).length === 3) {
			let tmp = [...isShowing]
			tmp[tmp.indexOf(true)] = false
			tmp[(tmp.indexOf(true), tmp.indexOf(true) + 1)] = false
			setIsShowingAux(tmp)
		}
		if (isShowing.filter((x) => x).length === 2) {
			let tmp = [...isShowing]
			if (tmp.indexOf(true) === 0) {
				tmp[(tmp.indexOf(true), 1)] = false
			} else {
				tmp[tmp.length - 2] = false
			}
			setIsShowingAux(tmp)
		}
	}, [isShowing])

	return (
		<CardCollectionStyle data-box={box}>
			<h1>{header}</h1>
			<p>{description}</p>
			<div className="content">
				{(cards || []).map((card, cardKey) => {
					return (
						<div
							id={`card_${cardKey}`}
							key={cardKey}
							ref={(el) => (itemsRef.current[cardKey] = el)}
						>
							{isShowingAux[cardKey] ? <Style>{card}</Style> : card}
						</div>
					)
				})}
			</div>
		</CardCollectionStyle>
	)
}
