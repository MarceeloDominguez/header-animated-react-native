import React from "react";
import {
  Animated,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Footer from "./components/Footer";
import Header from "./components/Header";

const data = [
  { color: "green", title: "Hola Mundo" },
  { color: "violet", title: "Hola Mundo" },
  { color: "orange", title: "Hola Mundo" },
  { color: "green", title: "Hola Mundo" },
  { color: "violet", title: "Hola Mundo" },
  { color: "orange", title: "Hola Mundo" },
  { color: "green", title: "Hola Mundo" },
  { color: "violet", title: "Hola Mundo" },
  { color: "orange", title: "Hola Mundo" },
  { color: "green", title: "Hola Mundo" },
  { color: "violet", title: "Hola Mundo" },
  { color: "orange", title: "Hola Mundo" },
  { color: "green", title: "Hola Mundo" },
  { color: "violet", title: "Hola Mundo" },
  { color: "orange", title: "Hola Mundo" },
];

export default function App() {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(scrollY, 0, 50);
  const translateHeaderY = diffClamp.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
  });

  const translateFooterY = diffClamp.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 50],
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Animated.View
        style={{
          transform: [{ translateY: translateHeaderY }],
          zIndex: 100,
        }}
      >
        <Header />
      </Animated.View>
      <Animated.FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentFlatList}
        keyExtractor={(_, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item }) => {
          return (
            <View
              style={[styles.containerItems, { backgroundColor: item.color }]}
            >
              <Text>{item.title}</Text>
            </View>
          );
        }}
      />
      <Animated.View
        style={{
          transform: [{ translateY: translateFooterY }],
          zIndex: 100,
        }}
      >
        <Footer />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentFlatList: {
    marginTop: 50,
    paddingTop: 10,
    paddingBottom: 60,
  },
  containerItems: {
    height: 120,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
});
