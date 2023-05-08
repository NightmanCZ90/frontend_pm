import { Drawer, IconButton } from "@suid/material";
import { Component, Show } from "solid-js"
import { tokens, useThemeContext } from "../../../styles/theme";
import { ChevronRight } from "@suid/icons-material";
import CreateTransaction from "../../../forms/CreateTransaction";
import { DrawerType, emptyDrawerPayload, getDrawerPayload } from "../../../stores/DrawerStore";

const drawerWidth = 400;

interface IGlobalDrawerProps {

}

const GlobalDrawer: Component<IGlobalDrawerProps> = (props) => {
  const [mode] = useThemeContext();
  const colors = () => tokens(mode());

  const transactionDrawer = () => getDrawerPayload(DrawerType.Transaction);

  const isOpen = () => Boolean(transactionDrawer());

  return (
    <Drawer
      anchor={'right'}
      open={isOpen()}
      variant="persistent"
      hideBackdrop
      sx={{
        display: isOpen() ? 'flex' : 'none',
        width: drawerWidth,
        height: '100vh',
        transition: 'all 5s',

        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          position: 'static',
          padding: '20px',
          backgroundColor: colors()?.primary[700],
          width: drawerWidth,

          '& .header': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }
        }
      }}
    >
      <Show when={transactionDrawer()}>
        {(payload) =>
          <>
            <div class="header">
              <Show when={payload().transaction} fallback={'Create transaction'}>
                Edit transaction
              </Show>
              <IconButton onClick={emptyDrawerPayload}>
                <ChevronRight />
              </IconButton>
            </div>
            <CreateTransaction
              portfolioId={payload().portfolioId}
              transaction={payload().transaction}
            />
          </>
        }
      </Show>
    </Drawer>
  )
}

export default GlobalDrawer;