import { View, Text } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { MeasureHome } from "./MeasureHome";
import { Result } from "./Result";

const Stack = createNativeStackNavigator();

export const IndexMeasure = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="MeasureHome" component={MeasureHome} options={{headerShown:false}}/>
        <Stack.Screen name="Result" component={Result} />
    </Stack.Navigator>
  )
}