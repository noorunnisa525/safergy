import React from 'react';
import FastImage from 'react-native-fast-image';

function Image(props) {
  return (
    <FastImage
      style={[props.style]}
      source={props.source}
      resizeMode={props.resizeMode ?? 'contain'}
      {...props}
    />
  );
}

export default Image;
