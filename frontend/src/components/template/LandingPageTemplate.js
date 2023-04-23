import { Card, CardCollection, Gallery, LeftRightSide, Photo } from 'components/molecule'
import { LandingPageTemplateStyle } from './LandingPageTemplateStyle'
import { EMPTY_FUNCTION } from 'constants/GeneralConstants'

const DefineType = ({ entry, entryKey }) => {
	if (entry.type === 'left_block') {
		return (
			<LeftRightSide
				data-modal={entry.variation === 'modal'}
				key={entryKey}
				left={entry.content}
				right={<Photo src={entry.photo} />}
			/>
		)
	} else if (entry.type === 'right_block') {
		return (
			<LeftRightSide
				data-modal={entry.variation === 'modal'}
				key={entryKey}
				left={<Photo src={entry.photo} />}
				right={entry.content}
			/>
		)
	} else if (entry.type === 'card_collection') {
		return (
			<CardCollection key={entryKey} header={entry.header} description={entry.description}>
				{entry.cards.map((card, cardKey) => {
					return (
						<Card key={cardKey} {...card}>
							{card.content}
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
	} else if (entry.type === 'container') {
		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
				{entry.content}
				{entry.master && <DefineType entry={entry.master} entryKey={`child_${entryKey}`} />}
			</div>
		)
	} else {
		return <></>
	}
}

export const LandingPageTemplate = ({ loc = EMPTY_FUNCTION, events, children }) => {
	const localization = loc(events)

	if (children) {
		return <LandingPageTemplateStyle>{children}</LandingPageTemplateStyle>
	}

	return (
		<LandingPageTemplateStyle>
			{(localization || []).map((entry, entryKey) => {
				return <DefineType key={entryKey} entry={entry} entryKey={entryKey} />
			})}
		</LandingPageTemplateStyle>
	)
}
