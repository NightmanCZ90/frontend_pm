import { styled } from "solid-styled-components";
import { Colors } from "../../styles/theme";


export const StyledPortfolioDetail = styled('div')`
  padding: 20px;
  overflow-y: auto;

  .header-content {
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      gap: 8px;
    }

    .right {

      a.edit-button {
        text-decoration: none;
        float: right;
      }
    }
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

  section.ownership-edit-button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .owner {
      padding: 20px;
      background-color: ${props => props.colors?.primary[700]};

      h3 {

        span {
          margin-left: 0.5rem;
          color: ${props => props.colors?.red[300]};
        }
      }
    }
  }
`;