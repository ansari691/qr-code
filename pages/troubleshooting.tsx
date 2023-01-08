import Image from 'next/image';
import Typography from '@mui/material/Typography';
import { Button, CircularProgress } from '@mui/material';
import { useRouter } from 'next/dist/client/router';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from './_app';
import { API } from '../constants/Api';

const Troubleshooting = () => {
  const { brand } = useContext(AppContext);
  const [urls, setUrls] = useState([
    // 'https://www.youtube.com/embed/E8Df6RNShRk',
    // 'https://www.youtube.com/embed/E8Df6RNShRk',
    // 'https://www.youtube.com/embed/E8Df6RNShRk',
    // 'https://www.youtube.com/embed/E8Df6RNShRk',
  ]);
  const router = useRouter();
  // const videoUrls = [
  //   'https://www.youtube.com/embed/E8Df6RNShRk',
  //   'https://www.youtube.com/embed/E8Df6RNShRk',
  //   'https://www.youtube.com/embed/E8Df6RNShRk',
  //   'https://www.youtube.com/embed/E8Df6RNShRk',
  // ];

  useEffect(() => {
    const serialNumber = router.query.serialNumber;
    if (serialNumber) {
      var data = JSON.stringify({
        material: 'cupidatat voluptate',
        serial: router.query.serialNumber,
      });
      API.post('/Material/ProductMetadata', data)
        .then((res) => {
          console.log('line 34', res.data);
          setUrls(res.data.productMetadata.map((item: any) => item.link));
        })
        .catch((err) => console.log(err));
    }
  }, [router.query.serialNumber]);

  if (urls.length === 0) {
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

  return (
    <div>
      <div style={{ padding: 20, textAlign: 'center', marginTop: 20 }}>
        {brand?.logo && (
          <Image src={brand?.logo as string} width={200} height={50} />
        )}
      </div>
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={1000}>
          Troubleshooting
        </Typography>
      </div>

      <div style={{ padding: '20px 30px' }}>
        <Button
          onClick={() =>
            router.push(
              `technical-support?serialNumber=${router.query.serialNumber}`
            )
          }
          sx={{ marginBottom: 20, width: '100%' }}
        >
          Contact Technical Support
        </Button>
        {/* <br /> */}
        <Button
          onClick={() => router.push('find-contractor')}
          sx={{ width: '100%' }}
        >
          Find a Contractor
        </Button>
      </div>

      <div style={{ padding: '0px 20px' }}>
        {urls.map((videoUrl, index) => {
          return (
            <iframe
              key={index}
              width="100%"
              height="200"
              style={{ marginBottom: 20 }}
              src={videoUrl}
              title="YouTube video player"
              // frameborder={10}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              // allowfullscreen
            ></iframe>
          );
        })}
      </div>
    </div>
  );
};

export default Troubleshooting;
