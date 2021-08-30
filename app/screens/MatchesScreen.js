import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import SocketService from '../service/socketService';

class MatchesScreen extends Component {

    constructor() {
        super();
        this.state = {
            matches: [],
        }
        this.socketService = SocketService.getInstance();
    }

    messageListener = (matches_data) => {
        this.setState({ matches: matches_data });
    }

    componentDidMount() {

        const abortController = new AbortController();
        const signal = abortController.signal
        fetch('http://localhost:5000/routes', { signal: signal })
            .then((response) => response.json())
            .then((json) => {
                json = json.sort((a, b) => {
                    if (a.date > b.date) {
                        return 1;
                    } else if (a.date == b.date) {
                        if (a._id > b._id) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                    else {
                        return -1;
                    }
                });
                this.setState({ matches: json });
            })
            .catch((err) => console.error(err))

        this.socketService.addEventListener("message", this.messageListener);

        return function cleanup() {
            abortController.abort();
        }
    }

    componentWillUnmount() {
        this.socketService.removeEventListener("message", this.messageListener);
    }

    static navigationOptions = {
        title: 'Matches',
        headerStyle: {
            backgroundColor: '#03A9F4',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.title}>Premier League</Text>
                </View>
                <View style={styles.search_and_matches}>
                    <Text style={styles.matches_text}>Matches</Text>
                </View>

                <View style={styles.body}>
                    <ScrollView showsHorizontalScrollIndicator={false}>
                        {this.state.matches.map(match => {
                            return (
                                <View style={styles.match} key={match.match_id}>
                                    <View>
                                        <Text style={styles.date}>
                                            {match.date}
                                        </Text>
                                    </View>
                                    <View style={styles.match_teams}>
                                        <Text style={styles.ht}>{match.ht}</Text>
                                        <View style={styles.score}>
                                            <Text style={styles.scores}>{match.hts}</Text>
                                            <Text style={styles.scores}>:</Text>
                                            <Text style={styles.scores}>{match.ats}</Text>
                                        </View>
                                        <Text style={styles.at}>{match.at}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>


            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ced4da',
    },
    header: {
        padding: '8%',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: '#414042',
        alignItems: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#efefd0',
    },
    matches_text: {
        fontSize: 24,
        padding: '3%',
        fontWeight: 'bold',
    },
    body: {
        backgroundColor: '#ced4da',
        height: '71%'
    },
    match: {
        marginBottom: '2%',
        paddingHorizontal: '5%',
    },
    match_teams: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: '3%',
        paddingBottom: '5%',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    date: {
        backgroundColor: '#efefd0',
        fontSize: 16,
        padding: '3%',
        paddingBottom: 0,
        textAlign: 'center',
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    ht: {
        fontSize: 16,
        width: '36%',
        textAlign: 'center',
    },
    at: {
        fontSize: 16,
        width: '36%',
        textAlign: 'center',
    },
    scores: {
        fontSize: 18,
    },
    score: {
        width: '28%',
        justifyContent: 'space-around',
        alignContent: 'center',
        flexDirection: 'row',
    }

});
export default MatchesScreen;