import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/dist/client/router';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from './_app';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { API } from '../constants/Api';
import { formatDistance, isAfter } from 'date-fns';
import { BRANDS, FINDCONTRACTORLINK } from '../constants/brands';
import { CircularProgress } from '@mui/material';
import { NoProductFound } from '../components/NoProductFound';

const ProductDetail = ({ title, value }: any) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginBottom: 15,
      }}
    >
      <Typography fontWeight={600}>{title}: </Typography>
      &nbsp;
      <Typography style={{ paddingTop: 0, marginTop: 0, lineHeight: 0.9 }}>
        {value}
      </Typography>
    </div>
  );
};

const Home: NextPage = () => {
  const router = useRouter();
  const { brand } = useContext(AppContext);
  const [productData, setProductData] = useState<any>(null);
  const [showTroubleShootingButton, setShowTroubleShootingButton] =
    useState(false);
  const { setBrand } = useContext(AppContext);

  const productDetailData = [
    {
      title: 'Model Number',
      value: productData?.description,
    },
    {
      title: 'Serial Number',
      value: productData?.serialNumberEntered,
    },
    {
      title: 'Warranty Status',
      value: productData?.tankWarrantyExpirationDate
        ? isAfter(new Date(), new Date(productData?.tankWarrantyExpirationDate))
          ? 'Out of Warranty'
          : formatDistance(
              new Date(productData?.tankWarrantyExpirationDate),
              new Date()
            )
        : '',
    },
  ];

  useEffect(() => {
    const serialNumber = router.query.serialNumber;
    if (serialNumber) {
      var data = JSON.stringify({
        isLeaking: false,
        serialNumber,
        language: 'E',
      });
      API.post('/Warranty/Check', data)
        .then((res) => {
          console.log(res.data);
          setProductData(res.data);
          setBrand(
            BRANDS.find((brand) => brand.brandName === res.data.brandName)
          );
          localStorage.setItem('brandName', res?.data?.brandName);
          localStorage.setItem('productHierachy', res?.data?.productHierachy);
        })
        .catch((err) => console.log(err));
    }
  }, [router.query.serialNumber]);

  console.log(brand);

  useEffect(() => {
    const serialNumber = router.query.serialNumber;
    if (serialNumber) {
      var data = JSON.stringify({
        material: 'cupidatat voluptate',
        serial: serialNumber,
      });
      API.post('/Material/ProductMetadata', data)
        .then((res) => {
          if (res.data.productMetadata.length > 0) {
            setShowTroubleShootingButton(true);
          }
          // console.log("line 34", res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [router.query.serialNumber]);

  if (!productData) {
    return (
      <div
        style={{
          display: 'flex',
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress color="info" />
      </div>
    );
  }

  if (productData?.wasFound === false) {
    return <NoProductFound />;
  }

  return (
    <div>
      <Head>
        <title>QR Code</title>
        <meta name="description" content="qr code app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div style={{ padding: 20, marginTop: 20, textAlign: 'center' }}>
          {brand?.logo && (
            <Image
              src={brand?.logo as string}
              width={200}
              height={50}
              alt="brand image"
            />
          )}
        </div>
        <div style={{ padding: '0px 0px', textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={1000} color="primary.100">
            {/* ProLine&reg; Master 50-Gallon */}
            {productData?.productTitle}
          </Typography>
          {/* <Typography variant="h5" fontWeight={1000} color="primary.100">
            Electric Water Heater
          </Typography> */}
        </div>

        {/* product details */}
        <div
          style={{
            display: 'flex',
            padding: '30px',
            paddingBottom: '0px',
            justifyContent: 'center',
            minHeight: 250,
          }}
        >
          {/* left */}
          <div style={{ paddingRight: 20 }}>
            <img
              src={
                productData?.heaterUnitImageLink
                  ? productData?.heaterUnitImageLink
                  : '/no-image-found.png'
              }
              height="100%"
              width="100%"
              // maxHeight="100%"
              // width="100%"
            />
          </div>
          {/* right */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ marginBottom: 20 }}>
              {productDetailData.map((productDetail) => {
                return (
                  <ProductDetail key={productDetail.title} {...productDetail} />
                );
              })}
            </div>
            {/* <Button
              variant="outlined"
              startIcon={
                <Image src="/Icon - Wrench.png" height={10} width={10} />
              }
              style={{
                borderColor: brand?.secondaryColor,
                width: "100%",
                textAlign: "left",
                marginRight: "auto",
                textTransform: "none",
              }}
              title="Accessories"
              onClick={() => router.push("parts-accessories")}
            >
              Parts / Accessories
            </Button> */}
          </div>
        </div>

        {/* <div style={{ padding: '30px' }}>
          <Accordion
            style={{
              border: `1px solid ${brand?.secondaryColor}`,
              borderRadius: 10,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Description</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{productData?.description}</Typography>
            </AccordionDetails>
          </Accordion>
        </div> */}

        <div style={{ padding: '0px 30px', marginBottom: 50 }}>
          {productData?.userManuallink && (
            <Button
              variant="outlined"
              // style={{
              //   borderColor: brand?.secondaryColor,
              //   width: "100%",
              //   textAlign: "left",
              //   marginBottom: 20,
              //   textTransform: "none",
              // }}
              sx={{ width: '100%' }}
              onClick={() =>
                router.push({
                  pathname: 'documentation',
                  query: { userManualLink: productData?.userManualLink },
                })
              }
              title="User Manual"
              startIcon={
                <Image src="/Icon - Documentation.png" height={10} width={10} />
              }
            >
              User Manual
            </Button>
          )}
          <Button
            variant="contained"
            onClick={() =>
              router.push({
                pathname: 'registration',
                query: { serialNumber: router?.query?.serialNumber },
              })
            }
            sx={{ width: '100%', mt: 4 }}
          >
            Register Your Water Heater
          </Button>
          {showTroubleShootingButton && (
            <Button
              onClick={() =>
                router.push({
                  pathname: 'troubleshooting',
                  query: { serialNumber: router?.query?.serialNumber },
                })
              }
              sx={{ width: '100%' }}
            >
              Troubleshooting
            </Button>
          )}
          <Button
            onClick={() =>
              router.push({
                pathname: 'technical-support',
                query: { serialNumber: router?.query?.serialNumber },
              })
            }
            sx={{ width: '100%' }}
          >
            Contact Technical Support
          </Button>
          <Button
            // onClick={() => router.push('find-contractor')}
            href={
              //@ts-ignore
              FINDCONTRACTORLINK[productData?.brandName] ??
              'https://www.hotwater.com/where-to-buy/search/'
            }
            sx={{ width: '100%' }}
          >
            Find a Contractor
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Home;
