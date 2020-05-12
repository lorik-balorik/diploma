import createDataContext from "./createDataContext";
import actiFoxApi from "../api/actiFox";
import { AsyncStorage } from "react-native";
import { navigate } from "../navigationRef";

const authReducer = ( state, action ) => {
    switch ( action.type ) {
        case 'add_error':
            return {...state, errorMessage: action.payload };
        case 'sign_in_up':
            return { errorMessage: '', token: action.payload };
        case 'clear_error_msg':
            return { ...state, errorMessage: '' };
        case 'signout':
            return { token: null, errorMessage: '' };
        default:
            return state;
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem( 'token' );
    if( token ) {
        dispatch( { type: 'sign_in_up', payload: token } );
        navigate( 'WorkoutList' );
    } else {
        navigate( 'Signin' );
    }
};

const clearErrorMessage = dispatch => () => {
    dispatch( { type: 'clear_error_msg' } );
};

const signup = (dispatch) => async ( {email, password}, callback ) => {
    // make API request to sign uo with that e,ail and pass
    // if we sign up, modify our state, and say that we are authentificated
    // if signing uo fails, we probably need to reflect an error msg somewhere
    try {
        const response = await actiFoxApi.post( '/signup', { email, password } );
        await AsyncStorage.setItem( 'token', response.data.token );
        dispatch( { type: 'sign_in_up', payload: response.data.token } );

        // navigate to main flow
        navigate( 'ChangeAccountData');
    } catch (err) {
        dispatch( { type: 'add_error', payload: 'Sorry, but user with this Email already exist' } )
    }
};

const signin = (dispatch) => async ( {email, password} ) => {
    // try to sign in
    //Handle success by updating state
    // Handle failure by showing error msg somehow
    try {
        const response = await actiFoxApi.post( '/signin', { email, password } );
        await AsyncStorage.setItem( 'token', response.data.token );
        dispatch( { type: 'sign_in_up', payload: response.data.token } );
        navigate( 'WorkoutList' );
    } catch ( err ) {
        console.log( err );
        dispatch( { type: 'add_error', payload: 'Wrong Email or password!' } )
    }
};

const signout = (dispatch) => async () => {
    await AsyncStorage.removeItem('token');
    await dispatch( { type: 'signout' } );
    navigate( 'loginFlow' );
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: '' }
);