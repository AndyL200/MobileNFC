import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { AuthProvider } from '@/components/contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from '@/hooks/use-color-scheme';
import HomeScreen from '@/(tabs)/index';
import LoginScreen from '@/(tabs)/loginPage';
import createNewUser from '@/createNewUser'
import StudentForm from '@/tempFieldsPage'


const Stack = createStackNavigator();

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

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
