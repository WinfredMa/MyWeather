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
          temp: responseJSON.main.temp
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
          <View style={styles.overlay}>
            <View style={styles.row}>
              <Text style={[styles.mainText, styles.currentCity]}>
                Current weather for {this.state.zip} 
              </Text>
              <View style={styles.zipContainer}>
                <TextInput
                  style={[styles.zipCode, styles.mainText]}
                  onSubmitEditing={(event) => this.handleTextChange(event)}/>
              </View>
            </View>
            <Forecast style={styles.weatherInfo} main={this.state.forecast.main} description={this.state.forecast.description} temp={this.state.forecast.temp}/>
          </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30
  },
  overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.5,
    flexDirection: 'column',
    alignItems: 'center'
  },
  currentCity: {
    flex: 2,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#f0f'
  },
  row: {
    height: 100
  },
  zipContainer: {
    flex: 1,
    height: 45,
    paddingBottom: 5,
    flexDirection: 'column',
    alignItems: 'center'
  },
  zipCode: {
    height: 40,
    fontSize: 20,
    color: '#f0f',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    textAlign: 'center'
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