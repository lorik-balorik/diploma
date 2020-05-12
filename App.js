import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
// import {AppFontLoader} from './src/utils/AppFontLoader';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from 'react-navigation-stack';
import AccountScreen from "./src/screens/account/AccountScreen";
import AccountSetDataScreen from './src/screens/account/AccountSetDataScreen';
import SigninScreen from "./src/screens/auth/SigninScreen";
import SignupScreen from "./src/screens/auth/SignupScreen";
import TrackCreateScreen from "./src/screens/track/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/track/TrackDetailScreen";
import TrackListScreen from "./src/screens/track/TrackListScreen";
import WorkoutListScreen from "./src/screens/workout/WorkoutListScreen";
import WorkoutCreateScreen from "./src/screens/workout/ExerciseListScreen";
import WorkoutDetailScreen from './src/screens/workout/WorkoutDetailScreen';
import WorkoutDetailSetScreen from './src/screens/workout/WorkoutDetailSetScreen';
import WorkoutStartScreen from './src/screens/workout/WorkoutStartScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from "./src/navigationRef";
import ResolveAuthScreen from './src/screens/auth/ResolveAuthScreen';
import { Provider as LocationProvider } from './src/context/LocationContext';
import { Provider as TrackProvider } from './src/context/TrackContext';
import { Provider as AccountProvider } from './src/context/AccountContext';
import { Provider as ExerciseProvider } from './src/context/ExerciseContext';
import { Provider as WorkoutProvider } from './src/context/WorkoutContext';
import { FontAwesome } from "expo-vector-icons";

const workoutListFlow = createStackNavigator( {
  WorkoutList: WorkoutListScreen,
  WorkoutDetail: WorkoutDetailScreen,
  WorkoutCreate: WorkoutCreateScreen,
  WorkoutDetailSet: WorkoutDetailSetScreen,
  WorkoutStart: WorkoutStartScreen,
  TrackList: TrackListScreen,
  TrackDetail: TrackDetailScreen
} );

const accountFlow = createStackNavigator( {
  AccountData: AccountScreen,
  ChangeAccountData: AccountSetDataScreen
} );

const switchNavigator = createSwitchNavigator( {
  ResolveAuthScreen: ResolveAuthScreen,
  loginFlow: createStackNavigator( {
    Signin: SigninScreen,
    Signup: SignupScreen
  } ),
  mainFlow: createBottomTabNavigator( {
    workoutListFlow,
    TrackCreate: TrackCreateScreen,
    Account: accountFlow
  } )
} );

workoutListFlow.navigationOptions = {
  title: 'Workouts',
  tabBarIcon:  <FontAwesome name='th-list' size={20} />
};
accountFlow.navigationOptions = {
  title: 'Account',
  tabBarIcon:  <FontAwesome name='gear' size={20} />
};

const App = createAppContainer( switchNavigator );

export default () => {
  return (
      <ExerciseProvider>
        <WorkoutProvider>
          <TrackProvider>
            <LocationProvider>
              <AccountProvider>
                <AuthProvider>
                  <App ref={ (navigator) => { setNavigator( navigator ) } } />
                </AuthProvider>
              </AccountProvider>
            </LocationProvider>
          </TrackProvider>
        </WorkoutProvider>
      </ExerciseProvider>
  );
};