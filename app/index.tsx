import DetailsView from "@/components/DetailsView";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";


import { Landingpage } from "@/components/Landingpage";
import Login from "@/components/Login";

import React, { useState } from "react";
import { Text, View } from "react-native";

 const App: React.FC = () =>  {
  const [currentPage, setCurrentPage] = useState<"LANDING_PAGE" | "DETAILS_VIEW">("LANDING_PAGE");
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleNavigateToDetails = (serviceType: string) => {
    setSelectedService(serviceType);
    setCurrentPage("DETAILS_VIEW");
  };

  const handleNavigateToLanding = () => {
    setCurrentPage("LANDING_PAGE");
    setSelectedService(null);
  };
 

  return (
    <View
    style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow:'scroll',
      // gap:180,
     }}
    >

      <View>
      < Header  />
      </View>
      
     {/* <View>
      <Login/>
     </View> */}
     <View
     style={{
      flex: 1,
      gap:10,
      justifyContent: "center",
      flexDirection: 'column',
     }}
      >
      {currentPage === "LANDING_PAGE" ? (
        <Landingpage sendDataToDetails={handleNavigateToDetails} />
      ) : (
        <DetailsView
          sendDataToParent={handleNavigateToLanding}
          selected={selectedService || ""}
        />
      )}
    </View>


      <View>
      < Footer />
      </View>
    </View>
  );
}
export default App;



// import React, { useState } from "react";
// import { StyleSheet, View,Text, ScrollView } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import DetailsView from "@/components/DetailsView";
// import Footer from "@/components/Footer";
// import { Header } from "@/components/Header";
// import { Landingpage } from "@/components/Landingpage";


// const Stack = createStackNavigator();

// export default function App() {
//   const [selectedBookingType, setSelectedBookingType] = useState<string | undefined>();
//   const [serviceProviderDetails, setServiceProvidersData] = useState<string | undefined>();

//   const handleSelectedBookingType = (type: string) => {
//     setSelectedBookingType(type);
//   };

//   const handleSelectedProvider = (details: any) => {
//     setServiceProvidersData(details);
//   };

//   return (
//     <ServiceProviderContext.Provider value={{ selectedBookingType, setSelectedBookingType }}>
//       <NavigationContainer>
//         <View style={styles.appContainer}>
//           {/* Header */}
//           <View style={styles.headerContainer}>
//             <Header />
//           </View>

//           {/* Main Content */}
//           <ScrollView contentContainerStyle={styles.contentSection}>
//             <Stack.Navigator initialRouteName="LandingPage" screenOptions={{ headerShown: false }}>
//               <Stack.Screen name="LandingPage">
//                 {() => <Landingpage bookingType={handleSelectedBookingType} />}
//               </Stack.Screen>
//               <Stack.Screen name="DetailsView">
//                 {() => (
//                   <DetailsView
//                     selected={selectedBookingType}
//                     selectedProvider={handleSelectedProvider}
//                   />
//                 )}
//               </Stack.Screen>
//               <Stack.Screen name="ConfirmationPage">
//                 {() => (
//                   <ConfirmationPage
//                     role={selectedBookingType}
//                     providerDetails={serviceProviderDetails}
//                   />
//                 )}
//               </Stack.Screen>
//               <Stack.Screen name="Checkout">
//                 {() => <Checkout providerDetails={serviceProviderDetails} />}
//               </Stack.Screen>
//               <Stack.Screen name="Login" component={Login} />
//               <Stack.Screen name="UserProfile" component={UserProfile} />
//               <Stack.Screen name="Bookings" component={Booking} />
//               <Stack.Screen name="Admin" component={Admin} />
//             </Stack.Navigator>
//           </ScrollView>

//           {/* Footer */}
//           <View style={styles.footerContainer}>
//             <Footer />
//           </View>
//         </View>
//       </NavigationContainer>
//     </ServiceProviderContext.Provider>
//   );
// }

// const styles = StyleSheet.create({
//   appContainer: {
//     flex: 1,
//     flexDirection: "column",
//     height: "100%",
//   },
//   headerContainer: {
//     height: "10%",
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "100%",
//     zIndex: 1000,
//     backgroundColor: "#fff",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3, // For Android shadow
//   },
//   footerContainer: {
//     height: "10%",
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     width: "100%",
//     backgroundColor: "#f6f6f7",
//     borderTopWidth: 1,
//     borderTopColor: "#0d0303",
//     zIndex: 1000,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   contentSection: {
//     flexGrow: 1,
//     marginTop: "10%", // Matches header height
//     marginBottom: "10%", // Matches footer height
//     paddingHorizontal: 10,
//     paddingVertical: 20,
//   },
// });

