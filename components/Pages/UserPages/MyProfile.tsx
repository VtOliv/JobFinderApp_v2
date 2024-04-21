import { Text, SafeAreaView, View, Image, StyleSheet } from "react-native"
import AppLogo from "../CommonPages/AppLogo"

export default function MyProfile() {
    return (
        <SafeAreaView>
            <AppLogo margin={15} logout={true} />

            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={require('./assets/channels4_profile.jpg')}
                        style={styles.profileImage}
                    />
                    <Text style={styles.name}>Manoel Gomes Da Silva</Text>
                    <Text style={styles.email}>manoelgomes.gs@gmail.com</Text>
                    <Text style={styles.phone}>(11) 997070-7070</Text>
                    <Text style={styles.location}>Rua Nove de Maio, 97 - 04416-000</Text>
                    <Text style={styles.age}>Idade: 21 anos</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Desenvolvedor Front-End</Text>
                    <Text style={styles.sectionContent}>Designer III - RD Saúde</Text>
                    <Text style={styles.sectionContent}>Atender e Direcionar maneiras de desenvolvimento ágil e responsivo</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Formado e Graduado em Gestão e Desenvolvimento de Computação em Nuvem</Text>
                    <Text style={styles.sectionContent}>Formação: Análise e Desenvolvimento de Sistemas - Estácio</Text>
                    <Text style={styles.sectionContent}>Área de estudo: Computação em Nuvem</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Habilidades:</Text>
                    <Text style={styles.sectionContent}>Terraform</Text>
                    <Text style={styles.sectionContent}>AWS</Text>
                    <Text style={styles.sectionContent}>Ruby</Text>
                    <Text style={styles.sectionContent}>Gherkin</Text>
                    <Text style={styles.sectionContent}>Capybara</Text>
                    <Text style={styles.sectionContent}>Cucumber</Text>
                    <Text style={styles.sectionContent}>HTML</Text>
                    <Text style={styles.sectionContent}>CSS</Text>
                    <Text style={styles.sectionContent}>Python</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Objetivo: Arquiteto de Soluções em Nuvem</Text>
                    <Text style={styles.sectionContent}>Quero desenvolver minhas habilidades e também contribuir para o sucesso da empresa. Em busca de uma oportunidade para desenvolver e melhorar meus conhecimentos, e também algo que possa me instruir de forma crescente e contínua, visando sempre o crescimento entre mim e a empresa.</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    header: {
        alignItems: 'center',
        backgroundColor: '#7ac6c0',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
        borderWidth: 5,
        borderColor: '#FFFFFF',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    email: {
        fontSize: 16,
        marginBottom: 5,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    phone: {
        fontSize: 16,
        marginBottom: 5,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    location: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    age: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 5,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#7ac6c0',
        textAlign: 'center',
    },
    sectionContent: {
        fontSize: 16,
        marginBottom: 5,
        color: 'black',
        textAlign: 'center',
    }
});