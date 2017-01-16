import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Forecast extends Component {
  render() {
    return (
      <View style={styles.weatherInfo}>
        <Text style={styles.bigText}>
          {this.props.main}
        </Text>
        <Text style={styles.mainText}>
          Current conditions: {this.props.description}
        </Text>
        <Text style={styles.bigText}>
          {this.props.temp} C
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigText: {
    flex: 2,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#f0f'
  },
  mainText: {
  	flex: 1,
    fontSize: 16,
    textAlign: 'center',
    color: '#0ff',
  },
  weatherInfo: {
    height: 160
  }
});