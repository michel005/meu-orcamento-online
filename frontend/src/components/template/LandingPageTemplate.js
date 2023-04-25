import { Card, CardCollection, Gallery, LeftRightSide, Photo } from 'components/molecule'
import { LandingPageTemplateStyle } from './LandingPageTemplateStyle'
import { EMPTY_FUNCTION } from 'constants/GeneralConstants'

const DefineType = ({ entry, entryKey }) => {
	if (entry.type === 'left_block') {
		return (
			<LeftRightSide
				data-modal={entry?.variation && entry?.variation?.indexOf('modal') !== -1}
				data-inverted={entry?.variation && entry?.variation?.indexOf('inverted') !== -1}
				key={entryKey}
				left={entry.content}
				right={entry.photo ? <Photo src={entry.photo} /> : <></>}
			/>
		)
	} else if (entry.type === 'right_block') {
		return (
			<LeftRightSide
				data-modal={entry?.variation && entry?.variation?.indexOf('modal') !== -1}
				data-inverted={entry?.variation && entry?.variation?.indexOf('inverted') !== -1}
				key={entryKey}
				left={entry.photo ? <Photo src={entry.photo} /> : <></>}
				right={entry.content}
			/>
		)
	} else if (entry.type === 'card_collection') {
		return (
			<CardCollection
				key={entryKey}
				header={entry.header}
				description={entry.description}
				box={entry.variation === 'box'}
				cards={entry.cards.map((card, cardKey) => {
					return (
						<Card key={cardKey} {...card}>
							{card.content}
						</Card>
					)
				})}
			/>
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
	} else if (entry.type === 'header_and_content') {
		return <Gallery key={entryKey} header={entry.header} content={entry.description} />
	} else if (entry.type === 'container') {
		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
				{entry.content}
				{(entry.master || []).map((m, mKey) => {
					return <DefineType entry={m} entryKey={`child_${entryKey}_${mKey}`} />
				})}
			</div>
		)
	} else {
		return <></>
	}
}

export const LandingPageTemplate = ({
	loc = EMPTY_FUNCTION,
	events,
	children,
	background = false,
}) => {
	const localization = loc(events)

	if (children) {
		return <LandingPageTemplateStyle>{children}</LandingPageTemplateStyle>
	}

	return (
		<LandingPageTemplateStyle
			data-background={background}
			style={{ '--BACKGROUND-IMAGE': background }}
		>
			{(localization || []).map((entry, entryKey) => {
				return <DefineType key={entryKey} entry={entry} entryKey={entryKey} />
			})}
		</LandingPageTemplateStyle>
	)
}
