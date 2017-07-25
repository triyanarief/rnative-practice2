import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';



var LoadingBar = React.createClass({
  getInitialState() {
      return {
        animating: {true},
      };
  },
  render(){
    return (
      <ActivityIndicator
        animating={this.state.animating}
        style={[styles.centering, {height: 80}]}
        size="large"
      />
    );
  },
});

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  gray: {
    backgroundColor: '#cccccc',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
  },
});

module.exports = LoadingBar;
