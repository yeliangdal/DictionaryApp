import React, {Component} from 'React';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import TranslationView from './translationView';

export default class DictionaryApp extends Component {

  constructor(props) {
		super(props);
    this.state = {
      lang: 'zho',
      text: '',
      translation: {},
    };
	}


  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        endFillColor= '#ffffcc'>
        <Text style={styles.instructions}>
          Please select a language from the list:
        </Text>
        <View style ={styles.pickerView}>

          <Picker
            style={styles.picker}
            selectedValue={this.state.lang}
            onValueChange={(lang) => {this.changeLang(lang)}}>
            <Picker.Item
              label={'German'} value={'deu'}/>
            <Picker.Item
              label={'Chinese'} value={'zho'}/>
            <Picker.Item
              label={'French'} value={'fra'}/>
          </Picker>
        </View>

        <TextInput
          style={styles.textInput}
          onChangeText={(textString) => {this.changeText(textString)}}
          value={this.state.text}
          placeholderTextColor= '#99ccff'
          placeholder= 'Input English word here...'
        />

        <TouchableOpacity
          onPress={this._onPressButton.bind(this)}>
            <View style={styles.buttonView}>
              <Text style={styles.button}>Translate</Text>
            </View>
        </TouchableOpacity>


        <TranslationView
          translation = {this.state.translation}
          style = {styles.translationView}>
        </TranslationView>
      </ScrollView>
    );
  }

  changeLang (language) {
      this.setState({
        lang:language,
      });
  }

  changeText (textString) {
      this.setState({
        text:textString,
      });
  }

  _onPressButton() {

    let REQUEST_URL = 'https://glosbe.com/gapi/translate?from=eng&dest='+this.state.lang+'&format=json&phrase='+this.state.text+'&pretty=true';

    //console.log('states1: ', this.state);

    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          translation: responseData,
        });
        console.log('states2: ', this.state);
      })
      .done();


  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  instructions: {
    fontSize: 15,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  picker: {
    color: '#003366',
    justifyContent: 'center',
  },

  pickerView: {
    backgroundColor: '#ffffcc',
    justifyContent: 'center',
    width: 200,
    height: 45,
  },

  textInput: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 2,
  },

  buttonView: {
    width: 180,
    height: 30,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

  button: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },

  translationView: {
    alignItems: 'stretch',

  },
});
