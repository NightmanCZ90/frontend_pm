import { styled } from "solid-styled-components";
import { Colors } from "../../styles/theme";


export const StyledPortfolioDetail = styled('div')`
  padding: 20px;
  overflow-y: auto;

  .header-content {
    display: flex;
    gap: 8px;
  }
`;

interface IStyledPortfolioDetailContentProps {
  colors: Colors;
}

export const StyledPortfolioDetailContent = styled('div') <IStyledPortfolioDetailContentProps>`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  section.portfolio {
    padding: 20px;
    background-color: ${props => props.colors?.primary[700]};

    .portfolio-layout {

      .circle {
        height: 200px;
        width: 200px;
        border: 2rem solid limegreen;
        border-radius: 50%;
      }
    }

  }
`;