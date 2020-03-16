import React from 'react';
import {StyleSheet, StatusBar, FlatList, SafeAreaView} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import {CATEGORIES} from '../data/dummyData';
import Color from '../constants/Color';
import CategoryGridTile from '../components/CategoryGridTile';
import CustomHeaderButton from '../components/HeaderButton';

const CategoriesScreen = props => {
  // Grid View Render Item..
  const renderGridItem = itemData => {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Color.primaryLight}
        />
        <CategoryGridTile
          title={itemData.item.title}
          color={itemData.item.color}
          onSelect={() => {
            props.navigation.navigate({
              routeName: 'CategoriesMeals',
              params: {
                categoryId: itemData.item.id,
              },
            });
          }}
        />
      </SafeAreaView>
    );
  };

  // Main..
  return (
    <FlatList
      numColumns={2}
      keyExtractor={(item, index) => item.id}
      data={CATEGORIES}
      renderItem={renderGridItem}
    />
  );
};

CategoriesScreen.navigationOptions = navData => {
  return {
    title: 'Meals Category',
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
  screen: {
    flex: 1,
  },
});

export default CategoriesScreen;
