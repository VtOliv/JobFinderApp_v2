import { NavigationContainer } from '@react-navigation/native';

import { SignInRoutes } from './signIn.routes';

export default function Routes(){
    return(
        <NavigationContainer>
            <SignInRoutes />
        </NavigationContainer>
    )
}