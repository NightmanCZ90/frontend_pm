import { styled } from "solid-styled-components";

interface IStyledCreateTransactionProps {
  readonly edit: number;
}

export const StyledCreateTransaction = styled('div') <IStyledCreateTransactionProps>`

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .required,
    .defaulted {
      display: flex;
      gap: 16px;
    }

    .buttons {
      display: flex;
      justify-content: ${props => props.edit ? 'space-between' : 'flex-end'};

      .buttons-delete {
        display: flex;
        gap: 16px;
      }
    }
    
    & > span {
      color: var(--text-error);
    }
  }
`;