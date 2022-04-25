import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useContext } from 'react';
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
import { Results } from '../Results';
import auth from '@react-native-firebase/auth'
import { UserContext } from '../App';
import SigninButton from '../SigninButton';

interface IntroScreenProps {
    navigation: any;
    questionIndex: number;
    setQuestionIndex: (index: number) => void;
    setResults: (results: Results) => void;
} 

const IntroScreen = ({navigation, setQuestionIndex, setResults}: IntroScreenProps) => {
    const onPress = () => {
        setQuestionIndex(0);
        setResults({} as Results);
        navigation.navigate('Questions');
    }

    const user = useContext(UserContext);

    return (
        <View style={styles.container}>
            
            <Text style={styles.headerStyle}>Personality Quiz</Text>
            <Button title="What programming language are you?" onPress={onPress}/>
            <View style={styles.authContainer}>
            {user ? <>
              <Text style={styles.nameStyle}>{`Welcome ${user.displayName}!`}</Text>
              <Button title="View past results" onPress={() => navigation.navigate("PastResults")}/>
              <View style={styles.signout}><Button onPress={async () => {
                auth().signOut();
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();

                }} title="Sign out"/></View>
              </> : <SigninButton title="Save your results with Google"/>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    signout: {
      marginTop: 20,
      width: "60%",
      alignSelf: "center"
    },
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    },
    headerStyle: {
      color: "black",
      fontSize: 30,
      marginBottom: 5
    },
    authContainer: {
        bottom: 75,
        position: "absolute"
    },
    nameStyle: {
        color: "black",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 5
    }
  });
  

export default IntroScreen;