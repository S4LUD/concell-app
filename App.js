"use strict";

import { NavigationContainer } from "@react-navigation/native";
import { ConcellProvider } from "./src/context/Context";
import MiniApp from "./MiniApp";
import "react-native-gesture-handler";

function App() {
  return (
    <ConcellProvider>
      <NavigationContainer>
        <MiniApp />
      </NavigationContainer>
    </ConcellProvider>
  );
}

export default App;
