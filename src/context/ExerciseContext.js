import createDataContext from "./createDataContext";
import actiFoxApi from '../api/actiFox';

const exerciseReducer = (state, action) => {
    switch ( action.type ) {
        case 'fetch_exercises':
            return action.payload;
        default:
            return state;
    }
};

const fetchExercises = dispatch => async () => {
    const response = await actiFoxApi.get( '/exercises' );
    dispatch( {type: 'fetch_exercises', payload: response.data} );
};

export const { Provider, Context } = createDataContext(
    exerciseReducer,
    { fetchExercises },
    []
);