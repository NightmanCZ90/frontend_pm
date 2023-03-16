import { createContext, ParentComponent, useContext } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { Dispatch, StoreEffects, storeEffects, StoreReducers, storeReducers, StoreState, storeState } from "./models";

// Maps over reducers and sets setState function
function mapReducers(reducers: StoreReducers, setState: SetStoreFunction<StoreState>) {
  return Object.fromEntries(
    Object.entries(reducers).map(([modelName, modelReducers]) => {
      if (modelReducers) {
        return [modelName, Object.fromEntries(
          // objectEntries(modelReducers).map(([reducerName, reducer]) => [reducerName, (...args: any) => setState((modelName), (state) => reducer(state, ...args))])
          // @ts-ignore
          Object.entries(modelReducers).map(([reducerName, reducer]) => [reducerName, (args: any) => setState((modelName), (state) => reducer(args, state))])
        )]
      }
      return [modelName,]
    })
  )
}
// Maps over effects and passes dispatch function
function mapEffects(effects: StoreEffects, dispatch: StoreReducers) {
  return Object.fromEntries(
    Object.entries(effects).map(([modelName, modelEffects]) => {
      if (modelEffects) {
        return [modelName, Object.fromEntries(
          // @ts-ignore
          Object.entries(modelEffects).map(([effectName, effect]) => [effectName, (args: any) => effect(args, dispatch)])
        )]
      }
      return [modelName,]
    })
  )
}

// Puts reducers and effects together
function mapDispatch(reducers: StoreReducers, effects: StoreEffects) {
  const mapped = Object.assign({}, reducers) as Dispatch;

  Object.entries(effects).map(([modelName, modelEffects]) => {
    // @ts-ignore
    mapped[modelName] = { ...mapped[modelName], ...modelEffects };
  });

  return mapped;
}

type StoreContextValue = [
  StoreState,
  Dispatch,
];

export const StoreContext = createContext<StoreContextValue>([
  storeState,
  mapDispatch(storeReducers, storeEffects),
]);

interface IStoreProvider {

}
export const StoreProvider: ParentComponent<IStoreProvider> = (props) => {
  const [state, setState] = createStore(storeState);

  const mappedReducers = mapReducers(storeReducers, setState);
  const mappedEffects = mapEffects(storeEffects, mappedReducers);
  const mappedDispatch = mapDispatch(mappedReducers, mappedEffects);

  return (
    <StoreContext.Provider value={[state, mappedDispatch]}>
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
  const [_state, dispatch] = useContext(StoreContext);

  return dispatch;
}

