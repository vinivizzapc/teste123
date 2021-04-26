import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Icon } from 'native-base';
import css from '../style/css';
import { NavigationContainer } from '@react-navigation/native';

function AgendaConsultaScreen ({ navigation }){

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#303f9f"/>
        <View style={css.containerHeader}>
        <View style={css.IconPosicao}>
          <Icon name="menu" onPress={()=>navigation.openDrawer()}/>
        </View>
        </View> 
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Text>AgendaConsultaScreen</Text>
      </View>
    </View>
  );
}

export default AgendaConsultaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
