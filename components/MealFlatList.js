import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import MealItem from './MealItem';
import {useSelector} from 'react-redux';

const MealFlatList = props => {
  const favoriteMeals = useSelector(state => state.meals.favouriteMeals);
  const renderMealItem = itemData => {
    const isFav = favoriteMeals.some(meal => meal.id === itemData.item.id);
    return (
      <MealItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        image={itemData.item.imageUrl}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'MealDetails',
            params: {
              mealId: itemData.item.id,
              mealTitle: itemData.item.title,
              isFavourite: isFav,
            },
          });
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        keyExtractor={item => item.id}
        renderItem={renderMealItem}
        style={styles.listItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    width: '100%',
  },
});

export default MealFlatList;
