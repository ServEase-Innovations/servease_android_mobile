import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  // Image,
  ScrollView,
} from "react-native";
import {
  Button,
  // Dialog,
  // Portal,
  // TextInput,
  IconButton,
  // Tooltip,
} from "react-native-paper";
// import moment from "moment";
// import { useDispatch, useSelector } from "react-redux";
// import { add } from "../../features/bookingType/bookingTypeSlice";
// import Login from "../Login/Login";

const ProviderDetails = (props: { selectedProvider: (arg0: any) => void; firstName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; middleName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; lastName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; gender: string; language: any; experience: any; }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [morningSelection, setMorningSelection] = useState(null);
  const [eveningSelection, setEveningSelection] = useState(null);
  const [eveningSelectionTime, setEveningSelectionTime] = useState(null);
  const [morningSelectionTime, setMorningSelectionTime] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState();
  const [open, setOpen] = useState(false);

//   const dietImages = {
//     VEG: require("../../assets/veg.png"),
//     NONVEG: require("../../assets/nonveg.png"),
//     BOTH: require("../../assets/nonveg.png"),
//   };

//   const dispatch = useDispatch();
//   const bookingType = useSelector((state) => state.bookingType?.value);
//   const user = useSelector((state) => state.user?.value);

//   const handleSelection = (hour, isEvening, time) => {
//     if (isEvening) {
//       setEveningSelection(hour);
//       setEveningSelectionTime(time);
//     } else {
//       setMorningSelection(hour);
//       setMorningSelectionTime(time);
//     }
//   };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

//   const calculateAge = (dob) => {
//     if (!dob) return "";
//     return moment().diff(moment(dob), "years");
//   };

  const handleBookNow = () => {
    // const booking = {
    //   eveningSelection: eveningSelectionTime,
    //   morningSelection: morningSelectionTime,
    //   ...bookingType,
    // };
    // dispatch(add(booking));

    const providerDetails = {
      ...props,
      selectedMorningTime: morningSelection,
      selectedEveningTime: eveningSelection,
    };
    props.selectedProvider(providerDetails);
  };

  const handleLogin = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

//   useEffect(() => {
//     if (user?.role === "CUSTOMER") {
//       setLoggedInUser(user);
//     }
//   }, [user]);

  const handleBookingPage = () => {
    setOpen(false);
  };

//   const dietImage = dietImages[props.diet];
  const isBookNowEnabled =
    (morningSelection !== null || eveningSelection !== null) && loggedInUser;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.expandToggle} onPress={toggleExpand}>
        <Text style={styles.expandText}>
          {isExpanded ? "-" : "+"}
        </Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.essentials}>
          <Text style={styles.title}>
            {props.firstName} {props.middleName} {props.lastName} (
            {props.gender === "FEMALE" ? "F" : props.gender === "MALE" ? "M" : "O"}
            {/* {calculateAge(props.dob)}) */}
          </Text>
          {/* {dietImage && <Image source={dietImage} style={styles.dietImage} />} */}
        </View>

        {isExpanded && (
          <ScrollView>
            <Text style={styles.subtitle}>
              Language: {props.language || "English"}
            </Text>
            <Text style={styles.subtitle}>
              Experience: {props.experience || "1 year"}
            </Text>

            <View style={styles.availability}>
              <Text style={styles.availabilityHeader}>Morning Availability</Text>
              <View style={styles.timeSlotContainer}>
                {[6, 7, 8, 9, 10, 11].map((hour, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.timeSlot,
                      morningSelection === index && styles.selectedTimeSlot,
                    ]}
                    // onPress={() => handleSelection(index, false, hour)}
                  >
                    <Text>{`${hour}:00`}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.availabilityHeader}>Evening Availability</Text>
              <View style={styles.timeSlotContainer}>
                {[12, 1, 2, 3, 4, 5, 6, 7].map((hour, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.timeSlot,
                      eveningSelection === index && styles.selectedTimeSlot,
                    ]}
                    // onPress={() => handleSelection(index, true, hour)}
                  >
                    <Text>{`${hour}:00`}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.actions}>
              {!loggedInUser && (
                <Button mode="outlined" onPress={handleLogin}>
                  Login
                </Button>
              )}
              <IconButton icon="information" disabled={!isBookNowEnabled} />
              <Button
                mode="contained"
                disabled={!isBookNowEnabled}
                onPress={handleBookNow}
              >
                Book Now
              </Button>
            </View>
          </ScrollView>
        )}
      </View>

      {/* <Portal>
        <Dialog visible={open} onDismiss={handleClose}>
          <Login bookingPage={handleBookingPage} />
        </Dialog>
      </Portal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
  },
  expandToggle: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#1976d2",
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  expandText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    marginTop: 20,
  },
  essentials: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  dietImage: {
    width: 20,
    height: 20,
    marginLeft: 8,
  },
  subtitle: {
    marginVertical: 5,
    fontSize: 16,
  },
  availability: {
    marginVertical: 15,
  },
  availabilityHeader: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  timeSlotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  timeSlot: {
    borderWidth: 1,
    borderColor: "#1976d2",
    borderRadius: 4,
    padding: 5,
    margin: 5,
  },
  selectedTimeSlot: {
    backgroundColor: "#1976d2",
    color: "#fff",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
});

export default ProviderDetails;
