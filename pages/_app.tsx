import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createTheme, ThemeProvider } from '@mui/material';
import { BRANDS } from '../constants/brands';
import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { SnackAlert } from '../components/SnackAlert';

export const AppContext = createContext<{
  brand: {
    brandName: string;
    logo: string;
    font: string;
    primaryColor: string;
    secondaryColor: string;
  } | null;
  setBrand: (brand: any) => void;
  setSnackData: (
    snackData: {
      severity: 'info' | 'error' | 'warning' | 'success';
      message: string;
      duration?: number;
    } | null
  ) => void;
}>({
  brand: null,
  setBrand: () => {},
  setSnackData: () => {},
});

function MyApp({ Component, pageProps }: AppProps) {
  const [brand, setBrand] = useState<any>(null);
  const router = useRouter();
  const [snackData, setSnackData] = React.useState<{
    severity: 'info' | 'error' | 'warning' | 'success';
    message: string;
  } | null>(null);

  // const brandName = router.query.brandName as string;
  useEffect(() => {
    console.log('brand', brand);
    let existingBrand = BRANDS.find(
      (brand) => brand.brandName === localStorage.getItem('brandName')
    );
    console.log(existingBrand);
    if (!localStorage.getItem('brandName') || !existingBrand) {
      const defaultBrand = BRANDS.find(
        (brand) => brand.brandName === 'A.O. Smith'
      );
      setBrand(defaultBrand);
      localStorage.setItem('brandName', 'A.O. Smith');
    } else {
      let existingBrand = BRANDS.find(
        (brand) => brand.brandName === localStorage.getItem('brandName')
      );
      setBrand(existingBrand);
    }
  }, [brand]);

  const theme = createTheme({
    typography: {
      fontFamily: [brand?.font].join(','),
      h6: {
        fontWeight: 'bold',
      },
      h5: {
        fontFamily: [brand?.boldFont].join(','),
      },
    },
    palette: {
      primary: {
        main: '#3E3E3E',
        '100': brand?.primaryColor,
        '200': '#5BA62F',
        '300': '#85B82B',
      },
      secondary: {
        main: '#5BA62F',
        '100': '#85B82B',
      },
    },
    components: {
      // MuiPaper: {
      //   styleOverrides: {
      //     root: {
      //       boxShadow: "0px 5px 15px #0000001A",
      //     },
      //   },
      // },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: [brand?.font].join(','),
          },
        },
        defaultProps: {
          variant: 'contained',
          style: {
            marginBottom: 20,
            borderColor: brand?.secondaryColor,
            backgroundColor: brand?.primaryColor,
            textTransform: 'none',
            borderRadius: 10,
          },
        },
      },
      // MuiTableCell: {
      //   styleOverrides: {
      //     root: {
      //       borderRight: "0.1px solid rgba(0, 0, 0, 0.08)",
      //     },
      //   },
      // },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{ brand, setBrand, setSnackData }}>
        <Component {...pageProps} />
        <SnackAlert snackData={snackData} setSnackData={setSnackData} />
      </AppContext.Provider>
    </ThemeProvider>
  );
}
export default MyApp;
