import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

interface GooglePlacesAutocompleteProps {
  onSelectPlace: (place: any, lat: number, lng: number) => void; // Callback when a place is selected
  placeholder?: string; // Custom placeholder for the input
}

const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps> = ({
  onSelectPlace,
  placeholder = "Search for a location",
}) => {
  const [address, setAddress] = useState<string>(''); // Store address text for display
  const [suggestions, setSuggestions] = useState<any[]>([]); // Store suggestions

  // Fetch suggestions using Google Places API
  const fetchSuggestions = async (input: string) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=YOUR_GOOGLE_API_KEY`
      );
      const data = await response.json();
      if (data.status === "OK") {
        setSuggestions(data.predictions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  // Handle input change
  const handleInputChange = (text: string) => {
    setAddress(text);
    fetchSuggestions(text);
  };

  // Handle suggestion selection
  const handleSuggestionSelect = async (suggestion: any) => {
    setAddress(suggestion.description);
    setSuggestions([]);

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${suggestion.place_id}&key=YOUR_GOOGLE_API_KEY`
      );
      const data = await response.json();
      if (data.status === "OK") {
        const location = data.result.geometry.location;
        onSelectPlace(data.result, location.lat, location.lng);
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Input Field */}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={address}
        onChangeText={handleInputChange}
      />

      {/* Suggestions List */}
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => handleSuggestionSelect(item)}
            >
              <Text>{item.description}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionsContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  suggestionsContainer: {
    maxHeight: 200,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  suggestionItem: {
    padding: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
});

export default GooglePlacesAutocomplete;
