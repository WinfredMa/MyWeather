import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image
} from 'react-native';
import Forecast from './Forecast';

export default class MyWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: '',
      forecast: {
        main: 'Clouds',
        description: 'few clouds',
        temp: 15
      }
    };
  }
  handleTextChange(event) {
    var zip = event.nativeEvent.text;
    this.setState({zip: zip});
    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + zip + '&&APPID=7cc8ac3892a581fef5032f3bba65b94b')
    .then((response) => response.json())
    .then((responseJSON) => {
      this.setState({
        forecast: {
          main: responseJSON.weather[0].main,
          description: responseJSON.weather[0].description,
          temp: responseJSON.weather[0].temp
        }
      });
    }).catch((error) => {
      console.warn(error);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./img/flowers.png')} style={styles.backdrop}>
          <Text style={styles.welcome}>
            You input {this.state.zip}.
          </Text>
          <Forecast style={styles.weatherInfo} main={this.state.forecast.main} description={this.state.forecast.description} temp={this.state.forecast.temp}/>
        </Image>
        <TextInput style={styles.input}  onSubmitEditing={this.handleTextChange.bind(this)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    fontSize: 20,
    borderWidth: 2,
    height: 40
  },
  weatherInfo: {
    height: 80
  },
  backdrop: {
    resizeMode:'contain',
    flex: 1,
    flexDirection: 'column'
  }
});