import Image from "next/image";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { AppContext } from "./_app";
import { useContext } from "react";

const Replace = () => {
  const router = useRouter();
  const { brand } = useContext(AppContext);
  return (
    <div>
      <div style={{ padding: 20, textAlign: "center", marginTop: 20 }}>
        {brand?.logo && (
          <Image src={brand?.logo as string} width={200} height={50} />
        )}
      </div>
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <Typography variant="h5" fontWeight={1000}>
          Replace Your Water Heater
        </Typography>
      </div>

      <img
        src="/stock photo - contractor - iStock-459118647.jpg"
        width="100%"
        height="100%"
      />

      <div style={{ padding: 30, textAlign: "left" }}>
        <Typography>
          Because the water heater tank is leaking, the water heater will have
          to be replaced. Because of the age of your water heater, it is no
          longer covered by warranty.
        </Typography>
        <br />

        <Typography>
          Generally, a new water heater will come with a six year (or longer)
          parts and tank warranty and in-home service coverage. A new water
          heater will be more efficient than your old one and will cost less to
          operate. A new water heater will also give you one more thing: peace
          of mind.
        </Typography>
        <br />
        <Typography>
          Here’s a list of service companies in your area who are part of our
          nationwide service network. They can help you determine what your
          replacement options are.
        </Typography>
        <br />

        <div>
          <Button
            onClick={() => router.push("find-contractor")}
            sx={{ width: "100%", marginTop: 2 }}
          >
            Find a Contractor
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Replace;
