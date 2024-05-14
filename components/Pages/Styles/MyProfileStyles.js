import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    header: {
        alignItems: 'center',
        backgroundColor: '#7ac6c0',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 20,
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#FFFFFF',
        textAlign: 'center',
        textShadowColor: 'black',
        textShadowRadius: 4
    },
    text: {
        fontSize: 16,
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
    },
    contentCard: {
        backgroundColor: 'lightgrey',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'grey',
        margin: 12,
    }
})
