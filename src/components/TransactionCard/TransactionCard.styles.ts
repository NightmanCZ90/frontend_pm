import { styled } from "solid-styled-components";
import { Colors } from "../../styles/theme";

interface IStyledTransactionCardProps {
  colors: Colors;
  isSelected: boolean;
}

export const StyledTransactionCard = styled('div') <IStyledTransactionCardProps>`
  background-color: ${({ colors, isSelected }) => isSelected ? colors?.greenAccent[700] : colors?.primary[500]};
  padding: 8px;

  .icon {
    display: flex;
    align-items: center;
    margin-right: 16px;

    &.buy {
      color: var(--colorSuccess);
    }

    &.sell {
      color: var(--colorError);
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;

    .top {
      display: flex;
      justify-content: space-between;

      .transaction-type {
        display: flex;
        align-items: center;
      }

      h3 {
        display: inline-block;
        margin-left: 1rem;
      }
    }

    .middle {
      display: flex;
      justify-content: space-between;

      .info {
        display: flex;
        flex-direction: row;

        .num-shares {
          margin-right: 1rem;
        }
      }

      .date {
        align-self: flex-end;
      }
    }

    .bottom {
      margin-top: 16px;

      .buttons {
        display: flex;
        justify-content: space-between;
      }

      .delete-buttons {
        margin-top: 8px;
        display: flex;
        gap: 16px;
      }
    }
  }

  &:hover {
    background-color: ${({ colors, isSelected }) => isSelected ? colors?.greenAccent[700] : colors?.greenAccent[800]};
  }
`;