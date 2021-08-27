import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Alert} from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db from './localdb';
import PhonicSoundButton from './components/PhonicSoundButton';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      text: "",
      displayText: "",
      chunks: [],
      phonicS: []
    }
  }
  render() {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Header
            backgroundColor={'purple'}
            leftComponent={{ icon: 'menu', color: 'pink' }}
            centerComponent={{
              text: 'Monkey Chunky',
              style: { color: 'white', fontSize: 18 }
            }}
            rightComponent={{ icon: 'home', color: 'pink' }}
          />

          <Image
            style={styles.imageIcon}
            source={{ uri: 'https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png' }}
          />
          <TextInput style={styles.inputBox} onChangeText={(info) => {
            this.setState({
              text: info
            })
            this.setState({
              chunks: []
            })
          }}
            value={this.state.text} />
          <TouchableOpacity style={styles.goButton} onPress={() => {
            //console.log(db[this.state.text]);
            var word = this.state.text.toLowerCase().trim();
            //var word = word2.trim;
            db[word] 
            ? (this.setState({chunks: db[word].chunks}),this.setState({phonicS: db[word].phones}))
            : alert('The word does not exists here.')
          }}>
            <Text style={styles.buttonText}>GO</Text>
          </TouchableOpacity>


          {this.state.chunks.map((item, index) => {
            return (
              <View>
                {/*<TouchableOpacity style={styles.chunkButton}>
                <Text style={styles.displayText}>{a}</Text>
            </TouchableOpacity>*/}
                <PhonicSoundButton
                  wordChunk={this.state.chunks[index]}
                  soundChunk={this.state.phonicS[index]}
                  buttonIndex={index}
                />
              </View>
            )
          })}
        </View>

      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox: {
    marginTop: 200,
    width: "80%",
    alignSelf: 'center',
    textAlign: 'center',
    borderWidth: 4,
    height: 40
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10
  },
  displayText: {
    fontSize: 30,
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  imageIcon: {
    width: 150,
    height: 150,
    marginLeft: 75
  },
  chunkButton: {
    alignSelf: 'center',
    width: 100,
    height: 40,
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 7,
    backgroundColor: 'red',
    margin: 20,

  }
});
