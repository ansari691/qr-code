import Image from 'next/image';
import Typography from '@mui/material/Typography';
import { FormControl, Select, MenuItem, Alert } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from './_app';
import { useRouter } from 'next/router';
import { API } from '../constants/Api';
import { useSnackAlert } from '../hooks/useSnackAlert';
import { FormItemDropdown } from './registration';
import { getTechnicalSupportNumber } from '../constants/brands';

const FormItem = ({ formData, setFormData, label, field }: any) => {
  return (
    <div>
      <Typography style={{ marginBottom: 10 }}>{label}</Typography>
      <TextField
        fullWidth
        size="small"
        name={field}
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

// const FormItemDropdown = ({ label, value, setValue, options }: any) => {
//   return (
//     <div>
//       <Typography style={{ marginBottom: 10 }}>{label}</Typography>
//       <FormControl fullWidth>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={value}
//           size="small"
//           SelectDisplayProps={{
//             style: { height: '10px', padding: 5 },
//           }}
//           style={{ marginBottom: 20 }}
//           //   label="Age"
//           onChange={setValue}
//         >
//           {options.map((option: any) => (
//             <MenuItem key={option} value={option}>
//               {option}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
// };

const TechnicalSupport = () => {
  const { brand } = useContext(AppContext);
  const router = useRouter();
  const showSnackAlert = useSnackAlert();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const submitTechnicalSupportForm = async (formData: any) => {
    const serialNumber = router?.query?.serialNumber;
    const name = formData.firstName + ' ' + formData.lastName;
    delete formData.firstName;
    delete formData.lastName;
    // delete formData.country;
    if (serialNumber) {
      var data = JSON.stringify({
        contactForCase: {
          ...formData,
          name,
        },
        serial: serialNumber,
      });
      const response = await API.post('/Warranty/Case', data);
      console.log(response.data);
      // showSnackAlert('success', 'Form Submitted Successfully!');
      const phoneNumber = getTechnicalSupportNumber(brand?.brandName);
      router.push({
        pathname: '/technicalSupportConfirmation',
        query: { serialNumber, caseNumber: response?.data?.caseNumber, phoneNumber },
      });
    }
  };

  return (
    <div>
      <div style={{ padding: 20, textAlign: 'center', marginTop: 20 }}>
        {brand?.logo && (
          <Image src={brand?.logo as string} width={200} height={50} />
        )}
      </div>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <Typography variant="h5" fontWeight={1000}>
          Contact Technical Support
        </Typography>
      </div>

      <img
        src="/stock photo - call center - iStock-505471074.jpg"
        height="220"
        width="100%"
        style={{ marginBottom: 10 }}
      />

      <Typography style={{ padding: 30, textAlign: 'justify' }}>
        In order to give you faster service, please fill out the information
        below (you won&apos;t have to give us this information again over the
        phone). We&apos;ll use the information to direct your call to a
        technical support agent who specializes in your model.
      </Typography>

      {/* registration form */}
      <div style={{ padding: '20px 30px' }}>
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
              field: 'street',
            }}
          />
          <FormItem
            {...{
              formData,
              setFormData,
              label: 'Zip / Postal Code',
              field: 'zip',
            }}
          />
          <FormItem
            {...{
              formData,
              setFormData,
              label: 'City',
              field: 'city',
            }}
          />
          <FormItem
            {...{
              formData,
              setFormData,
              label: 'State, Province, Region',
              field: 'state',
            }}
          />
          {/* <FormItem
            {...{
              formData,
              setFormData,
              label: 'Country',
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
        </div> */}

        <div>
          <Button
            onClick={() => submitTechnicalSupportForm(formData)}
            sx={{ width: '100%', mt: 3 }}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSupport;
