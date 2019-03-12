import React, { Component } from 'react'
import {
    Text, StyleSheet, View,
    TouchableOpacity, TextInput,
    Dimensions, KeyboardAvoidingView,
    Platform, TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import firebase from "react-native-firebase";

const { width, height } = Dimensions.get('window')

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: ''
        }
    }

    handlesLogin = () => {
        const { email, password } = this.state
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('Main'))
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior={(Platform.OS === 'ios') ? "padding" : null}
            >
                <TouchableWithoutFeedback
                    style={styles.container}
                    onPress={() => Keyboard.dismiss()}
                >
                    <View style={styles.container}>
                        <Text style={styles.titleLogin}>
                            Login
                        </Text>
                        <View style={styles.viewContent}>
                            <Text style={styles.textEmailPassword}>
                                Email
                            </Text>
                            <TextInput
                                style={styles.inputText}
                                autoCapitalize='none'
                                autoCorrect={false}
                                returnKeyType='next'
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                                onSubmitEditing={() => this.refs.txtPassword.focus()}
                            />
                            <Text style={styles.textEmailPassword}>
                                Password
                            </Text>
                            <TextInput
                                ref={'txtPassword'}
                                style={styles.inputText}
                                autoCapitalize='none'
                                autoCorrect={false}
                                secureTextEntry={true}
                                returnKeyType='go'
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}
                                onSubmitEditing={() => { this.handlesLogin() }}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.buttonLogin}
                            onPress={() => { this.handlesLogin() }}
                        >
                            <Text style={styles.titleButtonLogin}>
                                Login
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonToSignUp}
                            onPress={() => this.props.navigation.navigate('SignUp')}
                        >
                            <Text style={styles.titleButton}>
                                Don't have an account? Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    titleLogin: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 15,

    },
    viewContent: {
        width: width - 100,
        height: 160,
        paddingLeft: 10,
        justifyContent: 'center',
        // backgroundColor: 'red'
    },
    textEmailPassword: {
        fontSize: 16,
    },
    inputText: {
        height: 35,
        width: width - 110,
        borderWidth: 1,
        borderColor: 'grey',
        paddingHorizontal: 5,
        marginVertical: 5,
    },
    buttonLogin: {
        width: 120,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        borderWidth: 1,
        borderColor: 'grey'
    },
    buttonToSignUp: {
        width: 200,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 15
    },
    titleButton: {
        fontSize: 14
    },
    titleButtonLogin: {
        fontSize: 25
    }
})
