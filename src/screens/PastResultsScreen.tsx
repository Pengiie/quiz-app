import { useFocusEffect } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
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
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"

const PastResultsScreen = ({navigation}: any) => {
    const [results, setResults] = useState<FirebaseFirestoreTypes.QueryDocumentSnapshot[]>([]);

    const user = useContext(UserContext);

    React.useEffect(() => {
        if(!user)
            navigation.goBack();
        firestore().collection("Results").where("user", "==", user?.uid).orderBy("time", "asc").get().then((collection) => {
            setResults(collection.docs.reverse());
        }).catch((e) => {
            console.error(e);
        });
      }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.headerStyle}>Results:</Text>
            <View style={{
              borderBottomColor: '#000058D0',
              borderBottomWidth: 2,
              width: "100%",
              marginTop: 10,
              marginBottom: 20
            }}/>
            {results.map((result: FirebaseFirestoreTypes.QueryDocumentSnapshot, index: number) => {
                const data: FirebaseFirestoreTypes.DocumentData = result.data();
                console.log(data);
                const res = data.results;
                const topResult = Object.keys(res).sort((a: string, b: string) => {
                    return res[b] - res[a];
                })[0];
              return (
                <TouchableOpacity key={index} style={styles.resultsContainer} >
                  <Text style={styles.resultText}>{`Top Result - ${topResult}`}</Text>
                  <Text style={styles.timeText}>{`Taken on ${new Date(data.time).toLocaleString()}`}</Text>
                </TouchableOpacity>
              );
            })}
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
    timeText: {
        color: "black",
        fontSize: 16,
        marginRight: 20
      },
    resultDescription: {
      width: "100%",
    },
    resultHeader: {
      color: "black",
      fontSize: 30,
      textAlign: "center",
      marginTop: 20
    },
    descriptionText: {
      fontSize: 16,
      color: "black",
      textAlign: "left",
    }
  });
  

export default PastResultsScreen;