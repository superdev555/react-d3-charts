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
`;

const StyledDivContent = styled.div`
  padding: 20px;
`;

const StyledCheckLabel = styled.label`
  margin-right: 20px;
`;

const StyledCheckGroup = styled(CheckboxGroup)`
  display: flex;
  align-items: center;
  padding: 10px 20px 5px 5px;
`;

export {
  StyledRow, StyledDivNav, StyledDivContent, StyledCheckGroup, StyledCheckLabel,
};
