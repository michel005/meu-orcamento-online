import styled from 'styled-components'

const LineWithTextStyle = styled.div`
	margin-block: 14px;
	position: relative;

	& > span {
		background-color: #fff;
		color: #aaa;
		left: 50%;
		padding: 0 7px;
		position: absolute;
		top: 50%;
		translate: -50% -50%;
	}
`

export const LineWithText = ({ text }) => {
	return (
		<LineWithTextStyle>
			<hr />
			<span>{text}</span>
		</LineWithTextStyle>
	)
}
