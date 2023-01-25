import { React } from 'react';
import { Icon, Input, MaterialIcons, Pressable } from "native-base";
import { FontAwesome5 } from '@expo/vector-icons';

const LocationInput = (props) => {

  const useLocation = () => {
    console.log('testing 123');
  }

  return (
     <Input 
        variant="rounded" 
        size="2xl" 
        placeholder="Location" 
        w="80%" 
        InputRightElement={
          <Pressable 
            onPress={() => props.getCurrentLocation()}
            padding="10px"
          >
            <Icon as={<FontAwesome5
              name='location-arrow' 
              size={40} 
              />}
              
            />
          </Pressable>
        }  
      /> 
    );
};

export default LocationInput;