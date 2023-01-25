import React from 'react';
import { AspectRatio, Box, Center, Heading, HStack, Image, Stack, Text } from 'native-base';


const CityDisplay = (props) => {
    return (Object.keys(props.cityData).length > 0 && props.mapImage ? <Box alignItems="center">
        <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700"
      }} _web={{
        shadow: 2,
        borderWidth: 0
      }} _light={{
        backgroundColor: "gray.50"
      }}>
          <Box>
            <AspectRatio w="100%" ratio={4 / 3}>
              <Image source={{
              uri: props.mapImage
            }} alt="image" />
            </AspectRatio>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                {`${props.cityData.address.city}, ${props.cityData.address.state}`}
              </Heading>
              <Text fontSize="xs" _light={{
              color: "blue.500"
            }} _dark={{
              color: "blue.400"
            }} fontWeight="500" ml="-0.5" mt="-1">
                {props.cityData.address.county}
              </Text>
            </Stack>
            <Text fontWeight="400">
              {`${props.cityData.address.house_number} ${props.cityData.address.road}, ${props.cityData.address.neighbourhood}`}
            </Text>
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center">
                <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
              }} fontWeight="400">
                  {`${props.cityData.lat}, ${props.cityData.lon}`}
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Box> : ''
    )
  };

export default CityDisplay;