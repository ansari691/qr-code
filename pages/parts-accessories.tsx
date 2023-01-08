import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useRouter } from "next/dist/client/router";

function PartsAndAccessories() {
  const router = useRouter();
  return (
    <>
      {typeof window === "object" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            padding: "0px 50px",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Brand</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={localStorage.getItem("brandName")}
              label="Brand"
              onChange={(e: any) => {
                localStorage.setItem("brandName", e.target.value);
                router.push("/");
                setTimeout(() => {
                  router.reload();
                }, 500);
              }}
            >
              <MenuItem value={"AO SMITH"}>AO SMITH</MenuItem>
              <MenuItem value={"American Water Heaters"}>
                American Water Heaters
              </MenuItem>
              <MenuItem value={"Lochinvar"}>Lochinvar</MenuItem>
            </Select>
          </FormControl>
        </div>
      )}
    </>
  );
}

export default PartsAndAccessories;
