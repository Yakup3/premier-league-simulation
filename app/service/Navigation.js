import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
import { Image } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
/**
 * ? Local Imports
 */
import { SCREENS } from "../screens/shared-constants";
// ? Screens
import MatchesScreen from "../screens/MatchesScreen";
import StandingsScreen from "../screens/StandingsScreen";

// ? If you want to use stack or tab or both
const Tab = createBottomTabNavigator();

const Navigation = () => {

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: { position: 'absolute', height: '8%', backgroundColor: '#808080' },
                    headerShown: false,
                    tabBarActiveTintColor: '#007AFF',
                    tabBarInactiveTintColor: '#fff',
                    tabBarLabelStyle: { fontSize: 18 },
                }}
            >
                <Tab.Screen name={SCREENS.MATCHES}
                    component={MatchesScreen}
                    options={{
                        tabBarLabel: 'Matches',
                        tabBarIcon: ({ size }) => (
                            <Image
                                source={
                                    require('../assets/soccer-ball.png')
                                }
                                style={{
                                    width: size,
                                    height: size,
                                    borderRadius: size,
                                }}
                            />
                        ),
                    }}
                />
                <Tab.Screen name={SCREENS.STANDINGS} component={StandingsScreen}
                    options={{
                        tabBarLabel: 'Standings',
                        tabBarIcon: ({ size }) => (
                            <Image
                                source={
                                    require('../assets/standings.png')
                                }
                                style={{
                                    width: size,
                                    height: size,
                                    borderRadius: size,
                                }}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;