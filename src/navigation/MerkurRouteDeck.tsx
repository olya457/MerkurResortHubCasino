import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AmberDesk} from '../starlitScreens/AmberDesk';
import {CalendarGlow} from '../starlitScreens/CalendarGlow';
import {ConciergeWire} from '../starlitScreens/ConciergeWire';
import {CulinaryLedger} from '../starlitScreens/CulinaryLedger';
import {SalonMap} from '../starlitScreens/SalonMap';
import {TaxiRibbon} from '../starlitScreens/TaxiRibbon';
import type {MerkurTabParamList} from '../velvetCore/routeTypes';
import {palette} from '../velvetCore/palette';
import {FloatingResortBar} from './FloatingResortBar';
import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator<MerkurTabParamList>();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: palette.deep,
    card: palette.deep,
    primary: palette.gold,
    text: palette.text,
  },
};

function renderFloatingBar(props: BottomTabBarProps) {
  return <FloatingResortBar {...props} />;
}

export function MerkurRouteDeck(): React.JSX.Element {
  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        initialRouteName="AmberDesk"
        tabBar={renderFloatingBar}
        screenOptions={{headerShown: false}}>
        <Tab.Screen name="AmberDesk" component={AmberDesk} options={{tabBarLabel: 'Stay'}} />
        <Tab.Screen name="SalonMap" component={SalonMap} options={{tabBarLabel: 'Venues'}} />
        <Tab.Screen name="CulinaryLedger" component={CulinaryLedger} options={{tabBarLabel: 'Dining'}} />
        <Tab.Screen name="CalendarGlow" component={CalendarGlow} options={{tabBarLabel: 'Events'}} />
        <Tab.Screen name="TaxiRibbon" component={TaxiRibbon} options={{tabBarLabel: 'Taxi'}} />
        <Tab.Screen name="ConciergeWire" component={ConciergeWire} options={{tabBarLabel: 'Help'}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
