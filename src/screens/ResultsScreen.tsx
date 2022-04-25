import { NavigationContext, StackActions, NavigationActions, useFocusEffect } from '@react-navigation/native';
import React, { useContext } from 'react';
import {
  BackHandler,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { UserContext } from '../App';
import { getDescription, Results } from '../Results';
import firestore from "@react-native-firebase/firestore"
import SigninButton from '../SigninButton';

interface ResultsScreenProps {
    navigation: any;
    results: Results;
} 

const ResultsScreen = ({navigation, results}: any) => {
    const preventBack = (e: any) => {    
      e.preventDefault();
    };

    var listener: any  = null;

    const onPress = () => {
      listener();
      navigation.navigate("Intro");
    }

    const user = useContext(UserContext);
    
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={onPress} title="Done"/>
            )});
    }, [navigation]);

    const computedResults = Object.keys(results).sort((a, b) => {
        return results[b] - results[a];
    });
    console.log(results);
    console.log(computedResults);

    const topWeight = results[computedResults[0]];

    React.useEffect(() => { return listener = navigation.addListener('beforeRemove', preventBack);}, [navigation]);

    React.useEffect(() => {
        if(user) {
          firestore().collection("Results").add({
            user: user?.uid,
            time: Date.now(),
            results: results
          });
        }
      }, [user]
    );

    return (
      <ScrollView style={{backgroundColor: "white"}}>
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.headerStyle}>Results:</Text>
            <View style={{
              borderBottomColor: '#000058D0',
              borderBottomWidth: 2,
              width: "100%",
              marginTop: 10,
              marginBottom: 20
            }}/>
            {computedResults.map((result: string, index: number) => {
              const progress = results[result] / topWeight;
              console.log(progress);
              return (
                <TouchableOpacity key={index} style={styles.resultsContainer} >
                  <Text style={styles.resultText}>{`${result} - ${Math.round(progress*100)}%`}</Text>
                  <ProgressBar width={200} progress={progress}/>
                </TouchableOpacity>
              );
            })}
            <View style={styles.resultDescription}>
              <Text style={styles.resultHeader}>{`You are mostly ${computedResults[0]}`}</Text>
              <Text style={styles.descriptionText}>{"       "+getDescription(computedResults[0])}</Text>
              {user ? <Button title="View past results" onPress={() => navigation.navigate("PastResults")}/> : <SigninButton title="Sign up with Google to save results" />}
            </View>
        </ScrollView>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      backgroundColor: "white",
      paddingTop: 70,
      paddingHorizontal: "10%",
    },
    headerStyle: {
      color: "black",
      fontSize: 30,
    },
    resultsContainer: {
      marginBottom: 20
    },
    resultText: {
      color: "black",
      fontSize: 20,
      marginRight: 20
    },
    resultDescription: {
      width: "100%",
      marginBottom: 20
    },
    resultHeader: {
      color: "black",
      fontSize: 30,
      textAlign: "center",
      marginTop: 30
    },
    descriptionText: {
      fontSize: 16,
      color: "black",
      textAlign: "left",
      marginBottom: 10
    }
  });
  

export default ResultsScreen;