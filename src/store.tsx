import { createContext, ParentComponent, useContext } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { storeEffects, storeReducers, storeState } from "./models";

// Maps over reducers and sets setState function
function mapReducers(reducers: typeof storeReducers, setState: SetStoreFunction<typeof storeState>) {
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
function mapEffects(effects: typeof storeEffects, dispatch: typeof storeReducers) {
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
function mapDispatch(reducers: typeof storeReducers, effects: typeof storeEffects) {
  const mapped = Object.assign({}, reducers) as typeof storeReducers & typeof storeEffects;

  Object.entries(effects).map(([modelName, modelEffects]) => {
    // @ts-ignore
    mapped[modelName] = { ...mapped[modelName], ...modelEffects };
  });

  return mapped;
}

type StoreContextValue = [
  typeof storeState,
  typeof storeReducers & typeof storeEffects,
];

export const StoreContext = createContext<StoreContextValue>([
  storeState,
  mapDispatch(storeReducers, storeEffects),
]);

interface IStoreProvider {

}
export const StoreProvider: ParentComponent<IStoreProvider> = (props) => {
  const [state, setState] = createStore(storeState)

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

