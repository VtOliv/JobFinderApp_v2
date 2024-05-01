import { Text, SafeAreaView } from "react-native"
import AppLogo from "../CommonPages/AppLogo"

export default function MyOpportunities() {
    return (
        <SafeAreaView>
            <AppLogo margin={15}/>
            <Text style={{margin: 5, justifyContent:'center'}}>Página minhas vagas</Text>
        </SafeAreaView>
    )
}