import { React } from 'react';
import { Icon, Input, MaterialIcons, Pressable } from "native-base";

const LocationInput = () => {
  return (
     <Input 
        variant="rounded" 
        size="2xl" 
        placeholder="Location" 
        w="80%" 
        InputRightElement={<Icon />}  
      /> 
    );
};

export default LocationInput;