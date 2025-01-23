import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import GooglePlacesAutocomplete from './GooglePlacesAutoComplete';

interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface MapComponentProps {
  style?: object;
  onLocationSelect: (data: string) => void; // Callback to pass the selected location
}

const MapComponent: React.FC<MapComponentProps> = ({ style, onLocationSelect }) => {
  const [userLocation, setUserLocation] = useState<LocationCoords | null>(null);
  const [clickedLocation, setClickedLocation] = useState<LocationCoords | null>(null);
  const [address, setAddress] = useState<string>('');

  const defaultCenter: LocationCoords = {
    latitude: 40.748817, // Default to NYC
    longitude: -73.985428,
  };

  // Initialize map location when the user selects a place
  const handlePlaceSelect = (place: any, lat: number, lng: number) => {
    setClickedLocation({ latitude: lat, longitude: lng });
    reverseGeocode(lat, lng);
  };

  // Function to perform reverse geocoding and fetch the address
  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (geocode.length > 0) {
        const { street, city, region, postalCode, country } = geocode[0];
        const formattedAddress = `${street || ''}, ${city || ''}, ${region || ''}, ${postalCode || ''}, ${country || ''}`;
        setAddress(formattedAddress);
        onLocationSelect(formattedAddress);
      } else {
        setAddress('No address found for this location.');
      }
    } catch (error) {
      setAddress('Error fetching address.');
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setUserLocation(defaultCenter);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const handleMapPress = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setClickedLocation({ latitude, longitude });
    reverseGeocode(latitude, longitude);
  };

  return (
    <View style={[styles.container, style]}>
      {/* Google Places Autocomplete Component */}
      <GooglePlacesAutocomplete onSelectPlace={handlePlaceSelect} />

      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation?.latitude || defaultCenter.latitude,
          longitude: userLocation?.longitude || defaultCenter.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {clickedLocation && (
          <Marker
            coordinate={clickedLocation}
            title="Selected Location"
          />
        )}
      </MapView>

      {/* Display the fetched address */}
      <View style={styles.addressContainer}>
        <Text style={styles.addressLabel}>Address:</Text>
        <Text style={styles.addressText}>{address}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 100,
  },
  addressContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  addressLabel: {
    fontWeight: 'bold',
  },
  addressText: {
    marginTop: 5,
  },
});

export default MapComponent;
