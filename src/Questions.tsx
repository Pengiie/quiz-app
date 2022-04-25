export enum QuestionType {
    Single,
    Multiple,
    Ranged,
    FreeResponse
}

export interface Question {
    question: string,
    type: QuestionType,
    weight: number,
    answers: Answer[]
};

export interface Answer {
    text: string,
    results: PointedResult[]
}

export interface PointedResult {
    result: Result,
    weight: number,
}

export enum Result {
    Java = "Java", Kotlin = "Kotlin", Swift = "Swift", Javascript = "Javascript", Python = "Python", Cpp = "C++", Go = "Go"
}

export const questions: Question[] = [
    {
        question: "Which of the following do you like more?",
        type: QuestionType.Single,
        weight: 1,
        answers: [
            {
                text: "Dogs",
                results: [
                    {
                        result: Result.Java, 
                        weight: 1
                    }
                ],
            },
            {
                text: "Cats",
                results: [
                    {
                        result: Result.Cpp, 
                        weight: 1
                    },
                    {
                        result: Result.Python,
                        weight: 1
                    }
                ],
            },
            {
                text: "Birds",
                results: [
                    {
                        result: Result.Kotlin, 
                        weight: 1
                    },
                    {
                        result: Result.Go,
                        weight: 0.5
                    }
                ],
            },
            {
                text: "Fish",
                results: [
                    {
                        result: Result.Python, 
                        weight: 1
                    },
                    {
                        result: Result.Go,
                        weight: 0.5
                    }
                ],
            }
        ]
    },
    {
        question: "You go on a date, which do you do?",
        type: QuestionType.Multiple,
        weight: 5,
        answers: [
            {
                text: "Hug them",
                results: [
                    {
                        result: Result.Java, 
                        weight: 1
                    },
                    {
                        result: Result.Javascript,
                        weight: 3
                    }
                ],
            },
            {
                text: "Kiss them",
                results: [
                    {
                        result: Result.Python, 
                        weight: 1
                    }
                ],
            },
            {
                text: "Murder them",
                results: [
                    {
                        result: Result.Cpp, 
                        weight: 2
                    },
                    {
                        result: Result.Javascript,
                        weight: 2
                    }
                ],
            }
        ]
    },
    {
        question: "Do you like swift?",
        type: QuestionType.Ranged,
        weight: 2,
        answers: [
            {
                text: "No",
                results: [
                    {
                        result: Result.Javascript, 
                        weight: 0.5
                    },
                    {
                        result: Result.Java, 
                        weight: 1
                    },
                    {
                        result: Result.Cpp, 
                        weight: 1
                    },
                    {
                        result: Result.Python, 
                        weight: 2
                    }
                ],
            },
            {
                text: "Yes",
                results: [
                    {
                        result: Result.Swift, 
                        weight: 1
                    }
                ],
            }
        ]
    },
    {
        question: "Which do you prefer?",
        type: QuestionType.Single,
        weight: 2,
        answers: [
            {
                text: "Static typing",
                results: [
                    {
                        result: Result.Cpp,
                        weight: 1
                    },
                    {
                        result: Result.Kotlin,
                        weight: 1
                    },
                    {
                        result: Result.Swift,
                        weight: 1
                    },
                    {
                        result: Result.Java,
                        weight: 1
                    },
                    {
                        result: Result.Go,
                        weight: 1
                    }
                ]
            }, {
                text: "Dynamic typing",
                results: [
                    {
                        result: Result.Python,
                        weight: 1
                    },
                    {
                        result: Result.Javascript,
                        weight: 1,
                    }
                ]
            }
        ]
    },
    {
        question: "Which do you like programming?",
        type: QuestionType.Multiple,
        weight: 1,
        answers: [
            {
                text: "Websites",
                results: [
                    {
                        result: Result.Javascript,
                        weight: 2
                    },
                    {
                        result: Result.Kotlin,
                        weight: 1
                    }
                ]
            },
            {
                text: "Video games",
                results: [
                    {
                        result: Result.Cpp,
                        weight: 4
                    },
                    {
                        result: Result.Python,
                        weight: 2
                    }
                ]
            },
            {
                text: "Backends",
                results: [
                    {
                        result: Result.Javascript,
                        weight: 0.5
                    },
                    {
                        result: Result.Kotlin,
                        weight: 1
                    },
                    {
                        result: Result.Java,
                        weight: 3
                    },
                    {
                        result: Result.Python,
                        weight: 2
                    }
                ]
            },
            {
                text: "Apps",
                results: [
                    {
                        result: Result.Kotlin,
                        weight: 3
                    },
                    {
                        result: Result.Swift,
                        weight: 3
                    }
                ]
            }
        ]
    },
    {
        question: "Describe your ideal home",
        type: QuestionType.FreeResponse,
        weight: 1,
        answers: [
            {
                text: "luxary|giant house|swimming pool|arcade|modern",
                results: [
                    {
                        result: Result.Kotlin,
                        weight: 1
                    },
                    {
                        result: Result.Go,
                        weight: 1
                    },
                    {
                        result: Result.Swift,
                        weight: 1
                    }
                ]
            },
            {
                text: "moderate|normal house|nice garden|relaxing|gaming",
                results: [
                    {
                        result: Result.Python,
                        weight: 1
                    },
                    {
                        result: Result.Java,
                        weight: 1
                    },
                    {
                        result: Result.Cpp,
                        weight: 1
                    },
                    {
                        result: Result.Javascript,
                        weight: 1
                    }
                ]
            }
        ]
    },
    {
        question: "I like to know how things work",
        type: QuestionType.Ranged,
        weight: 1,
        answers: [
            {
                text: "Not really",
                results: [
                    {
                        result: Result.Python,
                        weight: 3
                    },
                    {
                        result: Result.Javascript,
                        weight: 2
                    },
                    {
                        result: Result.Swift,
                        weight: 1
                    }
                ]
            },
            {
                text: "",
                results: [
                    {
                        result: Result.Go,
                        weight: 1
                    },
                    {
                        result: Result.Kotlin,
                        weight: 1
                    }
                ]
            },
            {
                text: "",
                results: [
                    {
                        result: Result.Java,
                        weight: 1
                    }
                ]
            },
            {
                text: "All the time",
                results: [
                    {
                        result: Result.Cpp,
                        weight: 2
                    }
                ]
            }
        ]
    },
    {
        question: "Which meal is best?",
        type: QuestionType.Single,
        weight: 1,
        answers: [
            {
                text: "Breakfast",
                results: [
                    {
                        result: Result.Cpp,
                        weight: 1
                    },
                    {
                        result: Result.Go,
                        weight: 3
                    }
                ]
            },
            {
                text: "Lunch",
                results: [
                    {
                        result: Result.Python,
                        weight: 1
                    },
                    {
                        result: Result.Java,
                        weight: 1
                    }
                ]
            },
            {
                text: "Dinner",
                results: [
                    {
                        result: Result.Kotlin,
                        weight: 1
                    }
                ]
            },
            {
                text: "Dessert",
                results: [
                    {
                        result: Result.Javascript,
                        weight: 1
                    }
                ]
            }
        ]
    },
    {
        question: "How was your day?",
        type: QuestionType.FreeResponse,
        weight: 1,
        answers: [ 
            {
                text: "happy|It was great|best day ever|im so happy|i ate cake|it was amazing", 
                results: [
                    {
                        result: Result.Kotlin,
                        weight: 1
                    }
                ]
            },
            {
                text: "sad|It was kinda sucky|i want to die|just failed my test|got rejected|im a failure|i hate myself", 
                results: [
                    {
                        result: Result.Swift,
                        weight: 100
                    }
                ]
            }
        ]
    },
    {
        question: "Did you like the test?",
        type: QuestionType.Ranged,
        weight: 0,
        answers: [
            {
                text: "No",
                results: []
            },
            {
                text: "Yes",
                results: []
            }
        ]
    }
];