import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import Color from '../constants/Color';
import MealFlatList from '../components/MealFlatList';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';

const FavouritesScreen = props => {
  const favMeals = useSelector(state => state.meals.favouriteMeals);
  if (favMeals.length === 0 || !favMeals) {
    return (
      <View style={styles.content}>
        <DefaultText>No Favourite Meals Added Yet!</DefaultText>
      </View>
    );
  }
  // const favMeals = availableMeals.filter(meal => meal.id === 'm1' || meal.id === 'm2');
  return <MealFlatList listData={favMeals} navigation={props.navigation} />;
};

FavouritesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Favourite',
    headerStyle: {
      backgroundColor: Color.warn,
    },
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favourite"
          iconName="menu-fold"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavouritesScreen;
