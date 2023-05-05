import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RankingAllList } from "./ranking/RankingAllList"
import { RankingDetail } from "./ranking/RankingDetail"
import { UserPage } from "../mypage/UserPage";
import { Comment } from "./Comment";

const Stack = createNativeStackNavigator();

export const Home = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="RankingAllList" component={RankingAllList} options={{headerShown:false}}/>
            <Stack.Screen name="RankingDetail" component={RankingDetail} options={{headerShown:false}}/>
            <Stack.Screen name="UserPage" component={UserPage} options={{headerShown:false}}/>
            <Stack.Screen name="Comment" component={Comment} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}