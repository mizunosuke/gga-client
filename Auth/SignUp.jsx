import { useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AuthContext } from "./AuthProvider";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { Avatar } from "react-native-paper";

export const SignUp = () => {

    const { signUp } = useContext(AuthContext);

    const [ name ,setName ] = React.useState("");
    const [ email ,setEmail ] = React.useState("");
    const [ password ,setPassword ] = React.useState("");
    const [ passwordConfirmation ,setPasswordConfirmation ] = React.useState("");
    const [ iconPath ,setIconPath ] = React.useState("");
    const [ area ,setArea ] = React.useState("");
    const [error, setError] = React.useState(null);

    const navigation = useNavigation();

    //サインイン処理
    const handleSignUp = () => {
        signUp(name, email, password, passwordConfirmation, iconPath, area);
    }

    const pickImage = async() => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
  
      console.log(result);
      if (!result.cancelled) {
        setIconPath(result.uri);
      }
    }

    console.log(iconPath);

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Registration</Text>
          {error && <Text style={styles.error}>{error}</Text>}
          <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={pickImage}>
              {iconPath ? (<Avatar.Image source={{uri: iconPath}} size={80} color="#333" style={{alignSelf: "center"}}/>) : (<Ionicons name="person-circle-outline" size={80} color="#333" style={{alignSelf: "center"}}/>)}
              <Text style={{marginVertical: 15, fontWeight: 500}}>アイコンをタップしてプロフィール画像を設定</Text>
          </TouchableOpacity>
          </View>
          <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            value={passwordConfirmation}
            onChangeText={setPasswordConfirmation}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="エリアを入力　入力例：広島県"
            value={area}
            onChangeText={setArea}
          />
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>登録する</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.buttonText}>ログインはこちら</Text>
          </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
    },
    error: {
      color: 'red',
      marginBottom: 16,
    },
    profileImageContainer: {
      marginBottom: 10
    },
    input: {
      width: '80%',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      padding: 8,
      marginBottom: 16,
    },
    buttonText: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 16,
    },
    button: {
        marginVertical: 10
    }
  });