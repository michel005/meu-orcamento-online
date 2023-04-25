import styled from 'styled-components'

export const FlexSpace = styled.div`
	display: flex;
	height: ${(props) => props.space || 'auto'};
	min-height: ${(props) => props.space || 'auto'};
`
