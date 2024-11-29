import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Ionicons} from '@expo/vector-icons'
import AllExpenses from "./screens/AllExpenses";
import ManageExpenses from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/UI/Icon/IconButton";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator screenOptions={{
      headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
      headerTintColor: 'white',
      tabBarStyle:{backgroundColor:GlobalStyles.colors.primary500},
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({tintColor})=> <IconButton icon={"add"} color={tintColor} size={24} onPress={() => {}}/>
    }}>
      <BottomTabs.Screen 
        name="RecentExpenses" 
        component={RecentExpenses} 
        options={{
          title:"Recent Expenses",
          tabBarLabel: 'Recent',
          tabBarIcon: ({color, size}) => <Ionicons name="hourglass" size={size} color={color} />
        }}/>
      <BottomTabs.Screen
        name="AllExpenses" 
        component={AllExpenses} 
        options={{
          title: "All Expenses",
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({color, size}) => <Ionicons name="calendar" size={size} color={color} />
        }}
        />
    </BottomTabs.Navigator>
  );
};
export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ManageExpense" component={ManageExpenses} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
