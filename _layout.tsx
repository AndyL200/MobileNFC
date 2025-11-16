import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { AuthProvider } from '@/components/contexts/AuthContext.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabLayout from './layout/tab_layout';
import ResetPassword from './layout/resetPassword';
import CreateNewUser from './layout/createNewUser';
import StudentForm from './layout/tempFieldsPage';
const Stack = createStackNavigator();



export default function RootLayout() {
  const colorScheme = 'dark';

  return (
    <AuthProvider>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <NavigationContainer>
      <Stack.Navigator>
            <Stack.Screen name="MainTabs" component={TabLayout} options={{ headerShown: false, title:"BottomTab" }} />
            <Stack.Screen name="resetPassword" component={ResetPassword} options={{ headerShown: false, title:"pwdReset" }} />
            <Stack.Screen name="createNewUser" component={CreateNewUser} options={{ headerShown: false, title:"newUser" }} />
            <Stack.Screen name="tempFields" component={StudentForm} options={{ headerShown: false, title:"tempFields" }} />
          </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
    </AuthProvider>
  );
}
