import styled from 'styled-components';
import { Grid, Row } from 'react-bootstrap';
import { Checkbox } from 'react-checkbox-group';

const StyledSvg = styled.svg`
    height: ${props => props.height};
`;
const StyledGrid = styled(Grid)`
      padding: 20px;
    `;
const StyledRow = styled(Row)`
    margin-top: 20px;
    float: right;
  `;
const StyledDivNav = styled.div`
    padding: 20px;
    background-color: #eeeeff;
    margin-top: 10px;
  `;
const StyledDivGraph = styled.div`
  padding: 20px;
  background-color: #eeeee;
  margin-top: 10px;
`;
const StyledCheckLabel = styled.label`
  margin-left: 20px;
`;

export {
  StyledSvg, StyledGrid, StyledRow, StyledDivNav, StyledDivGraph, StyledCheckLabel
};
