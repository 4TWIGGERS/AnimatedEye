import React, { useState, useRef, useEffect } from "react";
import {
   Animated,
   StyleSheet,
   TouchableOpacity,
   View,
   Easing,
} from "react-native";
import Svg, { Path } from "react-native-svg";

function EyePart({ rotate = false }) {
   return (
      <Svg
         style={{
            height: 150,
            width: 300,
            transform: [{ rotate: rotate ? "180deg" : "0deg" }],
         }}
      >
         <Path d="M 0 150 Q 150 0 300 150 Q 150 150 0 150" fill="white"></Path>
      </Svg>
   );
}

export default function App() {
   const [translateX] = useState(new Animated.Value(0));
   const [eyelidAnim] = useState(new Animated.Value(0));
   const eyelidRef = useRef(null);

   const getEyelidPath = (value) => {
      return `M 0 150 Q 150 0 300 150 Q 150 ${value * 100} 0 150`;
   };

   useEffect(() => {
      eyelidAnim.addListener(({ value }) => {
         eyelidRef.current.setNativeProps({ d: getEyelidPath(value) });
      });
   }, []);

   return (
      <View style={styles.container}>
         <View>
            <TouchableOpacity
               activeOpacity={1}
               onPress={() => {
                  Animated.timing(translateX, {
                     toValue: 50,
                     duration: 600,
                     useNativeDriver: true,
                  }).start(() => {
                     Animated.timing(translateX, {
                        toValue: -50,
                        duration: 1200,
                        useNativeDriver: true,
                     }).start(() => {});
                  });

                  Animated.timing(eyelidAnim, {
                     toValue: 3,
                     duration: 200,
                     useNativeDriver: false,
                     easing: Easing.bezier(0.83, 0, 0.17, 1),
                  }).start(() => {
                     Animated.timing(eyelidAnim, {
                        toValue: 0.5,
                        duration: 200,
                        useNativeDriver: false,
                        easing: Easing.bezier(0.83, 0, 0.17, 1),
                     }).start();
                  });
               }}
            >
               <View
                  style={{
                     position: "absolute",
                     left: 50,
                     top: -80,
                  }}
               >
                  <Svg
                     style={{
                        height: 150,
                        width: 200,
                     }}
                  >
                     <Path
                        d="M 0 150 Q 100 0 200 150 Q 100 50 0 150"
                        fill="rgb(54,64,224)"
                     ></Path>
                  </Svg>
               </View>

               <EyePart />
               <EyePart rotate={true} />

               <View
                  style={{
                     position: "absolute",
                     transform: [{ rotate: "180deg" }],
                     bottom: -80,
                     left: 50,
                  }}
               >
                  <Svg
                     style={{
                        height: 150,
                        width: 200,
                     }}
                  >
                     <Path
                        d="M 0 150 Q 100 0 200 150 Q 100 50 0 150"
                        fill="rgb(54,64,224)"
                     ></Path>
                  </Svg>
               </View>

               <Animated.View
                  style={{ position: "absolute", transform: [{ translateX }] }}
               >
                  <View style={styles.eyeContainer}>
                     <View style={styles.outerCircle} />
                  </View>
                  <View style={styles.eyeContainer}>
                     <View style={styles.innerCircle} />
                  </View>
                  <View style={styles.eyeContainer}>
                     <View style={styles.light} />
                  </View>
               </Animated.View>
               <View style={{ position: "absolute" }}>
                  <Svg
                     style={{
                        height: 300,
                        width: 300,
                     }}
                  >
                     <Path
                        ref={(ref) => (eyelidRef.current = ref)}
                        d={getEyelidPath(1)}
                        fill="rgb(54,64,224)"
                     ></Path>
                  </Svg>
               </View>
            </TouchableOpacity>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "rgb(34,110,231)",
      alignItems: "center",
      justifyContent: "center",
   },
   eyeContainer: {
      position: "absolute",
      width: 300,
      height: 150,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 75,
   },
   outerCircle: {
      backgroundColor: "rgb(48,169,246)",
      height: 100,
      width: 100,
      borderRadius: 50,
   },
   innerCircle: {
      backgroundColor: "rgb(18,22,91)",
      height: 70,
      width: 70,
      borderRadius: 35,
   },
   light: {
      backgroundColor: "white",
      height: 15,
      width: 15,
      borderRadius: 7.5,
      marginLeft: 20,
      marginBottom: 20,
   },
});
