import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { AuthProvider } from '@/components/contexts/AuthContext.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './layout/index.tsx';
import LoginScreen from './layout/loginPage.tsx';
import createNewUser from './layout/createNewUser.tsx'
import StudentForm from './layout/tempFieldsPage.tsx'


const Stack = createStackNavigator();



export default function RootLayout() {
  const colorScheme = 'dark';

  return (
    <AuthProvider>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="createPwd" component={createNewUser} options={{ headerShown: false }} />
            <Stack.Screen name="fields" component={StudentForm} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
    </ThemeProvider>
    </AuthProvider>
  );
}
