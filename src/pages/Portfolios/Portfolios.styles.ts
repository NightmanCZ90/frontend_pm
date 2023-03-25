import { styled } from "solid-styled-components";

export const StyledPortfolios = styled('div')`
  padding: 20px;
  overflow-y: auto;
`;

interface IStyledPortfoliosContentProps {
  // colors: Colors;
}

export const StyledPortfoliosContent = styled('div') <IStyledPortfoliosContentProps>`
  padding-top: 3rem;

  .portfolio-personal,
  .portfolio-managed,
  .portfolio-managing {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    
    .portfolio-cards {
      width: 100%;
      gap: 1.5rem;
      margin: 1.5rem 0;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
    }
  }
`;