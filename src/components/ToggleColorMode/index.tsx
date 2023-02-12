import { useColorMode } from '@chakra-ui/react';

import { Presenter, type ToggleColorModeProps } from './presenter';

export const ToggleColorMode = (props: ToggleColorModeProps) => {
  const { colorMode: currentColorMode, toggleColorMode } = useColorMode();

  return (
    <Presenter
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      {...{ currentColorMode, toggleColorMode }}
    />
  );
};
