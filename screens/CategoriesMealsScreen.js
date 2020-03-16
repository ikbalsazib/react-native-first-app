import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

import {CATEGORIES} from '../data/dummyData';
import Color from '../constants/Color';
import MealFlatList from '../components/MealFlatList';
import DefaultText from '../components/DefaultText';

const CategoriesMealsScreen = props => {
  const catId = props.navigation.getParam('categoryId');
  const availableMeals = useSelector(state => state.meals.filteredMeals);
  const displayMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0,
  );
  if (displayMeals.length === 0) {
    return (
      <View style={styles.screen}>
        <DefaultText>No meals found! Maybe check your filters</DefaultText>
      </View>
    );
  }
  return <MealFlatList listData={displayMeals} navigation={props.navigation} />;
};

CategoriesMealsScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam('categoryId');
  const selectedCat = CATEGORIES.find(data => data.id === catId);

  return {
    headerTitle: selectedCat.title,
    headerStyle: {
      backgroundColor: Color.warn,
    },
    headerTintColor: Color.light,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    width: '100%',
  },
});

export default CategoriesMealsScreen;
