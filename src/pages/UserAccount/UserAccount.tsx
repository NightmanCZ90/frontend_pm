import { Component } from "solid-js";
import { StyledUserAccount } from './UserAccount.styles'

interface IUserAccountProps {

}

const UserAccount: Component<IUserAccountProps> = (props) => {

  return (
    <StyledUserAccount class="UserAccount">
      User Account
    </StyledUserAccount>
  )
}

export default UserAccount;