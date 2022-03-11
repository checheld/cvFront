import rootReducer from '../redusers/rootReduser'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from '@redux-saga/core';
import logger from 'redux-logger';
import rootSaga from '../sagas/rootSaga';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer, 
    compose(applyMiddleware(sagaMiddleware), composeWithDevTools())
    // compose(applyMiddleware(logger, sagaMiddleware), composeWithDevTools())
    // applyMiddleware(logger, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch