import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import HomeScreen from '../screens/HomeScreen';
import PrevencoesScreen from '../screens/PrevencoesScreen';
import MapsScreen from '../screens/MapsScreen';
import MinhasConsultasScreen from '../screens/MinhasConsultasScreen';
import AgendaConsultaScreen from '../screens/AgendaConsultaScreen';
import FavoritosScreen from '../screens/FavoritosScreen';
import ListUsuarioScreen from '../screens/ListUsuarioScreen';
import ListLocais from '../screens/ListLocaisScreen';
import ListPrevencoes from '../screens/ListPrevencoesScreen';
import ListAgendas from '../screens/ListAgendaScreen';
import { Ionicons, Feather, FontAwesome5, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import CustomDrawerContent from './CustomDrawerContent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InserirUsuario from '../screens/InserirUsuario';
import InserirLocais from '../screens/InserirLocais';
import InserirPrevencoes from '../screens/InserirPrevencoes';
import InserirAgendas from '../screens/InserirAgenda';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerAdm from '../components/DrawerAdm';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Usuarios = ({navigation}) => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen
        name="Usuarios"
        component={ListUsuarioScreen}
      />
    </Stack.Navigator>
  );
};

const inserirUsu = ({navigation}) => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen
        name="InserirUsuario"
        component={InserirUsuario}
      />
    </Stack.Navigator>
  );
};

const Locais = ({navigation}) => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen
        name="Locais"
        component={ListLocais}
      />
    </Stack.Navigator>
  );
};

const inserirLocais = ({navigation}) => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen
        name="InserirLocais"
        component={InserirLocais}
      />
    </Stack.Navigator>
  );
};

const Prevencoes = ({navigation}) => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen
        name="Prevencoes"
        component={ListPrevencoes}
      />
    </Stack.Navigator>
  );
};

const inserirPrevencoes = ({navigation}) => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen
        name="InserirPrevencoes"
        component={InserirPrevencoes}
      />
    </Stack.Navigator>
  );
};

const Agendas = ({navigation}) => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen
        name="Agendas"
        component={ListAgendas}
      />
    </Stack.Navigator>
  );
};

const inserirAgendas = ({navigation}) => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen
        name="InserirAgendas"
        component={InserirAgendas}
      />
    </Stack.Navigator>
  );
};

function DrawerContent() {
  const [status , setStatus] = useState(0);

  useEffect(() => {
    async function CheckUser(){
      const usuario = await AsyncStorage.getItem('user');
      const jsonValue = JSON.parse(usuario);
      setStatus(jsonValue.status);
    }

    CheckUser();
  }, []);

  return (
    status == 0 ? (
      <Drawer.Navigator drawerContent={props=><CustomDrawerContent {...props}/>} initialRouteName="Home">
        <Drawer.Screen options={{ title: 'Home',  drawerIcon: ({focused, size}) => (<Ionicons name="home" size={24} color="black" />),}} name="Home" component={HomeScreen} />
        <Drawer.Screen options={{ title: 'Prevenções',  drawerIcon: ({focused, size}) => (<FontAwesome5 name="shield-virus" size={24} color="black" />),}} name="Prevenções" component={PrevencoesScreen} />
        <Drawer.Screen options={{ title: 'Localizar',  drawerIcon: ({focused, size}) => (<Feather name="map-pin" size={24} color="black" />),}} name="Localizar" component={MapsScreen} />
        <Drawer.Screen options={{ title: 'Minhas Consultas',  drawerIcon: ({focused, size}) => (<MaterialCommunityIcons name="clipboard-pulse-outline" size={24} color="black" />),}} name="Minhas Consultas" component={MinhasConsultasScreen} />
        <Drawer.Screen options={{ title: 'Agendar Consultas',  drawerIcon: ({focused, size}) => (<FontAwesome5 name="calendar-alt" size={24} color="black" />),}} name="Agendar Consultas" component={AgendaConsultaScreen} />
        <Drawer.Screen options={{ title: 'Favoritos',  drawerIcon: ({focused, size}) => (<Ionicons name="star" size={24} color="black" />),}} name="Favoritos" component={FavoritosScreen} />
      </Drawer.Navigator>
    )
    :
    <Drawer.Navigator
    drawerContent={(props) => {
      const filteredProps = {
        ...props,
        state: {
          ...props.state,
          routeNames: props.state.routeNames.filter(
            (routeName) => {
              routeName !== 'InserirUsuario'
              && routeName !== 'InserirLocais'
              && routeName !== 'InserirPrevencoes'
              && routeName !== 'InserirAgendas'
            },
          ),
          routes: props.state.routes.filter(
            (route) =>
              route.name !== 'InserirUsuario'
              && route.name !== 'InserirLocais'
              && route.name !== 'InserirPrevencoes'
              && route.name !== 'InserirAgendas'
          ),
        },
      };
      return (
        <DrawerAdm {...filteredProps}/>
      );
    }}>
    <Drawer.Screen
      name="Usuarios"
      options={{drawerLabel: 'Usuarios'}}
      component={Usuarios}
    />
    <Drawer.Screen
      name="Locais"
      options={{drawerLabel: 'Locais'}}
      component={Locais}
    />
    <Drawer.Screen
      name="Prevencoes"
      options={{drawerLabel: 'Prevenções'}}
      component={Prevencoes}
    />
    <Drawer.Screen
      name="agendas"
      options={{drawerLabel: 'Agendas'}}
      component={Agendas}
    />
    <Drawer.Screen
      name="InserirUsuario"
      options={{drawerLabel: 'Inserir Usuario'}}
      component={inserirUsu}
    />
    <Drawer.Screen
      name="InserirLocais"
      options={{drawerLabel: 'Inserir Locais'}}
      component={inserirLocais}
    />
    <Drawer.Screen
      name="InserirPrevencoes"
      options={{drawerLabel: 'Inserir Prevencoes'}}
      component={inserirPrevencoes}
    />
    <Drawer.Screen
      name="InserirAgendas"
      options={{drawerLabel: 'Inserir Agendas'}}
      component={inserirAgendas}
    />
  </Drawer.Navigator>
  );
}

export default DrawerContent;

const styles = StyleSheet.create({
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 15 ,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
      marginBottom: 15,
      borderTopColor: '#f4f4f4',
      borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemList: {
      marginTop:10,
  }
});