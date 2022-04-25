/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { createContext, useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer, useLinkProps, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntroScreen from './screens/IntroScreen';
import QuestionScreen from './screens/QuestionScreen';
import { PointedResult, questions } from './Questions';
import ResultsScreen from './screens/ResultsScreen';
import { Results } from './Results';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import PastResultsScreen from './screens/PastResultsScreen';

const Stack = createNativeStackNavigator();

export const UserContext = createContext<null | FirebaseAuthTypes.User>(null);

const App = () => {

  const [questionIndex, setQuestionIndex] = useState(0);
  const [results, setResults] = useState({} as Results);
  const [user, setUser] = useState<null | FirebaseAuthTypes.User>(null);

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
  }

  useEffect(() => {
    if(user)
      setUser(null);
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  
  return (
    <NavigationContainer>
      <UserContext.Provider value={user}>
        <Stack.Navigator initialRouteName="Intro" screenOptions={{animation: "none"}}>
          <Stack.Screen name="Intro" options={{headerShown: false}}>
            {props => <IntroScreen {...props} questionIndex={questionIndex} setQuestionIndex={setQuestionIndex} setResults={setResults}/>}
          </Stack.Screen>
          <Stack.Screen name="Questions" options={{title: `Question ${questionIndex+1} of ${questions.length}`, headerBackVisible: false}}>
            {props => <QuestionScreen {...props} questionIndex={questionIndex} setQuestionIndex={setQuestionIndex} results={results} setResults={setResults}/>}
          </Stack.Screen>
          <Stack.Screen name="Results" options={{title: `Results`, headerBackVisible: false, headerTitleAlign: "center"}}>
            {props => <ResultsScreen {...props} results={results}/>}
          </Stack.Screen>
          <Stack.Screen name="PastResults" options={{title: `Past Results`, headerBackVisible: true, headerTitleAlign: "center"}}>
            {props => <PastResultsScreen {...props}/>}
          </Stack.Screen>
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
};


export default App;
