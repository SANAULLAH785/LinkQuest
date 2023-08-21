import React from "react";
import { Container } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ display: "flex", justifyContent: "center" }}
        padding={0}
      >
        {children}
      </Container>
    </>
  );
};

export default Layout;
