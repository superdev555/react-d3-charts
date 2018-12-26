import styled from 'styled-components';
import { Row } from 'react-bootstrap';
import { CheckboxGroup } from 'react-checkbox-group';

const StyledRow = styled(Row)`
    margin-top: 20px;
    float: left;
  `;
const StyledDivNav = styled.div`
    padding: 20px;
    background-color: #eeeeff;
    margin-top: 10px;
  `;
const StyledDivContent = styled.div`
  padding: 20px;
  background-color: #eeeee;
  margin-top: 10px;
`;

const StyledCheckLabel = styled.label`
  margin-left: 20px;
`;
const StyledCheckGroup = styled(CheckboxGroup)`
  display: flex;
  align-items: center;
  padding: 10px 20px 5px 5px;
  border-style: ridge;
`;

export {
  StyledRow, StyledDivNav, StyledDivContent, StyledCheckGroup, StyledCheckLabel
};
