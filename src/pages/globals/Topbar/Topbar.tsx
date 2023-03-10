import { Component, Show } from "solid-js";
import { LightModeOutlined, DarkModeOutlined, NotificationsOutlined, SettingsOutlined, PersonOutlined } from '@suid/icons-material'
import { IconButton } from "@suid/material";

import { useThemeContext } from "../../../styles/theme";
import { StyledTopbar } from "./Topbar.styles";
import { useDispatch } from "../../../store";

const Topbar: Component = () => {
  const [mode, toggleColorMode] = useThemeContext();
  const dispatch = useDispatch();

  return (
    <StyledTopbar>
      <div>

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

        <button onClick={dispatch.auth.signOut}>Sign out</button>

      </div>
    </StyledTopbar>
  )
}

export default Topbar;