import Image from 'next/image';
import Typography from '@mui/material/Typography';
import {
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from '@mui/material';
import { useRouter } from 'next/dist/client/router';
import { AppContext } from './_app';
import { useContext, useEffect, useState } from 'react';
import { API } from '../constants/Api';
import { formatDistance, isAfter } from 'date-fns';
import { FINDCONTRACTORLINK } from '../constants/brands';
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

const SecondaryButton = ({ title, onClick }: any) => {
  return (
    <Button
      style={{
        backgroundColor: 'white',
        width: '100%',
        textTransform: 'none',
        marginBottom: 15,
        borderRadius: 10,
        height: 50,
      }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

const Troubleshooting = () => {
  const router = useRouter();
  const { brand } = useContext(AppContext);
  const [isLeaking, setIsLeaking] = useState('no');
  const [productData, setProductData] = useState<any>(null);
  const [outOfWarranty, setOutOfWarrany] = useState(false);

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
      title: 'Warranty',
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

  const handleSubmit = () => {
    if (outOfWarranty) {
      router.push(
        //@ts-ignore
        FINDCONTRACTORLINK[productData?.brandName] ??
          'https://www.hotwater.com/where-to-buy/search/'
      );
    }
    // else if (isLeaking === 'no') {
    //   router.push(`troubleshooting?serialNumber=${router.query.serialNumber}`);
    // }
    else {
      router.push(
        `technical-support1?serialNumber=${router.query.serialNumber}`
      );
    }
  };

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
          setOutOfWarrany(
            isAfter(new Date(), new Date(res.data?.tankWarrantyExpirationDate))
          );
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
      <div style={{ padding: 20, textAlign: 'center', marginTop: 20 }}>
        {brand?.logo && (
          <Image src={brand?.logo as string} width={200} height={50} />
        )}
      </div>
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <Typography variant="h5" fontWeight={1000}>
          Contact Technical Support
        </Typography>
      </div>

      <div style={{ padding: '0px 0px', textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={1000} color="primary.100">
          {productData?.productTitle}
        </Typography>
        {/* <Typography variant="h5" fontWeight={1000} color="primary.100">
          Electric Water Heater
        </Typography> */}
      </div>

      <div
        style={{
          display: 'flex',
          padding: '30px',
          paddingBottom: '0px',
          justifyContent: 'center',
          marginBottom: 20,
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
        </div>
      </div>

      <div style={{ padding: 30 }}>
        <Typography fontWeight={600}>Is Your Water Heater Leaking?</Typography>
        <RadioGroup
          value={isLeaking}
          row
          aria-label="gender"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="no"
            control={
              <Radio
                onChange={(e) => setIsLeaking(e.target.value)}
                style={{ color: isLeaking === 'no' ? brand?.primaryColor : '' }}
              />
            }
            label="No"
          />
          <FormControlLabel
            value="yes"
            control={
              <Radio
                onChange={(e) => setIsLeaking(e.target.value)}
                style={{
                  color: isLeaking === 'yes' ? brand?.primaryColor : '',
                }}
              />
            }
            label="Yes"
          />
        </RadioGroup>

        <div style={{ width: '100%', marginTop: 30 }}>
          <Button onClick={() => handleSubmit()} sx={{ width: '100%' }}>
            Submit
          </Button>
        </div>
      </div>

      {/* <div style={{ backgroundColor: 'rgb(0, 0, 0, 0.3)', padding: 30 }}>
        <SecondaryButton
          title="Out of Warranty AND leaker"
          onClick={() => router.push('replace')}
        />
        <SecondaryButton
          title="Out of Warranty AND Non-leaker"
          onClick={() => router.push('repair-replace')}
        />
        <SecondaryButton
          title="Parts + Tank Warranty (2nd year - nth year) AND Leaker"
          onClick={() =>
            router.push({
              pathname: 'technical-support1',
              query: { serialNumber: router?.query?.serialNumber },
            })
          }
        />
        <SecondaryButton
          title="Labor + Parts + Tank Warranty (1st year) AND Leaker OR Non-leakers"
          onClick={() =>
            router.push({
              pathname: 'technical-support1',
              query: { serialNumber: router?.query?.serialNumber },
            })
          }
        />
        <SecondaryButton
          title="Parts + Tank Warranty (2nd year - nth year) AND Non-Leaker"
          onClick={() => router.push('repair-replace')}
        />
      </div> */}
    </div>
  );
};

export default Troubleshooting;
