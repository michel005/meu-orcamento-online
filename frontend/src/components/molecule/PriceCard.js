import { Card } from 'components/molecule'
import { CurrencyUtils } from 'utils'

export const PriceCard = ({ priceInfo, event }) => {
	const { header, color, description, features = [], price, suffix = '/ mês' } = priceInfo
	return (
		<Card header={header} color={color} expanded={true}>
			<p>{description}</p>
			<ul>
				{features.map((item, key) => {
					return <li key={key}>{item}</li>
				})}
			</ul>
			<div style={{ display: 'flex', flexGrow: 1 }} />
			<button onClick={event}>
				{price && CurrencyUtils.format(price)} {suffix}
			</button>
		</Card>
	)
}
