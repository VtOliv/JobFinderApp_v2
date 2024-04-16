import { Text, SafeAreaView } from "react-native"
import AppLogo from "../CommonPages/AppLogo"

export default function MyProfile() {
    return (
        <SafeAreaView>
            <AppLogo margin={15} logout={true}/>
            <Text style={{margin: 15, justifyContent:'center'}}>Página meu perfil</Text>
        </SafeAreaView>
    )
}