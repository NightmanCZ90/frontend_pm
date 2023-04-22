import { A, useLocation } from "@solidjs/router";
import { Dashboard, DataSaverOff, Menu, MenuOpen } from "@suid/icons-material";
import { Button, IconButton, Typography } from "@suid/material";
import { Accessor, Component, createSignal, Show } from "solid-js";
import { tokens, useThemeContext } from "../../../styles/theme";

import { StyledSidebar } from "./Sidebar.styles";

type ItemProps = {
  icon: any;
  isExpanded: Accessor<boolean>;
  name: string;
  pathname: Accessor<string>;
  route: string;
}

const Item = ({ icon, isExpanded, name, pathname, route }: ItemProps) => {

  return (
    <A href={route}>
      <Button class={pathname() === route ? 'active' : ''} fullWidth size="large" color="secondary" startIcon={icon}>
        <Show when={isExpanded()}>
          <span class="button-label">
            {name}
          </span>
        </Show>
      </Button>
    </A>
  )
}

interface ISidebarProps {

}

const Sidebar: Component<ISidebarProps> = () => {
  const location = useLocation();
  const [mode] = useThemeContext();
  const colors = () => tokens(mode());
  const [isExpanded, setIsExpanded] = createSignal(true);

  const pathname = () => location.pathname;

  return (
    <StyledSidebar colors={colors()} isExpanded={isExpanded()}>

      <div class="expand-button">
        <IconButton size="large" color="secondary" onClick={() => setIsExpanded(!isExpanded())}>
          <Show when={isExpanded()} fallback={<Menu />}>
            <MenuOpen />
          </Show>
        </IconButton>
      </div>

      <Item
        icon={<Dashboard />}
        isExpanded={isExpanded}
        name="Dashboard"
        pathname={pathname}
        route={"/"}
      />

      <div class="menu-section">
        <Show when={isExpanded()} fallback={<div class="break" />}>
          <Typography
            variant="h6"
            color={colors().grey[200]}
          >
            General
          </Typography>
        </Show>
      </div>

      <Item
        icon={<DataSaverOff />}
        isExpanded={isExpanded}
        name="Portfolios"
        pathname={pathname}
        route={"/portfolios"}
      />

      <div class="menu-section">
        <Show when={isExpanded()} fallback={<div class="break" />}>
          <Typography
            variant="h6"
            color={colors().grey[200]}
          >
            Portfolios
          </Typography>
        </Show>
      </div>

      <Item
        icon={<DataSaverOff />}
        isExpanded={isExpanded}
        name="Personal"
        pathname={pathname}
        route={"/portfolios/personal"}
      />

      <Item
        icon={<DataSaverOff />}
        isExpanded={isExpanded}
        name="Managing"
        pathname={pathname}
        route={"/portfolios/managing"}
      />

      <Item
        icon={<DataSaverOff />}
        isExpanded={isExpanded}
        name="Managed"
        pathname={pathname}
        route={"/portfolios/managed"}
      />

    </StyledSidebar>
  );
}

export default Sidebar;