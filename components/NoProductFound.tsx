import { Button, Typography } from "@mui/material";

export const NoProductFound = () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 40,
        }}
      >
        <Typography sx={{ mb: 2 }}>
          No Product with that serail number found.
        </Typography>
        <Button variant="contained" sx={{ width: '100%' }}>
          <a href="tel:+1-800-527-1953">Contact Customer Support</a>
          {/* Register Your Water Heater */}
        </Button>
        <Typography></Typography>
      </div>
    );
  };