import { Slider } from '@miblanchard/react-native-slider';
import React, { useState } from 'react';
import {
    BackHandler,
  Button,
  SafeAreaView,
  ScrollView,
  SegmentedControlIOSBase,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import { openapi } from '../openai';
import { Answer, PointedResult, questions, QuestionType, Result } from '../Questions';
import { Results } from '../Results';
import 'react-native-url-polyfill/auto';
import { useFocusEffect } from '@react-navigation/native';

interface QuestionScreenProps {
    navigation: any;
    questionIndex: number;
    setQuestionIndex: (index: number) => void;
    results: Results;
    setResults: (results: Results) => void;
} 

const QuestionScreen = ({navigation, questionIndex, setQuestionIndex, results, setResults}: QuestionScreenProps) => {

    const [switchState, setSwitchState] = useState(([] as boolean[]).fill(false, 0, questions.length));
    const [slider, setSlider] = useState(0.5);

    const currentQuestion = questions[questionIndex];

    const nextQuestion = () => {
        if(questionIndex + 1 === questions.length) {
            navigation.navigate('Results');
            return;
        }
        setQuestionIndex(questionIndex + 1);
        navigation.push('Questions');
    }

    useFocusEffect(React.useCallback(() => {
        const onBackPress = () => {
            setQuestionIndex(Math.max(questionIndex - 1, 0));
            return false;
        };

        BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []))

    const singleChoiceQuestion = currentQuestion.answers.map((answer: Answer, index: number) => {
        return (
            <View key={index} style={styles.button}>
                <Button title={answer.text} onPress={() => {
                    answer.results.forEach((result: PointedResult) => {
                        results[result.result] = (results[result.result] || 0) + result.weight * currentQuestion.weight;
                    });
                    nextQuestion();
                    }}
                />
        </View>);
    });

    const multipleChoiceQuestion = (<>
        {currentQuestion.answers.map((answer: Answer, index: number) => {
        return (
        <View key={index} style={styles.button}>
            <View style={styles.multipleRow}>
                <Switch trackColor={{false: "#A6A5A7"}} value={switchState[index]} onValueChange={(value) => {
                    const newState = [...switchState]; 
                    newState[index] = value; 
                    setSwitchState(newState)}
                }/>
                <Text style={styles.multipleText}>{answer.text}</Text>
            </View>
        </View>
        );
    })}
        <View style={styles.multipleSubmit}><Button title="Submit" onPress={() => {
            var i = 0;
            switchState.forEach((value: boolean, index: number) => {
                if(value) {
                    i++;
                    currentQuestion.answers[index].results.forEach((result: PointedResult) => {
                        results[result.result] = (results[result.result] || 0) + result.weight * currentQuestion.weight;
                    });
                }
            });
            if(i === 0)
                return;
            nextQuestion();
        }}/></View>
    </>);

    const rangedQuestion = (
    <>
    <View style={styles.rangedContainer}>
        <Slider value={slider} onValueChange={value => {setSlider(value as number); }} />
        <View style={styles.rangedTextContainer}>
            <Text style={styles.rangedText}>{currentQuestion.answers[0].text}</Text>
            <Text style={styles.rangedText}>{currentQuestion.answers[currentQuestion.answers.length-1].text}</Text>
        </View>
    </View>
    <View style={styles.rangedSubmit}>
        <Button title="Submit" onPress={() => {
            const answer = currentQuestion.answers[Math.floor(slider * (currentQuestion.answers.length - 1))];
            answer.results.forEach((result: PointedResult) => {
                results[result.result] = (results[result.result] || 0) + result.weight * currentQuestion.weight;
            });
            nextQuestion();
        }}/>
    </View>
    </>
    );

    const [text, setText] = useState("");

    const freeResponseQuestion = (
    <>
        <TextInput multiline={true} style={styles.freeResponseText} value={text} onChangeText={(text) => {setText(text)}} />
        <View style={styles.rangedSubmit}>
        <Button title="Submit" onPress={async () => {
            const answer: PointedResult = {result: Result.Kotlin, weight: 1};
            results[answer.result] = (results[answer.result] || 0) + answer.weight * currentQuestion.weight;
            try {
                const examples: any[] = [];
                currentQuestion.answers.forEach((answer: Answer) => {
                    const arr = answer.text.split("|");
                    arr.forEach((text: string) => {
                        if(text !== arr[0])
                            examples.push([text, arr[0]])
                    });
                });
                const classification = await openapi.createClassification({
                    model: "davinci",
                    query: text,
                    examples: examples
                });
                console.log(classification.data.label);
                const answer: Answer | undefined = currentQuestion.answers.find((answer: Answer) => {
                    return answer.text.split("|")[0].toLowerCase() === classification.data.label!.toLowerCase();
                });
                if(answer !== undefined)
                    answer.results.forEach((result: PointedResult) => {
                        results[result.result] = (results[result.result] || 0) + result.weight * currentQuestion.weight;
                    });
            } catch (e) {
                console.log(e);
            }
            
            nextQuestion();
        }}/>
    </View>
    </>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerStyle}>{currentQuestion.question}</Text>
            {
            currentQuestion.type === QuestionType.Single ? singleChoiceQuestion : 
                (currentQuestion.type === QuestionType.Multiple ? multipleChoiceQuestion : 
                    (currentQuestion.type === QuestionType.Ranged ? rangedQuestion : 
                        (currentQuestion.type === QuestionType.FreeResponse ? freeResponseQuestion : null)))
            }
        </View>
    );
};

const styles = StyleSheet.create({
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
      marginBottom: 20,
      textAlign: "center"
    },
    button: {
        marginTop: 15,
        marginBottom: 15,
        width: "50%"
    },
    multipleRow: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "baseline",

        minHeight: 300,
        minWidth: "70%",
        marginTop: 10,
        marginBottom: 10,

    },
    multipleText: {
        fontSize: 20,
        marginLeft: 15,
        color: "black",
        alignSelf: "center"
    },
    multipleSubmit: {
        marginTop: 40,
        width: "70%"
    },
    rangedContainer: {
        width: "70%"
    },
    rangedTextContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "space-between",
        minHeight: 60
    },
    rangedText: {
        fontSize: 17,
        color: "black"
    },
    rangedSubmit: {
        width: "70%",
        marginTop: 50
    },
    freeResponseText: {
        color: "black",
        backgroundColor: "#00000010",
        width: "80%",
        padding: 10,
        height: "30%",
        textAlignVertical: "top"
    }
  });

export default QuestionScreen;