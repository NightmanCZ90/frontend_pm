import { styled } from 'solid-styled-components';

interface IStyledDashboardProps {

}

export const StyledDashboard = styled('div') <IStyledDashboardProps>`
  padding: 20px;
  /* height: 200%; */
  overflow-y: auto;

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;