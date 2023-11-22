// import { applyMiddleware, combineReducers, compose, createStore } from "redux";
// import thunkMiddleware from "redux-thunk";
// import monitorReducersEnhancer from "./enhancers/monitorReducers";
// import loggerMiddleware from "./middleware/logger";
// import usersReducer from "../features/users";
// import authReducer from "../features/auth"
 
// export default function configureStore(preloadedState) {
//   const middlewares = [loggerMiddleware, thunkMiddleware];
//   const middlewareEnhancer = applyMiddleware(...middlewares);
 
//   const rootReducer = combineReducers({
//     users: usersReducer,
//     auth: authReducer
//     // Add your additional reducer here
//   });
 
//   const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
//   const composedEnhancers = compose(...enhancers);
 
//   const store = createStore(rootReducer, preloadedState, composedEnhancers);
 
//   if (process.env.NODE_ENV !== "production" && module.hot) {
//     module.hot.accept("../features/users", () =>
//       store.replaceReducer(usersReducer)
//     );
//   }
 
//   return store;
// }