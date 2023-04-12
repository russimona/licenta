import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/core/store";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/core/theme";
import createCache from "@emotion/cache";

export const muiCache = createCache({
  key: "mui",
  prepend: true,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={theme}>
          {/* <AuthContextProvider> */}
          <Component {...pageProps} />
          {/* </AuthContextProvider> */}
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

export default MyApp;
