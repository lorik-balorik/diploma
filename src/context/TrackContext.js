import createDataContext from "./createDataContext";
import actiFoxApi from '../api/actiFox';

const trackReducer = (state, action) => {
    switch ( action.type ) {
        case 'fetch_tracks':
            return action.payload;
        default:
            return state;
    }
};

const fetchTracks = dispatch => async () => {
    const response = await actiFoxApi.get( '/tracks' );
    dispatch( {type: 'fetch_tracks', payload: response.data} );
};
const createTrack = dispatch => async (name, locations) => {
    // make a request to our api
    // console.log( name, locations.length );
    await actiFoxApi.post( '/tracks', { name, locations } );
};

export const { Provider, Context } = createDataContext(
    trackReducer,
    { fetchTracks, createTrack },
    []
);