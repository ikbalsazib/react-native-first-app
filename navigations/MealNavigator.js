import React from 'react';
import {Platform, Text, StyleSheet} from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  createAppContainer,
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoriesMealsScreen from '../screens/CategoriesMealsScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';
import Color from '../constants/Color';
import FavouritesScreen from '../screens/FavouritesScreen';
import FilteresScreen from '../screens/FilteresScreen';

const defaultStackNavOptions = {
  headerTitle: 'My App',
  headerStyle: {
    backgroundColor: Color.primary,
  },
  headerTitleStyle: {
    fontFamily: 'product-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'product-sans-regular',
  },
  headerTintColor: Color.light,
};

const MealNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
    },
    CategoriesMeals: {
      screen: CategoriesMealsScreen,
    },
    MealDetails: {
      screen: MealDetailsScreen,
    },
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  },
);

const FavNavigator = createStackNavigator(
  {
    Favourites: FavouritesScreen,
    mealDetails: MealDetailsScreen,
  },
  {defaultNavigationOptions: defaultStackNavOptions},
);

const filterNavigator = createStackNavigator(
  {
    Filters: {
      screen: FilteresScreen,
    },
  },
  {defaultNavigationOptions: defaultStackNavOptions},
);

const tabScreenConfig = {
  Meals: {
    screen: MealNavigator,
    navigationOptions: {
      tabBarIcon: tabBarInfo => {
        return (
          <Ionicons
            name={'ios-restaurant'}
            size={25}
            color={tabBarInfo.tintColor}
          />
        );
      },
      tabBarColor: Color.primary,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{fontFamily: 'product-sans-bold'}}>Meals</Text>
        ) : (
          'Meals'
        ),
    },
  },
  Favourites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: tabBarInfo => {
        return (
          <Ionicons name={'ios-star'} size={25} color={tabBarInfo.tintColor} />
        );
      },
      tabBarColor: Color.warn,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{fontFamily: 'product-sans-bold'}}>Favourite</Text>
        ) : (
          'Meals'
        ),
    },
  },
};

const mealsFavTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: Color.light,
        shifting: true,
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Color.primary,
        },
      });

const mainNavigator = createDrawerNavigator(
  {
    Favourites: {
      screen: mealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: 'Meals',
      },
    },
    Filters: filterNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Color.primary,
      labelStyle: {
        fontFamily: 'product-sans-regular',
      },
    },
  },
);


export default createAppContainer(mainNavigator);
