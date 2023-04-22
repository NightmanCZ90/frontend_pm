import { Typography } from "@suid/material";
import { Component } from "solid-js";
import { tokens, useThemeContext } from "../../styles/theme";
import { StyledHeader } from "./Header.styles";

interface IHeaderProps {
  title: string;
  subtitle: string;
}

const Header: Component<IHeaderProps> = (props) => {
  const [mode] = useThemeContext();
  const colors = () => tokens(mode());

  return (
    <StyledHeader class="Header">
      <Typography
        variant="h2"
        color={colors().grey[100]}
        fontWeight="bold"
      >
        {props.title}
      </Typography>
      <Typography
        variant="h5"
        color={colors().greenAccent[400]}
      >
        {props.subtitle}
      </Typography>
    </StyledHeader>
  )
}

export default Header;