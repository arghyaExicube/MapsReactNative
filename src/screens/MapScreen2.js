import React, { Component } from 'react';
import { PermissionsAndroid,Modal,StyleSheet, Text, View,TextInput,Dimensions,TouchableOpacity ,Image,ScrollView } from 'react-native';
import MapView,{Marker, Callout} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';
import Expo from 'expo';

var {height, width} = Dimensions.get('window');
export default class MapScreen2 extends Component {
    
    static navigationOptions = {
        header: null,
    };
    constructor(props){
        super(props);

        this.state={
            region: {
                latitude: 0.00,
                longitude: 0.00,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              },
            sourceregion: {
              latitude: 0.00,
              longitude: 0.00,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
              },
            destregion: {
              latitude: 0.00,
              longitude: 0.00,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
              },
            
            modalVisible: false,
            sourceSearchData: '',
            sourceSearchDetails: '',
            destinationSearchData: '',
            destinationSearchDetails: '',
            searchType: '',
            seeSource: false,
            seeDestination: false
        }

        this.getLocationAsync();
    
    }
    async getLocationAsync() {
      const { Location, Permissions } = Expo;
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        return Location.getCurrentPositionAsync({enableHighAccuracy: true});
      } else {
        throw new Error('Location permission not granted');
        alert(Error)
      }
    }

    componentWillMount() {
      if(this.props.details){
      this.setState({
          region: {
            latitude: this.props.details.geometry.location.lat,
            longitude: this.props.details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        })
      }
      else{
          navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position)
                this.setState({
                  region: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0322,
                    longitudeDelta: 0.0491,
                  }
                })
          },
            (error) => console.log(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
          );
      }
    }
      onRegionChange(region) {
        this.setState({ region });
      }
      
      goSearch(data) {
        this.setState({
          modalVisible: true, 
          searchType: data,
          seeDestination:false,
          seeSource:false,
        },()=>{console.log(data)});
      }
      showSource(){
        this.setState({
          seeSource:true,
          seeDestination:false,
        },()=>console.log('source pressed it '+this.state.searchType))
      }

      showDestination() {
        this.setState({
          seeDestination:true,
          seeSource:false,
        },()=>console.log('dest pressed it '+this.state.searchType))
      }
      

  render() {
    return (

    
      <ScrollView style={{ flex: 1 ,top:(height-(height-24))}} keyboardShouldPersistTaps={'always'}>

        <View style={styles.inputContainer}>
        {
          this.state.searchType == 'source' ?
          (this.state.sourceSearchData ?
            <View style={{flexDirection: 'row',width: '90%'}}>
              <TextInput
                placeholder="Search"
                style={ styles.input }
                onFocus={()=>{this.goSearch('source')}}
                underlineColorAndroid='transparent'
                value={this.state.sourceSearchData.description}
              />
              <Button
                small
                containerViewStyle={{marginLeft: 0,marginRight:0,width: '13%', }}
                buttonStyle={{height: 33,padding:0}}
                raised
                backgroundColor='#012f51'
                color="#fff"
                fontSize={15}
                textStyle={{fontWeight: 'bold'}}
                onPress={()=>{ this.showSource() }}
                title="See" 
              />
            </View>
            :
            <TextInput
              placeholder="Search"
              style={ styles.input }
              onFocus={()=>{this.goSearch('source')}}
              underlineColorAndroid='transparent'
            />)
            :
            (this.state.sourceSearchData ?
              <View style={{flexDirection: 'row',width: '90%'}}>
              <TextInput
                placeholder="Search"
                style={ styles.input }
                onFocus={()=>{this.goSearch('source')}}
                underlineColorAndroid='transparent'
                value={this.state.sourceSearchData.description}
              />
              <Button
                small
                containerViewStyle={{marginLeft: 0, marginRight:0, width: '13%' }}
                buttonStyle={{height: 33,padding:0}}
                raised
                backgroundColor='#012f51'
                color="#fff"
                fontSize={15}
                textStyle={{fontWeight: 'bold'}}
                onPress={()=>{ this.showSource() }}
                title="See" 
            />
            </View>
              :
              <TextInput
                placeholder="Search"
                style={ styles.input }
                onFocus={()=>{this.goSearch('source')}}
                underlineColorAndroid='transparent'
              />)
        }
            
          </View>
          <View style={[styles.inputContainer,{marginTop: 10}]}>
          {
          this.state.searchType == 'destination' ?
          (this.state.destinationSearchData ?
            <View style={{flexDirection: 'row',width: '90%'}}>
            <TextInput
              placeholder="Search"
              style={ styles.input }
              onFocus={()=>{this.goSearch('destination')}}
              underlineColorAndroid='transparent'
              value={this.state.destinationSearchData.description}
            />
            <Button
                small
                containerViewStyle={{marginLeft: 0,marginRight:0,width: '13%', }}
                buttonStyle={{height: 33,padding:0}}
                raised
                backgroundColor='#012f51'
                color="#fff"
                fontSize={15}
                textStyle={{fontWeight: 'bold'}}
                onPress={()=>{ this.showDestination() }}
                title="See" 
            />
            </View>
            :
            <TextInput
              placeholder="Search"
              style={ styles.input }
              onFocus={()=>{this.goSearch('destination')}}
              underlineColorAndroid='transparent'
            />)
            :
            (this.state.destinationSearchData ?
              <View style={{flexDirection: 'row',width: '90%'}}>
              <TextInput
                placeholder="Search"
                style={ styles.input }
                onFocus={()=>{this.goSearch('destination')}}
                underlineColorAndroid='transparent'
                value={this.state.destinationSearchData.description}
              />
              <Button
                small
                containerViewStyle={{marginLeft: 0,marginRight:0,width: '13%', }}
                buttonStyle={{height: 33,padding:0}}
                raised
                backgroundColor='#012f51'
                color="#fff"
                fontSize={15}
                textStyle={{fontWeight: 'bold'}}
                onPress={()=>{ this.showDestination() }}
                title="See" 
            />
            </View>
              :
              <TextInput
                placeholder="Search"
                style={ styles.input }
                onFocus={()=>{this.goSearch('destination')}}
                underlineColorAndroid='transparent'
              />)
        }
            
          </View>
        
{
  this.state.seeSource ?
  (<MapView 
            style={{ height: height}}
            region={this.state.sourceregion}
          >
          {
            (this.state.searchType == 'source' || this.state.seeSource) ?
            (this.state.sourceSearchData ? 
              <Marker
                coordinate={this.state.sourceregion}
                title={this.state.sourceSearchData.description}
                pinColor='#00ff00'
              />
              : 
              <Marker
                coordinate={this.state.region}
                title={"Your Location"}
                pinColor='#00ff00'
                // image={require('../assets/bluepin.png')}
                // description={"3 no, Sreenagar, madhyamgram, kol-700129"}
              />)
              :
              (
                (this.state.destinationSearchData || this.state.seeDestination) ? 
              <Marker
                coordinate={this.state.destregion}
                title={this.state.destinationSearchData.description}
              />
              : 
              <Marker
                coordinate={this.state.region}
                title={"Your Location"}
                pinColor='#00ff00'
              />
              )
          }
              
      </MapView>)
      :
      this.state.seeDestination ?
            (<MapView 
                style={{ height: height}}
                region={this.state.destregion}
              >
          {
            (this.state.searchType == 'destination' || this.state.seeDestination) ?
            (this.state.sourceSearchData ? 
              <Marker
                coordinate={this.state.destregion}
                title={this.state.destinationSearchData.description}
              />
              : 
              <Marker
                coordinate={this.state.region}
                title={"Your Location"}
                pinColor='#00ff00'
              />)
              :
              (
                (this.state.sourceSearchData || this.state.seeSource) ? 
              <Marker
                coordinate={this.state.sourceregion}
                title={this.state.sourceSearchData.description}
                pinColor='#00ff00'
              />
              : 
              <Marker
                coordinate={this.state.region}
                title={"Your Location"}
                pinColor='#00ff00'
              />
              )
          }
              
      </MapView>)
    :

      <MapView 
        style={{ height: height}}
        region={this.state.region}
      >
        {
          this.state.searchType == 'source' ?
          (this.state.sourceSearchData ? 
            <Marker
              coordinate={this.state.region}
              title={this.state.sourceSearchData.description}
              pinColor='#00ff00'
            />
            : 
            <Marker
              coordinate={this.state.region}
              title={"Your Location"}
              pinColor='#00ff00'
            />)
            :
            (
              this.state.destinationSearchData ? 
            <Marker
              coordinate={this.state.region}
              title={this.state.destinationSearchData.description}
            />
            : 
            <Marker
              coordinate={this.state.region}
              title={"Your Location"}
              pinColor='#00ff00'
            />
            )
        }
              
      </MapView>
      }

    <Modal
      animationType="none"
      transparent={false}
      visible={this.state.modalVisible}
      onRequestClose={() => {
        this.setState({modalVisible: false})
      }}
    >
    {
      this.state.searchType=='source' ?
     
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
        // this.goMap(data,details);
        this.setState({ 
          region: {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          sourceregion: {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          sourceSearchData: data, 
          sourceSearchDetails: details, 
          modalVisible: false,
          searchType: 'source'
        })
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
        // container: {
        //     top: 23
        // },
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
    :

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
        // this.goMap(data,details);
        this.setState({ 
          region: {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          destregion: {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          destinationSearchData: data, 
          destinationSearchDetails: details, 
          modalVisible: false,
          source: 'destination'
        })
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
        // container: {
        //     top: 23
        // },
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
    }
          </Modal>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    elevation: 1,
    height: '6%',
    backgroundColor: '#ccc',
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderLeftWidth: 8,
    marginRight: 0,
    // borderRightWidth: 8,
    borderColor: '#ccc',
    shadowOpacity: 0.75,
    shadowRadius: 1,
    shadowColor: 'gray',
    shadowOffset: { height: 0, width: 0}
  },
  input: {
    elevation: 1,
    backgroundColor: 'white',
    width: '99%',
    padding: 2,
    borderRadius: 3,
    // marginTop: 'auto',
    marginBottom: 'auto',
    // marginLeft: 'auto',
    // marginRight: 'auto',
  },
});
