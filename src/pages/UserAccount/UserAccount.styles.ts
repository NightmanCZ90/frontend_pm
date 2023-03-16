import { styled } from "solid-styled-components";

export const StyledUserAccount = styled('div')`
  padding: 20px;
  overflow-y: auto;

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const StyledUserAccountContent = styled('div')`
  padding-top: 3rem;

  form {
    width: 20rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .signup-form-buttons {
      display: flex;
      justify-content: flex-end;
      margin-top: 2rem;
    }
  }
`;