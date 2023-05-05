import { AuthContext } from "./AuthProvider";
import * as React from "react";
import { SignUp } from "./SignUp";
import { Login } from "./Login";
import { Bottombar } from "../Bottombar";
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator();

export const PrivateRoute = () => {

    const { currentUser } = React.useContext(AuthContext)
    return (
        <>
        {currentUser ? (
            <Bottombar />
        ) : (
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={({ navigation }) => ({
                    headerShown: false, // ヘッダーの戻るボタンを非表示にする
                    gestureEnabled: false, // 画面のスワイプによる戻りを無効化する
                })}/>
                <Stack.Screen name="SignUp" component={SignUp} options={({ navigation }) => ({
                    headerShown: false, // ヘッダーの戻るボタンを非表示にする
                    gestureEnabled: false, // 画面のスワイプによる戻りを無効化する
                })}/>
            </Stack.Navigator>
        )}
        </>
    )
}