import { Text, SafeAreaView } from "react-native"
import AppLogo from "../CommonPages/AppLogo"

export default function MyApplies() {
    return (
        <SafeAreaView>
            <AppLogo margin={15}/>
            <Text style={{margin: 15, justifyContent:'center'}}>Página minhas candidaturas</Text>
        </SafeAreaView>
    )
}