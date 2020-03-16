import React, {useEffect, useCallback} from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';
import CustomHeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import {toggleFavourite} from '../store/actions/meals';

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailsScreen = props => {
  const mealId = props.navigation.getParam('mealId');
  const availableMeals = useSelector(state => state.meals.meals);
  const currentMealIsFavourite = useSelector(state =>
    state.meals.favouriteMeals.some(meal => meal.id === mealId),
  );
  const selectedMeal = availableMeals.find(data => data.id === mealId);
  const dispatch = useDispatch();
  const toggleFavouriteHandler = useCallback(() => {
    dispatch(toggleFavourite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({toggleFav: toggleFavouriteHandler});
  }, [toggleFavouriteHandler]);

  useEffect(() => {
    props.navigation.setParams({isFavourite: currentMealIsFavourite});
  }, [currentMealIsFavourite]);

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />

        <View style={styles.details}>
          <DefaultText>{selectedMeal.duration}m</DefaultText>
          <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
          <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
        </View>
        <View>
          <Text style={styles.title}>Ingredient</Text>
          {selectedMeal.ingredients.map(ingredient => (
            <ListItem key={ingredient}>{ingredient}</ListItem>
          ))}
          <Text style={styles.title}>Steps</Text>
          {selectedMeal.steps.map(step => (
            <ListItem key={step}>{step}</ListItem>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

MealDetailsScreen.navigationOptions = navigationData => {
  // const mealId = navigationData.navigation.getParam('mealId');
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const toggleFav = navigationData.navigation.getParam('toggleFav');
  const isFavourite = navigationData.navigation.getParam('isFavourite');

  return {
    headerTitle: mealTitle,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favourite"
          iconName={isFavourite ? 'heart' : 'hearto'}
          onPress={toggleFav}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-around',
    width: '100%',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'product-sans-bold',
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#CCC',
    borderWidth: 1,
    padding: 10,
  },
});

export default MealDetailsScreen;
