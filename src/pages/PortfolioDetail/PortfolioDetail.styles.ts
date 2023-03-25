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
  gap: 16px;

  section {
    padding: 20px;
    background-color: ${props => props.colors?.primary[700]};
  }

  section.portfolio {

    .portfolio-layout {

      .circle {
        height: 200px;
        width: 200px;
        border: 2rem solid limegreen;
        border-radius: 50%;
      }
    }
  }

  section.ownership {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 22rem;

    .owner {

      h3 {

        span {
          margin-left: 0.5rem;
          color: ${props => props.colors?.red[300]};
        }
      }
    }
  }
  
  section.portfolio-info {
    width: 22rem;
    display: flex;
    flex-direction: column;
  }
`;