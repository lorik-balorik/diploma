import createDataContext from "./createDataContext";
import actiFoxApi from '../api/actiFox';
import {navigate} from "../navigationRef";

const accountReducer = (state, action) => {
    // const { accountData: { firstName, lastName:   } };

    switch ( action.type ) {
        case 'fetch_account':
            return action.payload;
        default:
            return state;
    }
};

const fetchAccountData = dispatch => async () => {
    const response = await actiFoxApi.get( '/account' );
    dispatch( { type: 'fetch_account', payload: response.data} );
};
const setAccountData = dispatch => async ( firstName, lastName, gender, height, weight, _id ) => {
    // make a request to our api
    if( !firstName._id ) {
        // console.log(  _id._id );
        // console.log( firstName, !firstName._id );
        delete firstName._id;
        await actiFoxApi.post( '/account', { firstName, lastName, gender, height, weight } );
        // console.log( firstName );
        navigate( 'AccountData' );
    } else {
        await actiFoxApi.put( '/account', { firstName, lastName, gender, height, weight, _id } );
        navigate( 'AccountData' );
    }
};

export const { Provider, Context } = createDataContext(
    accountReducer,
    { fetchAccountData, setAccountData },
    [ { "accountData": { "firstName": "", "lastName": "", "gender": "none", "height": "", "weight": "" } } ]
);