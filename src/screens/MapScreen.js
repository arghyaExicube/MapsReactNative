import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Actions } from 'react-native-router-flux';

// const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
// const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

export default class GooglePlacesInput extends Component {
    goMap(data,details) {

        // Actions.reset('MapScreen2')
        Actions.reset('MapScreen2',{ data: data, details: details });
    }
    render() {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      minLength={2} // minimum length of text to search
      autoFocus={true}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed='auto'    // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      textInputProps={{ clearButtonMode: 'while-editing' }}
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        this.goMap(data,details);
        console.log(data);
        console.log('data details');
        console.log(details.geometry.location.lat,details.geometry.location.lng);
      }}
      
      getDefaultValue={() => ''}
      
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyBnWPt2F4ituHwWHrzHisaHvuFTFydUwc4',
        language: 'en', // language of the results
        // types: '(cities)' // default: 'geocode'
      }}
      
      styles={{
        container: {
            top: 23
        },
        textInputContainer: {
          width: '100%',
        },
        description: {
          fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        }
      }}
      
      currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        key: 'AIzaSyDZ7HSZZafEkBmuwD2CdHrLJNn3kEm39Fo',
        language: 'en',  
    }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'prominence',
        types: 'establishment'
      }}

      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_1']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
    //   predefinedPlaces={[homePlace, workPlace]}

      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
    //   renderLeftButton={()  => 
    //     <Text>left button</Text>
    //   <Image source={require('path/custom/left-icon')} />
    // }
    //   renderRightButton={() => <Text>Custom text after the input</Text>}
    />
    
  );
}
}
