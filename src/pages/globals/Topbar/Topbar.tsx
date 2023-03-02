import { Component, Show } from "solid-js";
import { LightModeOutlined, DarkModeOutlined, NotificationsOutlined, SettingsOutlined, PersonOutlined } from '@suid/icons-material'
import { Box, IconButton } from "@suid/material";

import { useThemeContext } from "../../../styles/theme";
import { StyledTopbar } from "./Topbar.styles";

const Topbar: Component = () => {
  const [mode, toggleColorMode] = useThemeContext();

  return (
    <StyledTopbar>
      <Box>

        <IconButton onClick={toggleColorMode}>
          <Show when={mode() === 'light'} fallback={<LightModeOutlined />}>
            <DarkModeOutlined />
          </Show>
        </IconButton>

        <IconButton>
          <NotificationsOutlined />
        </IconButton>

        <IconButton>
          <SettingsOutlined />
        </IconButton>

        <IconButton>
          <PersonOutlined />
        </IconButton>

      </Box>
    </StyledTopbar>
  )
}

export default Topbar;