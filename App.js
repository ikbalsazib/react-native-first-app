import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import MealNavigator from './navigations/MealNavigator';
import SplashScreen from 'react-native-splash-screen';
import mealsReducer from './store/reducers/meals';

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer,
});

const store = createStore(rootReducer);

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <MealNavigator />
      </Provider>
    );
  }
}
