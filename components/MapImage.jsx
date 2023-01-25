import { Image, StyleSheet } from "react-native";

const MapImage = (props) => {
  return (
    <>
    { props.mapImage ? 
        <Image
          style={styles.image}
          source={{
                    uri: props.mapImage
                  }}
        /> : ''
    }
    </>
  );
}

const styles = StyleSheet.create({
  image: {
   width: 300,
   height: 300,
  },
});

export default MapImage;