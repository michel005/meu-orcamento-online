import { ShowMoreType } from './ShowMore.type'
import { ShowMoreStyle } from './ShowMore.style'
import React, { useState } from 'react'
import { Label } from './Label.style'
import { Button } from './button/Button'

export const ShowMore = ({
	label,
	options,
	variation = 'primary',
	visibleItems = 5,
}: ShowMoreType) => {
	const [showMore, setShowMore] = useState<boolean>(false)

	return (
		<ShowMoreStyle>
			{label && <Label>{label}</Label>}
			{options
				.filter((_, index) => showMore || index < visibleItems)
				.map((option, optionKey) => {
					return <div key={optionKey}>{option}</div>
				})}
			{options.length > visibleItems && (
				<Button
					className="showMoreLessButton"
					leftIcon={showMore ? 'expand_less' : 'expand_more'}
					variation={variation}
					onClick={() => {
						setShowMore((x) => !x)
					}}
				>
					{showMore ? 'Mostrar Menos' : 'Mostrar Mais'}
				</Button>
			)}
		</ShowMoreStyle>
	)
}
