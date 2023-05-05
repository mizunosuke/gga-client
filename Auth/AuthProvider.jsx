import * as React from "react";
import { View, Text } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

export const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => {

    //新規登録時はトークンをサーバーからとってきてフォームデータを一緒に送信
    //ログイン時はトークンをストレージからとってきてサーバーでチェック
    //どっちにしても最初にトークンをストレージから取る処理は要る

    //登録に必要な情報をステートで管理
    const [ currentUser ,setCurrentUser ] = React.useState(null);
    const [ error ,setError ] = React.useState("");

    //ナビゲーション
    const navigation = useNavigation();

    //csrfトークンをサーバーから取得
    const fetchCsrfToken = async () => {
        const { data } = await axios.get('https://cd53-2404-7a87-662-1500-694a-cc60-562f-ff70.ngrok-free.app/csrf-cookie');
        console.log(data);
        return data.csrf_token;
    };

    //トークンを保存する関数
    const saveToken = async (token) => {
        try {
          console.log(token);
          const jsonValue = JSON.stringify(token)
          await AsyncStorage.setItem('@token', jsonValue);
        } catch (e) {
          console.log('Failed to save token');
        }
    }

    //新規登録処理
    const signUp = async (name, email, password, passwordConfirm, iconPath, area) => {
        //登録用のフォームデータ作成
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', passwordConfirm);
        formData.append('iconPath', iconPath);
        formData.append('area', area);
        

        //作成したデータを取得したcsrfトークンと一緒にサーバーへ送信・保存
        try {
          const { data } = await axios.post('https://cd53-2404-7a87-662-1500-694a-cc60-562f-ff70.ngrok-free.app/api/register', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'X-CSRF-TOKEN': await fetchCsrfToken(),
            },
          });
          //data変数に保存したユーザー情報を格納
          console.log(data);

          setCurrentUser(data); //ユーザー情報をステートに保存
          saveToken(data); // トークンをストレージに保存
        } catch (e) {
          console.error(e);
          setError('Failed to register');
        }
    };

    //ログイン処理
    const Login = async(email, password) => {

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        try {
            const res = await axios.post("https://cd53-2404-7a87-662-1500-694a-cc60-562f-ff70.ngrok-free.app/api/login",formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-TOKEN': await fetchCsrfToken(),
                  },
            });
            console.log(res);

            if(res) {
                setCurrentUser(res.data); //ユーザー情報をステートに保存
                saveToken(res.data); // トークンをストレージに保存
            }
            // //トークンを取ってくる
            // const jsonToken = await AsyncStorage.getItem("@token"); 
            // const token = JSON.parse(jsonToken);
            // console.log(token);
            // //トークンがあればそのままログイン・なければ新規登録画面へ遷移
            // if(token) {
            //     //トークンをチェックする処理
            //     setCurrentUser(token);
            // } else {
            //     //新規登録画面へ
            //     setError("Failed to Login");
            // }
        } catch (error) {
            console.log(error);
            //エラーメッセージを表示するためステート管理
            setError("Failed to Login");
        }
    }  
    
    //トークンを削除する関数
    const handleLogout = async () => {
        try {
        setCurrentUser(null); // ログアウト状態にする
        AsyncStorage.removeItem("@token");
        } catch (e) {
        console.log('Failed to remove token');
        }
    };

    //トークンをチェック
    React.useEffect(() => {
        const checkToken = async () => {
        const token = await AsyncStorage.getItem("@token");
        console.log(JSON.parse(token));
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setCurrentUser(JSON.parse(token)); // ログイン状態にする
        } else {
            setCurrentUser(null); // トークンの取得に失敗したので、user ステートを null に設定する
        }
    };
  
    checkToken();
    }, []);

    return (
        <AuthContext.Provider value={{signUp, Login, fetchCsrfToken, saveToken, currentUser, error, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )
}