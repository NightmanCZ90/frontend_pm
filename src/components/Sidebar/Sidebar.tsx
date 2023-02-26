import { Navigator, useLocation, useNavigate } from "@solidjs/router";
import { DataSaverOff, ShowChart } from "@suid/icons-material";
import { Component, JSX } from "solid-js";

import { StyledNavigationButton, StyledSidebar } from "./Sidebar.styles";

type NavigationButtonProps = {
  icon: any;
  name: string;
  navigate: Navigator;
  pathname: string;
  route: string;
  tooltipTitle: string;
}

const renderNavigationButton = ({ icon, name, navigate, pathname, route, tooltipTitle }: NavigationButtonProps) => {
  const active = pathname === route;

  const handlePageSelection: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = (event) => {
    if (!active) {
      event.preventDefault();
      event.stopPropagation();

      route && navigate(route);
    }
  }

  return (
    // <Tooltip title={tooltipTitle} placement="right" arrow>
    <StyledNavigationButton title={tooltipTitle} name={name} onClick={handlePageSelection}>
      {icon}
    </StyledNavigationButton>
    // </Tooltip>
  )
}

interface ISidebarProps {

}

const Sidebar: Component<ISidebarProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <StyledSidebar>

      <div class="navigation-main">
        {renderNavigationButton({ icon: <ShowChart />, name: 'home', navigate, pathname: location.pathname, route: '/', tooltipTitle: 'Home' })}
        {renderNavigationButton({ icon: <DataSaverOff />, name: 'portfolios', navigate, pathname: location.pathname, route: '/portfolios', tooltipTitle: 'Portfolios' })}
      </div>

    </StyledSidebar>
  );
}

export default Sidebar;