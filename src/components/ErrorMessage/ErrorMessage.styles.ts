import { styled } from "solid-styled-components";

export const StyledErrorMessage = styled('div')`
  display: flex;
  flex-direction: column;

  .error-message {
    color: var(--colorError);
  }
`;