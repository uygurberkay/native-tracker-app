// @ts-ignore
import { GlobalStyles } from './constants/styles'; 
/* Navigations */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/* Screens */
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';

/* Icons */
import { FontAwesome } from '@expo/vector-icons';
import IconButton from './components/ui/IconButton';

/* Types */
type BottomStackParamList = {
    RecentExpenses: any | undefined;
    AllExpenses: any | undefined;
};
type NativeStackParamList = {
    ExpensesOverview: any | undefined;
    ManageExpense: any | undefined;
};

const Stack = createNativeStackNavigator<NativeStackParamList>();
const BottomTabs = createBottomTabNavigator<BottomStackParamList>();

const ExpensesOverview = () => {
    return (
        <BottomTabs.Navigator 
            screenOptions={({ navigation }) => ({
                headerStyle: {backgroundColor: GlobalStyles.colors.primary200},
                headerTintColor: GlobalStyles.colors.dark100,
                tabBarStyle: {backgroundColor : GlobalStyles.colors.primary100},
                tabBarActiveTintColor: GlobalStyles.colors.error500,
                tabBarInactiveTintColor: GlobalStyles.colors.dark100,
                tabBarActiveBackgroundColor: GlobalStyles.colors.primary200,
                headerRight: ({tintColor}) => (
                <IconButton 
                    icon={'add'} 
                    size={24} 
                    color={tintColor!} 
                    onPress={() => {navigation.navigate('ManageExpense')}} />
                ),
        })}>
            <BottomTabs.Screen 
                name='RecentExpenses' 
                component={RecentExpenses}
                options={{
                    title:'Recent Expenses',
                    tabBarLabel: 'Recent',
                    tabBarIcon: ({color, size}: any) => <FontAwesome name="hourglass-3" size={size} color={color} />
                }}/>
            <BottomTabs.Screen 
                name='AllExpenses' 
                component={AllExpenses}
                options={{
                    title: 'All Expenses',
                    tabBarLabel: 'All Expenses',
                    tabBarIcon: ({color, size}: any) => <FontAwesome name="calendar" size={size} color={color} />,
                }}/>
        </BottomTabs.Navigator>
    )
}

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName='ExpensesOverview'
                screenOptions={{
                    headerStyle: {backgroundColor: GlobalStyles.colors.primary200},
                    headerTintColor: GlobalStyles.colors.dark100,
                }}>
                <Stack.Screen 
                    name='ExpensesOverview' 
                    component={ExpensesOverview}
                    options={{
                        headerShown: false,
                    }}/>
                <Stack.Screen 
                    name='ManageExpense' 
                    component={ManageExpense} 
                    options={{
                        title: 'Manage Expense',
                        presentation: 'modal', // IOS
                    }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation