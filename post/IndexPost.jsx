import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { FishList } from "./FishList";
import { PostHome } from "./PostHome";
import { ColorList } from "./ColorList";
import { RegionList } from "./RegionList";

const Stack = createNativeStackNavigator();

export const IndexPost = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="PostHome" component={PostHome} options={{headerShown:false}} />
        <Stack.Screen name="FishList" component={FishList} options={{headerShown:false}}/>
        <Stack.Screen name="ColorList" component={ColorList} options={{headerShown:false}}/>
        <Stack.Screen name="RegionList" component={RegionList} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

