import React, {Component} from 'React';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class TranslationView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style = {styles.translationView}>
        {this.renderTranslationList()}
      </View>
    );
  }

  renderTranslationList() {
    let obj = this.props.translation;
    if(Object.keys(obj).length === 0 && obj.constructor === Object){
      return (
        <Text>No translation found.</Text>
      );
    }
    //console.log('props2: ',this.props.translation);
    let translation= this.props.translation;
    let translationArray = translation.tuc;
    let translationList = [];
    translationList.push(<Text key='start'>Translation:</Text>);
    translationArray.forEach((item,index)=> {
      if(item.phrase && index < 10){
        translationList.push(
          <Text
            key={index+1}
            style= {styles.translationText}>
            {index+1}.
            {item.phrase.text}
          </Text>
        );
      }
    });
    return translationList;
    //translationList.push(<Text>{this.props.translation.message}</Text>);
  }
}

const styles = StyleSheet.create({
  translationText: {
    fontSize: 14,
    textAlign: 'left',
    color: 'black',
  },

  translationView: {
    alignItems: 'stretch',
  },
});
