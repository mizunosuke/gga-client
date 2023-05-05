import { useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "./AuthProvider";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";

export const Login = () => {

    const { Login, error } = useContext(AuthContext);

    const [ email ,setEmail ] = React.useState("");
    const [ password ,setPassword ] = React.useState("");

    const navigation = useNavigation();

    //サインイン処理
    const handleLogin = () => {
        Login(email, password);
    }

    return (
        <View style={styles.container}>
          <Text style={styles.title}>ログイン</Text>
          {error && <Text style={styles.error}>{error}</Text>}
          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>ログインする</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.buttonText}>新規登録はこちら</Text>
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