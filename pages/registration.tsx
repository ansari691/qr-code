import Image from 'next/image';
import Typography from '@mui/material/Typography';
import { FormControl, Select, MenuItem, Snackbar, Alert } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import { useContext, useState } from 'react';
import { AppContext } from './_app';
import { useRouter } from 'next/router';
import { API } from '../constants/Api';
import { useSnackAlert } from '../hooks/useSnackAlert';

const ratingItemData = [
  {
    label: 'Appearance',
  },
  {
    label: 'Ease of Use',
  },
  {
    label: 'Features',
  },
  {
    label: 'Quality of Product',
  },
  {
    label: 'Value of Product',
  },
];

const FormItem = ({ formData, setFormData, label, field }: any) => {
  return (
    <div>
      <Typography style={{ marginBottom: 10 }}>{label}</Typography>
      <TextField
        fullWidth
        name={field}
        size="small"
        id="outlined-basic"
        variant="outlined"
        style={{ marginBottom: 20 }}
        InputProps={{
          style: { height: 30 },
        }}
        onChange={(e) => {
          setFormData({ ...formData, [field]: e.target.value });
        }}
      />
    </div>
  );
};

export const FormItemDropdown = ({
  label,
  formData,
  setFormData,
  options,
  field,
}: any) => {
  return (
    <div>
      <Typography style={{ marginBottom: 10 }}>{label}</Typography>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formData[field]}
          size="small"
          SelectDisplayProps={{
            style: { height: '10px', padding: 5 },
          }}
          style={{ marginBottom: 20 }}
          //   label="Age"
          onChange={(e) => {
            setFormData({ ...formData, [field]: e.target.value });
          }}
        >
          {options.map((option: any) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const RatingItem = ({ label }: any) => {
  return (
    <div style={{ marginBottom: 30 }}>
      <Typography style={{ marginBottom: 15 }}>{label}</Typography>
      <StyledRating
        name="customized-color"
        defaultValue={2}
        getLabelText={(value: number) =>
          `${value} Heart${value !== 1 ? 's' : ''}`
        }
        // precision={0.5}
        icon={
          <div
            style={{
              width: '17.5vw',
              height: 20,
              background: 'skyblue',
              border: '1px solid rgb(0, 0, 0, 0.20)',
            }}
          ></div>
        }
        emptyIcon={
          <div
            style={{
              width: '17.5vw',
              height: 20,
              background: 'lightgray',
              border: '1px solid rgb(0, 0, 0, 0.15)',
            }}
          ></div>
        }
      />
    </div>
  );
};

const Registration = () => {
  const { brand } = useContext(AppContext);
  const showSnackAlert = useSnackAlert();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    mailingStreet: '',
    mailingPostalCode: '',
    mailingCity: '',
    mailingState: '',
    country: '',
  });

  const register = async (formData: any) => {
    const serialNumber = router?.query?.serialNumber;
    // delete formData.country;
    if (serialNumber) {
      var data = JSON.stringify({
        ...formData,
        // serial: serialNumber,

        // email: 'ansari691@gmail.com',
        // firstName: 'nisi dolore sit nostrud',
        // lastName: 'officia lab',
        // mailingCity: 'sit do voluptate commodo dolore',
        // mailingPostalCode: 'in',
        // mailingState: 'cupidatat of',
        // mailingStreet: 'exercitation Duis culpa velit',
        // phone: 'veniam dolore in proident',
        serial: serialNumber,
      });
      console.log(data);
      const response = await API.post('/Warranty/Register', data);
      console.log(response.data);
      // alert('Form submitted successfully!');
      // showSnackAlert('success', 'Warranty Registered Successfully!');
      router.push({
        pathname: 'registrationConfirmation',
        query: { serialNumber },
      });
    }
  };

  console.log(formData);
  return (
    <div>
      {/* <main style={{ padding: 20 }}> */}
      <div style={{ padding: 20, textAlign: 'center', marginTop: 20 }}>
        {brand?.logo && (
          <Image src={brand?.logo as string} width={200} height={50} />
        )}
      </div>
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={1000}>
          Register your water heater
        </Typography>
      </div>

      {/* registration form */}
      <div style={{ padding: 30 }}>
        <div style={{ marginBottom: 20 }}>
          <Typography style={{ marginBottom: 15 }} fontWeight={600}>
            Warranty Holder Information
          </Typography>

          <FormItem
            {...{
              formData,
              setFormData,
              label: 'First Name',
              field: 'firstName',
            }}
          />
          <FormItem
            {...{
              formData,
              setFormData,
              label: 'Last Name',
              field: 'lastName',
            }}
          />
          <FormItem
            {...{
              formData,
              setFormData,
              label: 'Email',
              field: 'email',
            }}
          />
          <FormItem
            {...{
              formData,
              setFormData,
              label: 'Phone',
              field: 'phone',
            }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <Typography style={{ marginBottom: 15 }} fontWeight={600}>
            Installation Address
          </Typography>

          <FormItem
            {...{
              formData,
              setFormData,
              label: 'Street Address',
              field: 'mailingStreet',
            }}
          />
          <FormItem
            {...{
              formData,
              setFormData,
              label: 'Zip / Postal Code',
              field: 'mailingPostalCode',
            }}
          />
          <FormItem
            {...{
              formData,
              setFormData,
              label: 'City',
              field: 'mailingCity',
            }}
          />
          <FormItem
            {...{
              formData,
              setFormData,
              label: 'State, Province, Region',
              field: 'mailingState',
            }}
          />
          {/* <FormItem
            {...{
              formData,
              setFormData,
              label: 'country',
              field: 'country',
            }}
          /> */}
          <FormItemDropdown
            {...{
              formData,
              setFormData,
              label: 'country',
              field: 'country',
            }}
            label="Country"
            value={formData.country}
            options={['United States', 'Canada']}
          />
          {/*
          <FormItemDropdown
            label="ZIP / postal code"
            value="421302"
            options={['421302', '421305', '421308']}
          /> */}
        </div>

        {/* <div style={{ marginBottom: 20 }}>
          <Typography fontWeight={600}>Installation Type</Typography>
          <FormItemDropdown
            label=""
            value="Residential"
            options={['Residential', 'Commercial']}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <Typography fontWeight={600}>Installer</Typography>
          <FormItemDropdown
            label=""
            value="Contractor"
            options={['Contractor', 'Company']}
          />
        </div>

        <div>
          <Typography fontWeight={600}>Installion Company</Typography>
          <FormItemDropdown
            label=""
            value="J. Winslett Plumbing, LLC"
            options={['J. Winslett Plumbing, LLC', 'XYZ Plumbing, LLC']}
          />
        </div>
      </div> */}

        {/* review form */}
        {/* <div>
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={1000}>
            Review your water heater
          </Typography>
        </div>

        <div style={{ width: '100%', padding: 30 }}>
          {ratingItemData.map((ratingItem) => (
            <RatingItem key={ratingItem.label} label={ratingItem.label} />
          ))}
        </div>

        <div style={{ padding: '0px 30px', marginBottom: 40 }}>
          <Typography fontWeight={600} sx={{ mb: 1 }}>
            Your Review
          </Typography>
          <TextField
            id="outlined-textarea"
            fullWidth
            multiline
            rows={4}
            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            // variant="standard"
            // style={{ border: "1px solid rgba(0, 0, 0, 0.20)", borderRadius: 15 }}
          />
        </div> */}

        <div style={{ width: '100%', padding: '0px 30px', marginBottom: 50 }}>
          <Button onClick={() => register(formData)} sx={{ width: '100%' }}>
            Submit Registration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
