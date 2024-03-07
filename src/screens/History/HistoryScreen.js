import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Header from "../../components/Header";

const HistoryScreen = () => {
    const historicalEvents = [
        {
            id: 1,
            name: "Signing of the Declaration of Independence",
            location: "Philadelphia, Pennsylvania",
            date: "July 4, 1776",
            time: "Afternoon",
        },
        {
            id: 2,
            name: "Battle of Gettysburg",
            location: "Gettysburg, Pennsylvania",
            date: "July 1–3, 1863",
            time: "Various",
        },
        {
            id: 3,
            name: "First Moon Landing (Apollo 11)",
            location: "Tranquility Base, Moon",
            date: "July 20, 1969",
            time: "Evening (UTC)",
        },
        {
            id: 4,
            name: "Signing of the Declaration of Independence",
            location: "Philadelphia, Pennsylvania",
            date: "July 4, 1776",
            time: "Afternoon",
        },
        {
            id: 5,
            name: "Battle of Gettysburg",
            location: "Gettysburg, Pennsylvania",
            date: "July 1–3, 1863",
            time: "Various",
        },
        {
            id: 6,
            name: "First Moon Landing (Apollo 11)",
            location: "Tranquility Base, Moon",
            date: "July 20, 1969",
            time: "Evening (UTC)",
        },
    ];

    // Rendering each historical event item
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDetails}>
                Location: {item.location} {"\n"}
                Date: {item.date} {"\n"}
                Time: {item.time}
            </Text>
        </View>
    );

    return (
        <View style={styles.mainContainer}>
            <Header title={"History"} />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={historicalEvents}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginHorizontal: 12
    },
    itemContainer: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        marginBottom: 8
    },
    itemName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    itemDetails: {
        fontSize: 14,
    },
});

export default HistoryScreen;
