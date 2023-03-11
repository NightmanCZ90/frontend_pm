import { createContext, ParentComponent, useContext } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";

type AuthState = {
  login: boolean;
  currentUser: string;
}

const auth = {
  state: {
    login: false,
    currentUser: '',
  } as AuthState,
  reducers: {
    setLogin: (login: boolean) => ((state?: AuthState) => ({ ...state, login }))(),
    setCurrentUser: (currentUser: string) => ((state?: AuthState) => ({ ...state, currentUser }))(),
  },
}

type PortfoliosState = {
  personal: any[];
}

const portfolios = {
  state: {
    personal: []
  } as PortfoliosState,
  reducers: {
    setPersonal: (personal: any[], state?: PortfoliosState) => ({ ...state, personal })
  },
}

export interface RootModel {
  auth: typeof auth;
  portfolios: typeof portfolios;
}

const mappedState = {
  auth: auth.state,
  portfolios: portfolios.state,
}

const mappedReducers = {
  auth: auth.reducers!,
  portfolios: portfolios.reducers!,
};

function mapReducers(reducers: typeof mappedReducers, setState: SetStoreFunction<typeof mappedState>) {
  return Object.fromEntries(
    Object.entries(reducers).map(([modelName, modelReducers]) => {
      if (modelReducers) {
        return [modelName, Object.fromEntries(
          // objectEntries(modelReducers).map(([reducerName, reducer]) => [reducerName, (...args: any) => setState((modelName), (state) => reducer(state, ...args))])
          //@ts-ignore
          Object.entries(modelReducers).map(([reducerName, reducer]) => [reducerName, (args: any) => setState((modelName), (state) => reducer(args, state))])
        )]
      }
      return [modelName,]
    })
  )
}

type StoreContextValue = [
  typeof mappedState,
  typeof mappedReducers
];

export const StoreContext = createContext<StoreContextValue>([
  mappedState,
  mappedReducers
]);

interface IStoreProvider {

}
export const StoreProvider: ParentComponent<IStoreProvider> = (props) => {
  const [state, setState] = createStore(mappedState)

  return (
    <StoreContext.Provider value={[state, mapReducers(mappedReducers, setState)]}>
      {props.children}
    </StoreContext.Provider>
  );
};


export const useStore = () => useContext(StoreContext);

export const useSelector = () => {
  const [state] = useContext(StoreContext);

  return state;
}

export const useDispatch = () => {
  const [_, reducers] = useContext(StoreContext);

  return reducers;
}

