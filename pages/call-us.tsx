import Image from "next/image";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AppContext } from "./_app";
import { useContext } from "react";

const CallUs = () => {
  const { brand } = useContext(AppContext);
  return (
    <div>
      <div style={{ padding: 20, textAlign: "center", marginTop: 20 }}>
        {brand?.logo && (
          <Image src={brand?.logo as string} width={200} height={50} />
        )}
      </div>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
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

      <div style={{ padding: 30 }}>
        <Typography fontWeight={600}>Hours of Operation</Typography>
        <Typography style={{ textAlign: "justify" }}>
          Our Technical Support Center is open Monday through Friday from 7am to
          7pm CST (except holidays).
        </Typography>
        <br />
        <Typography>Please call us during regular business hours.</Typography>

        <div
          style={{
            border: `1px solid ${brand?.secondaryColor}`,
            marginTop: 50,
          }}
        >
          <div style={{ padding: 10 }}>
            <Typography
              variant="h5"
              fontWeight={1000}
              style={{ marginBottom: 10 }}
            >
              Support Ticket Number
            </Typography>
            <Typography style={{ marginBottom: 10 }} fontWeight={600}>
              For the fastest service, have this support ticket number available
              when you call.
            </Typography>
          </div>
          <div
            style={{
              backgroundColor: brand?.secondaryColor,
              textAlign: "center",
            }}
          >
            <Typography variant="h5" fontWeight={1000}>
              08974440
            </Typography>
          </div>
        </div>

        <Button sx={{ width: "100%", mt: 7 }}>Call us: 1-800-555-BRAND</Button>
      </div>
    </div>
  );
};

export default CallUs;
