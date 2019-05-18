import styled from 'styled-components/macro';
import { fade, smallFont } from '../../styles/helpers';

const ServerError = styled.span`
  ${fade};
  ${smallFont};

  margin-left: auto;

  color: ${props => props.theme.error};
`;

export default ServerError;
