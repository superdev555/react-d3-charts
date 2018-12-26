
import styled from 'styled-components';
import { Grid } from 'react-bootstrap';

const StyledSvg = styled.svg`
    height: ${props => props.height};
`;
const StyledGrid = styled(Grid)`
      padding: 20px;
    `;
const StyledDivNav = styled.div`
    padding: 20px;
    background-color: #eeeeff;
    margin-top: 10px;
  `;
const StyledDivGraph = styled.div`
  padding: 20px;
  background-color: #eeeeee;
  margin-top: 10px;
`;

export {
  StyledSvg, StyledGrid, StyledDivNav, StyledDivGraph
};
