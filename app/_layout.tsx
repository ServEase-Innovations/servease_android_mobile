import { Stack } from "expo-router";
import React from "react";

 const RootLayout =() => {
    return (
        <>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"/>

    </Stack>
    </>
    );
//   return <Stack screenOptions={{ headerShown: false }}/>;
};

export default RootLayout;
