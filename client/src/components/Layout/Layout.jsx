import React from "react";
import { Container } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          // backgroundColor: "hsl(210, 3%, 15%)",
          backgroundColor: "wheat",
        }}
        disableGutters
      >
        {children}
      </Container>
    </>
  );
};

export default Layout;
