import { A, useLocation } from "@solidjs/router";
import { Dashboard, DataSaverOff } from "@suid/icons-material";
import { Button, Typography } from "@suid/material";
import { Component, createSignal } from "solid-js";
import { tokens, useThemeContext } from "../../styles/theme";

import { StyledSidebar } from "./Sidebar.styles";

type ItemProps = {
  icon: any;
  name: string;
  route: string;
}

const Item = ({ icon, name, route }: ItemProps) => {
  const location = useLocation();

  return (
    <A href={route}>
      <Button class={location.pathname === route ? 'active' : ''} fullWidth size="large" color="secondary" startIcon={icon}>
        {name}
      </Button>
    </A>
  )
}

interface ISidebarProps {

}

const Sidebar: Component<ISidebarProps> = () => {
  const [mode] = useThemeContext();
  const colors = () => tokens(mode());
  const [isExpanded, setIsExpanded] = createSignal(true);

  return (
    <StyledSidebar colors={colors()} isExpanded={isExpanded()}>

      <Item
        icon={<Dashboard />}
        name="Dashboard"
        route={"/"}
      />

      <div class="menu-section">
        <Typography
          variant="h6"
          color={colors().grey[300]}
        >
          General
        </Typography>
      </div>

      <Item
        icon={<DataSaverOff />}
        name="Portfolios"
        route={"/portfolios"}
      />

      <div class="menu-section">
        <Typography
          variant="h6"
          color={colors().grey[300]}
        >
          Portfolios
        </Typography>
      </div>

      <Item
        icon={<DataSaverOff />}
        name="Personal"
        route={"/portfolios/personal"}
      />

      <Item
        icon={<DataSaverOff />}
        name="Managing"
        route={"/portfolios/managing"}
      />

      <Item
        icon={<DataSaverOff />}
        name="Managed"
        route={"/portfolios/managed"}
      />

    </StyledSidebar>
  );
}

export default Sidebar;