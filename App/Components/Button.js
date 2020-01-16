import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Button as NButton, Text } from 'native-base'
import { Colors, Fonts } from '../Themes';
import { SvgIcon } from './SvgIcon';

export class Button extends Component {
  // Prop type warnings
  static propTypes = {
    name: PropTypes.string,
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    onPress: PropTypes.func,
    backgroundColor: PropTypes.any,
    borderColor: PropTypes.any,
    color: PropTypes.any,
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
    padding: PropTypes.number,
    opacity: PropTypes.number,
    style: PropTypes.any,
    disabled: PropTypes.bool
  }
  
  // Defaults for props
  static defaultProps = {
    onPress: () => {}
  }

  render () {
    const {
      name = "",
      leftIcon = "",
      rightIcon = "",
      onPress,
      backgroundColor = Colors.primary.base,
      borderColor = Colors.white.base,
      color = Colors.white.base,
      marginTop = 0,
      marginLeft = 0,
      marginRight = 0,
      marginBottom = 0,
      padding = 0,
      opacity = 1,
      style = {},
      disabled = false,
      ...rest
    } = this.props
    return (
      <NButton
        onPress={onPress}
        style={{
          width: '100%',
          backgroundColor: disabled ? Colors.black.light : backgroundColor,
          marginTop,
          marginBottom,
          marginLeft,
          marginRight,
          padding,
          opacity,
          borderColor,
          ...style
        }}
        disabled={disabled}
        {...rest}
      >
        {leftIcon !== '' && <SvgIcon
          name={leftIcon}
          color={color}
        />}
        <Text
          style={{
            color,
            fontFamily: Fonts.type.regular,
            fontSize: Fonts.size.medium,
            opacity: 1
          }}
        >
          {name}
        </Text>
        {rightIcon !== '' && <SvgIcon
          name={rightIcon}
          color={color}
        />}
      </NButton>
    )
  }
}
