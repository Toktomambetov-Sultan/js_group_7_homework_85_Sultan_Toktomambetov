import musicReducer from "./music/musicReducer";
import userReducer from "./user/userReducer";
import trackHistoryReducer from "./trackHistory/trackHistoryReducer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import tracksReducer from "./track/trackReducer";
import authorReducer from "./author/authorReducer";
import albumReducer from "./album/albumReducer";
import { loadFromLocalStorage, saveToLocalStorage } from "./localStoragesTools";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  album: albumReducer,
  author: authorReducer,
  track: tracksReducer,
  music: musicReducer,
  user: userReducer,
  trackHistory: trackHistoryReducer,
  router: connectRouter(history),
});

const middleware = [thunk, routerMiddleware(history)];

const persistedState = loadFromLocalStorage();

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(...middleware)
);

store.subscribe(() => {
  saveToLocalStorage({
    user: {
      user: store.getState().user.user,
    },
  });
});

export default store;
