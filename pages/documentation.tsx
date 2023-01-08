import Image from 'next/image';
import Typography from '@mui/material/Typography';
import { FormControl, Select, MenuItem, Button } from '@mui/material';
import { useContext, useState } from 'react';
import { AppContext } from './_app';
import { useRouter } from 'next/router';

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
//             style: { height: "30px", padding: "15px 5px 5px 5px" },
//           }}
//           style={{ marginBottom: 20 }}
//           //   label="Age"
//           onChange={(e) => setValue(e.target.value)}
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

const Documentation = () => {
  // const [productName, setProductName] = useState(
  //   "ProLine Standard Electric - Manual (100309797)"
  // );
  const router = useRouter();

  const { brand } = useContext(AppContext);
  console.log(brand);
  return (
    <div>
      {/* <main style={{ padding: 20 }}> */}
      {/* <div style={{ padding: 20, textAlign: "center", marginTop: 20 }}>
        {brand?.logo && (
          <Image src={brand?.logo as string} width={200} height={50} />
        )}
      </div>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h5" fontWeight={1000}>
          Documentation
        </Typography>
      </div>

      <div style={{ padding: "20px 25px 5px 25px" }}>
        <div style={{ marginBottom: 10 }}>
          <FormItemDropdown
            // label="Proline Standard Electrice - Manual (100309797)"
            value="ProLine Standard Electric - Manual (100309797)"
            options={["ProLine Standard Electric - Manual (100309797)"]}
            setValue={setProductName}
          />
          <Typography sx={{ mb: 1 }} fontWeight={600}>
            {productName}
          </Typography>
          <Button>
            <a href="100277325.pdf" target={"_blank"}>
              Open in New Window
            </a>
          </Button> */}
      <iframe
      //@ts-ignore
        src={
          router?.query?.userManualLink
            ? router.query.userManualLink
            : 'https://qr-code-eta.vercel.app/100277325.pdf'
        }
        title="description"
        width="100%"
        height="100vh"
        style={{ height: '100vh' }}
      ></iframe>
      {/* </div>
      </div> */}
    </div>
  );
};

export default Documentation;
