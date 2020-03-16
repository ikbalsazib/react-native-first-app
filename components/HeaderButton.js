import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import Color from '../constants/Color';
import FontAwesome5 from 'react-native-vector-icons/AntDesign';

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={FontAwesome5}
      iconSize={23}
      solid
      color={Color.light}
    />
  );
};

export default CustomHeaderButton;
