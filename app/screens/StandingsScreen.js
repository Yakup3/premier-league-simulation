import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from "react-native";
import Teams from './Teams';

import SocketService from '../service/socketService';

class StandingsScreen extends Component {

    constructor() {
        super();
        this.state = {
            standings: [],
        }
        this.socketService = SocketService.getInstance();
    }

    messageListener = standings_data => {
        this.setState({ standings: standings_data })
    }

    componentDidMount() {
        const abortController = new AbortController();
        const signal = abortController.signal
        fetch('http://localhost:5001/routes', { signal: signal })
            .then((response) => response.json())
            .then((json) => {
                json = json.sort((a, b) => a.order > b.order ? 1 : -1)

                this.setState({ standings: json });
            })
            .catch((err) => console.error(err))

        this.socketService.addEventListener("standings", this.messageListener);

        return function cleanup() {
            this.socketService.removeEventListener("standings", this.messageListener);
            abortController.abort();
        }
    }

    static navigationOptions = {
        title: "Standings",
        headerStyle: {
            backgroundColor: "#73C6B6"
        }
    };
    render() {
        return (

            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.text}>
                        <View>
                            <Text style={styles.title}>Premier League Table</Text>
                            <Text style={styles.season}>Season 2015/16</Text>
                        </View>
                        <Image
                            style={styles.logo}
                            source={require("../assets/logo.png")}
                        />
                    </View>

                    <View style={styles.subtitle}>
                        <Text style={styles.club}>Club</Text>
                        <Text style={styles.mp}>MP</Text>
                        <Text style={styles.w}>W</Text>
                        <Text style={styles.e}>E</Text>
                        <Text style={styles.l}>L</Text>
                        <Text style={styles.gf}>GF</Text>
                        <Text style={styles.ga}>GA</Text>
                        <Text style={styles.pts}>Pts</Text>
                    </View>

                </View>
                <ScrollView style={styles.scroll} showsHorizontalScrollIndicator={false}>
                    {this.state.standings.map(match => {
                        return (
                            <View key={match.name}>
                                <Teams
                                    order={match.order} name={match.name}
                                    mp={match.mp} w={match.w} e={match.e}
                                    l={match.l} gf={match.gf} ga={match.ga} pts={match.pts}
                                />
                            </View>
                        )
                    })}
                </ScrollView>

                <View style={styles.footer}>
                    <View style={styles.uefa}>
                        <View style={styles.chcolors}>
                        </View>
                        <Text>UEFA Champions League group stage</Text>
                    </View>
                    <View style={styles.eu}>
                        <View style={styles.eucolors}>
                        </View>
                        <Text>Europa League group stage</Text>
                    </View>
                    <View style={styles.relegation}>
                        <View style={styles.rcolors}>
                        </View>
                        <Text>Relegation</Text>
                    </View>
                </View>
            </View >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A5ADB3',
    },
    footer: {
        height: '18%',
        fontSize: 20,
        paddingHorizontal: '5%',
    },
    scroll: {
        marginTop: '-5%',
        marginHorizontal: '2%'
    },
    header: {
        height: '25%',
        paddingTop: '10%',
        paddingHorizontal: '5%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    season: {
        fontSize: 20,
        fontWeight: 'bold',
        opacity: 0.5,
    },
    logo: {
        width: '17%',
        height: "100%",
        borderRadius: 20,
        opacity: 0.9,
    },
    text: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: '1%',
    },
    subtitle: {
        marginTop: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    club: {
        fontSize: 15,
    },
    mp: {
        fontSize: 15,
        marginLeft: '34%',
    },
    w: {
        fontSize: 15,
        marginLeft: '3%',
    },
    e: {
        fontSize: 15,
        marginLeft: '4%',
    },
    l: {
        fontSize: 15,
        marginLeft: '5%',
    },
    gf: {
        fontSize: 15,
        marginLeft: '4%',
    },
    ga: {
        fontSize: 15,
        marginLeft: '3%',
    },
    pts: {
        fontSize: 15,
        marginLeft: '2%',
    },
    chcolors: {
        backgroundColor: '#4285F4',
        width: 10,
        height: 10,
        top: 5,
        marginRight: '1%',
        marginLeft: '1%',
    },
    uefa: {
        top: 5,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
    },
    eucolors: {
        backgroundColor: '#FA7B17',
        width: 10,
        height: 10,
        top: 5,
        marginRight: '1%',
        marginLeft: '1%',
    },
    eu: {
        top: 5,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
    },
    rcolors: {
        backgroundColor: '#EA4335',
        width: 10,
        height: 10,
        top: 5,
        marginLeft: '1%',
        marginRight: '1%',
    },
    relegation: {
        top: 5,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
    },

})
export default StandingsScreen;