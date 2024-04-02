import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function JobCard(...props) {
    return (
        <>
            {props.map((item) => {
                return (
                    <TouchableOpacity key={item._id} style={styles.contentCard}>
                        <Text style={styles.paragraph}>{item.jobName}</Text>
                        <Text style={styles.paragraph}>{item.companyName}</Text>
                    </TouchableOpacity>
                )
            })}
        </>
    )
}

const styles = StyleSheet.create({
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
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