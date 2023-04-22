import { Card, CardCollection, Gallery, LeftRightSide, Photo, PriceCard } from 'components/molecule'
import { LandingPageTemplateStyle } from './LandingPageTemplateStyle'

export const LandingPageTemplate = ({ loc, events }) => {
	const localization = loc(events)
	return (
		<LandingPageTemplateStyle>
			{localization.map((entry, entryKey) => {
				const event = events?.[entryKey]
				if (entry.type === 'left_block') {
					return (
						<LeftRightSide
							key={entryKey}
							left={entry.content}
							right={<Photo src={entry.photo} />}
						/>
					)
				} else if (entry.type === 'right_block') {
					return (
						<LeftRightSide
							key={entryKey}
							left={<Photo src={entry.photo} />}
							right={entry.content}
						/>
					)
				} else if (entry.type === 'card_collection') {
					return (
						<CardCollection key={entryKey} header={entry.header} description={entry.description}>
							{entry.cards.map((card, cardKey) => {
								if (entry.variation === 'price') {
									return <PriceCard key={cardKey} priceInfo={card} event={event?.cards[cardKey]} />
								}
								return (
									<Card key={cardKey} header={card.header} photo={card.picture} icon={card.icon}>
										{card.content}
										<div style={{ display: 'flex', flexGrow: 1 }} />
										{card.button && (
											<button data-type="secondary" onClick={event?.cards?.[cardKey]}>
												{card.button}
											</button>
										)}
									</Card>
								)
							})}
						</CardCollection>
					)
				} else if (entry.type === 'gallery') {
					return (
						<Gallery
							key={entryKey}
							header={entry.header}
							content={entry.description}
							photos={entry.pictures}
						/>
					)
				} else {
					return <></>
				}
			})}
		</LandingPageTemplateStyle>
	)
}
