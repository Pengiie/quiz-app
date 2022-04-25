import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Button } from "react-native";
import React from 'react';
import auth from "@react-native-firebase/auth"
GoogleSignin.configure({
    webClientId: process.env.GOOGLE_CLIENT_ID
});

interface SigninButtonProps {
    title: string
}

const SigninButton = ({title}: SigninButtonProps) => {
    const googleSignIn = async () => {
        const { idToken } = await GoogleSignin.signIn();
        const googleCredentials =  auth.GoogleAuthProvider.credential(idToken);
        auth().signInWithCredential(googleCredentials);
    }

    return (
        <Button title={title} onPress={() => googleSignIn().catch((result) => console.log(result))}/>
    );
}

export default SigninButton;