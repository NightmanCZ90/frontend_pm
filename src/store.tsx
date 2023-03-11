import { createContext, ParentComponent, useContext } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { storeReducers, storeState } from "./models";

function mapReducers(reducers: typeof storeReducers, setState: SetStoreFunction<typeof storeState>) {
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
  typeof storeState,
  typeof storeReducers
];

export const StoreContext = createContext<StoreContextValue>([
  storeState,
  storeReducers
]);

interface IStoreProvider {

}
export const StoreProvider: ParentComponent<IStoreProvider> = (props) => {
  const [state, setState] = createStore(storeState)

  return (
    <StoreContext.Provider value={[state, mapReducers(storeReducers, setState)]}>
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

