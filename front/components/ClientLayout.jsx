import React from "react";
import PropTypes from "prop-types";
import { withResizeDetector } from "react-resize-detector";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { WholeWrapper } from "./commonComponents";

const ClientLayout = ({ children, width }) => {
  return (
    <section>
      {/* HEADER */}
      <AppHeader />

      {/* content */}
      <WholeWrapper margin={width < 900 ? `147px 0 0` : `0`}>
        {children}
      </WholeWrapper>

      {/* Footer */}

      <AppFooter />
    </section>
  );
};

ClientLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withResizeDetector(ClientLayout);
