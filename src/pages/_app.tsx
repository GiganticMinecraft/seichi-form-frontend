/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import type { AppProps } from 'next/app';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
      // fetchして60秒（1000ms * 60）はcacheを読み込む
      staleTime: 60 * 1000,
    },
    mutations: {
      retry: 0,
    },
  },
});

const customTheme = extendTheme({
  breakPoints: {
    xl: '1440px',
    '2xl': '2560px',
  },
  components: {
    Container: {
      baseStyle: {
        maxW: {
          base: '60ch',
          md: '120ch',
        },
      },
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </ChakraProvider>
  </QueryClientProvider>
);

// https://zenn.dev/sora_kumo/articles/e86bbf0291d4a7
if (process.env.NODE_ENV !== 'production') {
  App.getInitialProps = async () => ({ pageProps: {} });
}

export default App;
