import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { AppContext } from './_app';
import { useRouter } from 'next/router';

const Registration = () => {
  const { brand } = useContext(AppContext);
  const router = useRouter();
  const phoneNumber = router.query.phoneNumber;

  return (
    <div>
      <div style={{ padding: 20, textAlign: 'center', marginTop: 20 }}>
        {brand?.logo && (
          <Image src={brand?.logo as string} width={200} height={50} />
        )}
      </div>
      <div
        style={{
          textAlign: 'center',
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <Typography sx={{ mb: 2 }} textAlign={'center'}>
          Case Number: {router.query.caseNumber}{' '}
        </Typography>
        <Typography>
          Your case has been created. Please contact technical support at{' '}
          <a
            style={{ color: brand?.primaryColor }}
            href={`tel:+1-${phoneNumber}`}
          >
            {phoneNumber}
          </a>
          .
        </Typography>
        <Typography sx={{ my: 2 }}>
          When you call, Let your agent know you created your case with the QR
          code, and that you already have a case number. Having this number will
          help expedite your service.
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
