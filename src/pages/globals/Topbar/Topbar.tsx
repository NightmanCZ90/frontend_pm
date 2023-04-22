import { Component, createSignal, Show } from "solid-js";
import { LightModeOutlined, DarkModeOutlined, NotificationsOutlined, SettingsOutlined, PersonOutlined } from '@suid/icons-material'
import { IconButton, Menu, MenuItem } from "@suid/material";

import { useThemeContext } from "../../../styles/theme";
import { StyledTopbar } from "./Topbar.styles";
import { useNavigate } from "@solidjs/router";
import { signOut } from "../../../stores/AuthStore";

const Topbar: Component = () => {
  const navigate = useNavigate();
  const [mode, toggleColorMode] = useThemeContext();

  const [anchorEl, setAnchorEl] = createSignal<HTMLElement | null>(null);

  const openUserMenu = () => Boolean(anchorEl());
  const closeUserMenu = () => setAnchorEl(null);

  const handleUserAccountClick = () => {
    navigate('/user-account');
    closeUserMenu();
  }

  return (
    <StyledTopbar class="Topbar">
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

        <IconButton
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}
        >
          <PersonOutlined />
        </IconButton>

        <Menu
          id="user-menu"
          anchorEl={anchorEl()}
          open={openUserMenu()}
          onClose={closeUserMenu}
        >
          <MenuItem onClick={handleUserAccountClick}>
            My account
          </MenuItem>
          <MenuItem onClick={signOut}>
            Sign out
          </MenuItem>
        </Menu>

      </div>
    </StyledTopbar>
  )
}

export default Topbar;