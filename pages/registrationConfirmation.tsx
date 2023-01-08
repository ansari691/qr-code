import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { AppContext } from './_app';
import { useRouter } from 'next/router';

const Registration = () => {
  const { brand } = useContext(AppContext);
  const router = useRouter();

  return (
    <div>
      <div style={{ padding: 20, textAlign: 'center', marginTop: 20 }}>
        {brand?.logo && (
          <Image src={brand?.logo as string} width={200} height={50} />
        )}
      </div>
      <div
        style={{
          display: 'flex',
          minHeight: '70vh',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography sx={{ mb: 2 }}>
          Thank you for registering your product!
        </Typography>
        <Button
          onClick={() =>
            router.push({
              pathname: '/',
              query: { serialNumber: router.query.serialNumber },
            })
          }
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Registration;
