import { createSelector } from 'reselect';

const getState = state => state;

//  General getters
export const getCategories = createSelector(getState, state => state.categories);
export const getNotes = createSelector(getState, state => state.notes);

//  More specific getters
// export const getCoffee = id => createSelector(getState, state => state.coffees.filter(c => parseInt(c.id) === parseInt(id))[0]);