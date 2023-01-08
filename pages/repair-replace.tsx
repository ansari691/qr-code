import Image from "next/image";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { AppContext } from "./_app";
import { useContext } from "react";

const RepairReplace = () => {
  const { brand } = useContext(AppContext);
  const router = useRouter();

  return (
    <div>
      <div style={{ padding: 20, textAlign: "center", marginTop: 20 }}>
        {brand?.logo && (
          <Image src={brand?.logo as string} width={200} height={50} />
        )}
      </div>
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <Typography variant="h5" fontWeight={1000}>
          Repair or Replace?
        </Typography>
      </div>

      <img
        src="/stock photo - woman at computer - iStock-516186728.jpg"
        width="100%"
        height="100%"
      />

      <div style={{ padding: 30, textAlign: "left" }}>
        <Typography>
          Because of your water heater’s age, you may want to replace it rather
          than repair it. Generally, a new water heater will come with a six
          year (or longer) parts and tank warranty and in-home service coverage.
          A new water heater will be more efficient than your old one and will
          cost less to operate. A new water heater will also give you one more
          thing: peace of mind.
        </Typography>
        <br />

        <Typography>
          But before making that decision, talk to a service technician and
          determine how much the repair will cost. If the cost is low and the
          water heater is not too old, a repair may be in order. But if the cost
          is high or the water heater is old, replacing it with a new one may be
          your best option.
        </Typography>
        <br />
        <Typography>
          Here’s a list of service companies in your area who are part of our
          nationwide service network. They can help you determine what your
          repair/replace options are.
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

export default RepairReplace;
