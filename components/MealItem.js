import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableNativeFeedback,
  Platform,
  ImageBackground,
} from 'react-native';
import Color from '../constants/Color';
import DefaultText from './DefaultText';

const MealItem = props => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.item}>
      <TouchableComponent onPress={props.onSelect}>
        <View>
          <View style={[styles.row, styles.header]}>
            <ImageBackground source={{uri: props.image}} style={styles.bgImg}>
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {props.title}
                </Text>
              </View>
            </ImageBackground>
          </View>

          <View style={[styles.row, styles.details]}>
            <DefaultText>{props.duration}m</DefaultText>
            <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
            <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
          </View>
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 200,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
  },
  header: {
    height: '85%',
  },
  details: {
    height: '15%',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bgImg: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 20,
    fontFamily: 'product-sans-bold',
    color: Color.light,
    textAlign: 'center',
  },
});

export default MealItem;
