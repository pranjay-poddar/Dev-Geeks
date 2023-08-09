import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    // Make a icon button 
    <IconButton
      variant="outline"
      color="white"
      pos={'fixed'}
      top={'4'} // 1 unit is = 4px in chakra (total 16px here)
      right={'16px'} // can also give in px (4 == 16px)
      zIndex={'overlay'}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};

export default ColorModeSwitcher;