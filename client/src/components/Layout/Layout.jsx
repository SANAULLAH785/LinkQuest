import React from "react";
import { Container } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ display: "flex", justifyContent: "center" }}
        disableGutters
      >
        {children}
      </Container>
    </>
  );
};

export default Layout;
