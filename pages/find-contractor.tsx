import Image from "next/image";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  Select,
  MenuItem,
  InputAdornment,
  OutlinedInput,
  Button,
  Divider,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useContext } from "react";
import { AppContext } from "./_app";

const FormItemDropdown = ({ label, value, setValue, options }: any) => {
  return (
    <div>
      <Typography style={{ marginBottom: 10 }}>{label}</Typography>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          size="small"
          style={{ marginBottom: 20 }}
          onChange={setValue}
        >
          {options.map((option: any) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

const CustomButton = ({ fullWidth, label }: any) => {
  const { brand } = useContext(AppContext);
  return (
    <Button
      variant="contained"
      style={{
        backgroundColor: brand?.primaryColor,
        width: fullWidth ? "100%" : "",
        textTransform: "none",
      }}
    >
      {label}
    </Button>
  );
};

const FindContractor = () => {
  const { brand } = useContext(AppContext);
  const contractors = [
    {
      name: "Wayne Owens Plumbing",
      location: "Hendersonville, TN 37075",
    },
    {
      name: "Wayne Owens Plumbing",
      location: "Hendersonville, TN 37075",
    },
    {
      name: "Wayne Owens Plumbing",
      location: "Hendersonville, TN 37075",
    },
    {
      name: "Wayne Owens Plumbing",
      location: "Hendersonville, TN 37075",
    },
    {
      name: "Wayne Owens Plumbing",
      location: "Hendersonville, TN 37075",
    },
  ];
  return (
    <div>
      <div style={{ padding: 20, textAlign: "center", marginTop: 20 }}>
      {brand?.logo && (
          <Image src={brand?.logo as string} width={200} height={50} />
        )}
      </div>
      <div style={{ padding: 10 }}>
        <Typography sx={{ mb: 5 }}>
          Request a quote from a local pro. A. O. Smith water heaters are
          professionally installed by local independent contractors.
        </Typography>

        <Typography>Search by zip, code or city, state</Typography>
        <FormControl fullWidth sx={{ mt: 1, mb: 2 }}>
          <OutlinedInput
            id="outlined-adornment-amount"
            size="small"
            // value={values.amount}
            // onChange={handleChange('amount')}
            startAdornment={
              <InputAdornment position="start">
                <LocationOnIcon />
              </InputAdornment>
            }
            // label="Amount"
          />
        </FormControl>
        <FormItemDropdown
          label="Search radius:"
          value="Auto"
          options={["Auto"]}
        />

        <div style={{ padding: "30px 0px" }}>
          <CustomButton label="Search" fullWidth={true} />
        </div>

        {contractors.map((contractor, index) => {
          return (
            <div key={index} style={{ padding: 5 }}>
              <Typography fontWeight={600}>{index + 1}. {contractor.name}</Typography>
              <Typography sx={{ mb: 2 }}>{contractor.location}</Typography>
              <CustomButton label="More Info" />
              <Divider sx={{ mt: 2 }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FindContractor;
