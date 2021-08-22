
import type { AppProps } from "next/app";
import Head from 'next/head'
import GlobalStyle from "../styles/globalStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import React, { useState } from "react";



function MyApp({ Component, pageProps }: AppProps) {
  const [themeOption, setThemeOption] = useState(true)

  var themeProps = theme.colorDark;
  function handleTheme(){
    themeProps = themeOption ? theme.colorLight : theme.colorDark;
  }
  return (
    <>
    <Head>
      
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </Head>
      <GlobalStyle {...themeProps}/>
      <ThemeProvider theme={themeProps}>
       
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
export default MyApp;