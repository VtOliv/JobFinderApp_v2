import { Text, ScrollView, View, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native"
import AppLogo from "../CommonPages/AppLogo"
import { useCallback, useEffect, useState } from "react"
import { IP } from "..";
import { ModalStyles, MyProfileStyles } from "../Styles";
import { useAsyncStorage } from "@react-native-async-storage/async-storage"

export default function MyProfile({ navigation, route }) {

    const { getItem, setItem } = useAsyncStorage("id");
    const [userData, setUserData] = useState(null);
    const [teste, setTeste] = useState(false);
    const [knowledge, setKnowledge] = useState([]);
    const [previousWorks, setPreviousWorks] = useState([]);
    const [skills, setSkills] = useState([]);
    const [value, setValue] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState(0);

    useEffect(() => {
        getFromStorage()

    }, []);

    useEffect(() => {

        const getUser = async () => {
            try {
                const response = await fetch(`${IP}/user/complete/${value}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json()
                setUserData(data)

                if (userData != null) {
                    setPreviousWorks(userData.previousWorks)
                    setKnowledge(userData.knowledge)
                    setSkills(userData.skills)
                }

            } catch (error) {
                console.error('Erro ao buscar dados:', error);
                setIsLoading(false);
            }
        }
        getUser()

        var i = 0
        const interval = setInterval(() => {
            console.log('Executando loop...');
            i++
            setCount(i)
            console.log('Número do loop:', count);
            onRefresh

            if (count >= 3) {
                setIsLoading(false)
                clearInterval(interval);
            }
        }, 3000);


        return () => {
            clearInterval(interval);
        };

        // getUser()
        // console.log(userData);

    }, [teste]);

    useEffect(() => {
        onRefresh
        if (userData === null) {
            setTeste(true)
        } else {
            setTeste(false)
        }
    }, []);

    async function getFromStorage() {
        const item = await getItem();
        let data = JSON.parse(item);
        setValue(data)
    }

    const refreshInfo = () => {

        if (userData != null) {
            setPreviousWorks(userData.previousWorks)
            setKnowledge(userData.knowledge)
            setSkills(userData.skills)
        }
        setIsLoading(false)
    }


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTeste(true)
        refreshInfo()
        setTimeout(() => {
            setRefreshing(false);
            setTeste(false)
        }, 2000);
    }, []);

    return (
        <View>

            <ScrollView style={MyProfileStyles.container} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <AppLogo margin={15}/>

                <View style={MyProfileStyles.header}>
                    {isLoading ? (
                        <ActivityIndicator size="large" color={'#057a5f'} />
                    ) : (
                        <View>
                            {userData && (
                                <View>
                                    <Image
                                        source={require('../../../assets/snack-icon.png')}
                                        style={MyProfileStyles.profileImage}
                                    />
                                    <Text style={MyProfileStyles.title}>{userData.name}</Text>
                                    <Text style={MyProfileStyles.text}>{userData.email}</Text>
                                    <Text style={MyProfileStyles.text}>{userData.phoneNumber}</Text>
                                    <Text style={MyProfileStyles.text}>{userData.address}</Text>
                                    <TouchableOpacity
                                        style={[ModalStyles.button, ModalStyles.buttonClose]}
                                        onPress={() => navigation.navigate('edit')}>
                                        <Text style={ModalStyles.textStyle}>Editar perfil</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    )}
                </View>

                <View>
                    <Text style={MyProfileStyles.sectionTitle}>Experiência</Text>
                    {isLoading ? (
                        <ActivityIndicator size="large" color="#7ac6c0" />
                    ) : (
                        <View>
                            {previousWorks && previousWorks.map(item => {
                                return (
                                    <View style={MyProfileStyles.header}>
                                        <Text style={MyProfileStyles.title}>{item.jobName}</Text>
                                        <Text style={MyProfileStyles.text}>{item.companyName}</Text>
                                        <Text style={MyProfileStyles.text}>{item.period}</Text>
                                    </View>)
                            })}
                        </View>
                    )
                    }
                </View>

                <Text style={MyProfileStyles.sectionTitle}>Escolaridade</Text>
                {knowledge != null ?
                    knowledge.map(item => {
                        return (
                            <View style={MyProfileStyles.header}>
                                <Text style={MyProfileStyles.title}>{item.name}</Text>
                                <Text style={MyProfileStyles.text}>{item.schoolName}</Text>
                                <Text style={MyProfileStyles.text}>{item.period}</Text>
                            </View>)
                    }) : <View style={MyProfileStyles.header}><ActivityIndicator color={'#057a5f'} size={"small"} /></View>
                }

                <Text style={MyProfileStyles.sectionTitle}>Habilidades</Text>
                {skills != null ?
                    <View style={MyProfileStyles.header}>
                        {skills.map((item) => {
                            return (
                                <View key={item.id}>
                                    <Text style={MyProfileStyles.text}>{item.name}</Text>
                                </View>
                            )
                        })}
                    </View>
                    : <><ActivityIndicator color={'#057a5f'} size={"small"} /></>}

                <Text style={MyProfileStyles.sectionTitle}>Objetivos</Text>
                <View style={MyProfileStyles.header}>
                    {userData != null ?
                        <>
                            <Text style={MyProfileStyles.title}>{userData.objective}</Text>
                            <Text style={MyProfileStyles.text}>{userData.about}</Text>
                        </>
                        : <><ActivityIndicator color={'#7ac6c0'} size={"small"} /></>
                    }
                </View>

            </ScrollView>
        </View>
    )
}