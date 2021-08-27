import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Audio } from 'expo-av';

export default class PhonicSoundButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pressedButtonIndex: ''
        }
    }
    playSound = async (soundB) => {
        var soundLink = 'https://s3-whitehatjrcontent.whjr.online/phones/'+soundB+'.mp3';
        //console.log(soundLink);
        await Audio.Sound.createAsync(
            { uri: soundLink },
            { shouldPlay: true }
        )
    }
    render() {
        console.log(this.props.soundChunk);
        return (
            <TouchableOpacity style={this.state.pressedButtonIndex === this.props.buttonIndex
                ? [styles.phonicB, { backgroundColor: 'white' }]
                : [styles.phonicB, { backgroundColor: 'red' }]
            }
                onPress={() => {
                    this.playSound(this.props.soundChunk);
                    //console.log(this.props.soundChunk);
                    this.setState({
                        pressedButtonIndex: this.props.buttonIndex
                    })
                }}>

                <Text style={this.state.pressedButtonIndex === this.props.buttonIndex
                    ? [styles.displayText, { color: 'red' }]
                    : [styles.displayText, { color: 'white' }]
                }>{this.props.wordChunk}</Text>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    displayText: {
        fontSize: 30,
        textAlign: 'center'
    },
    phonicB: {
        alignSelf: 'center',
        width: 100,
        height: 40,
        fontSize: 18,
        fontWeight: 'bold',
        borderRadius: 7,
        backgroundColor: 'red',
        margin: 20
    }
})