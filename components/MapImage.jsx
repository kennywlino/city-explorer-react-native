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

export default MapImage;