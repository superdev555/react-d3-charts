import styled from 'styled-components'

const StyledSvg = styled.svg`
  height: ${props => props.height}px;
`

const StyledDivGraph = styled.div`
  padding: 20px;
  margin-top: 10px;
`

const StyledDivNav = styled.div`
  padding: 20px;
  background-color: #eeeeff;
`

const StyledDivContent = styled.div`
  padding: 20px;
  min-height: ${props => props.height}px;
`

export { StyledSvg, StyledDivGraph, StyledDivNav, StyledDivContent }
