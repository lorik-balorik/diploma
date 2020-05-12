import createDataContext from "./createDataContext";
import actiFoxApi from '../api/actiFox';

const workoutReducer = (state, action) => {
    switch ( action.type ) {
        case 'fetch_workouts':
            return action.payload;
        default:
            return state;
    }
};

const fetchWorkouts = dispatch => async () => {
    const response = await actiFoxApi.get( '/workouts' );
    dispatch( {type: 'fetch_workouts', payload: response.data} );
};
const createWorkout = dispatch => async (name, exercises) => {
    // make a request to our api
    // console.log( name, locations.length );
    await actiFoxApi.post( '/workout', { name, exercises } );
};

export const { Provider, Context } = createDataContext(
    workoutReducer,
    { fetchWorkouts, createWorkout },
    []
);