import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Footer= () => {

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.footer}>
     <Text style={styles.text}>ServEaso</Text>
      {/* <Text style={styles.logo}><b>ServEase</b></Text> */}
      <View style={styles.socialMedia}>
        <TouchableOpacity onPress={() => openLink('https://www.twitter.com')}>
          <FontAwesome name="twitter"  color="#fff" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://www.instagram.com')}>
          <FontAwesome name="instagram" color="#fff" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://www.youtube.com')}>
          <FontAwesome name="youtube" color="#fff" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://www.linkedin.com')}>
          <FontAwesome name="linkedin"  color="#fff" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://www.facebook.com')}>
          <FontAwesome name="facebook"  color="#fff" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    // backgroundColor: '#333',
    backgroundColor:'rgb(200, 228, 255)'
  },
  logo: {
    // color: '#fff',
    color:'#075aa8',
    fontWeight: 'bold',
  },
  text:{ 
    fontSize: 17,
    fontWeight: '700',
   fontFamily:'icons',
  //  color: '#fff',
  color:'#075aa8',
   paddingTop:10,
  },
  socialMedia: {
    flexDirection: 'row',
    marginTop: 10,
  },
  icon: {
    marginHorizontal: 10,
    paddingBottom: 10,
    gap: 10,
  },
});
// const styles = StyleSheet.create({


// })
export default Footer;
