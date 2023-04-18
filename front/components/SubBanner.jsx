import React from "react";
import useWidth from "../hooks/useWidth";
import { Text, WholeWrapper, Wrapper } from "./commonComponents";
import Theme from "./Theme";

const SubBanner = ({ bgImg, title }) => {
  const width = useWidth();
  return (
    <WholeWrapper
      margin={width < 900 ? `0 0 30px` : `0 0 100px`}
      padding={width < 900 ? `0 20px` : `0`}
    >
      <Wrapper
        bgImg={bgImg}
        height={width < 900 ? `200px` : `400px`}
        radius={`10px`}
      >
        <Text
          fontSize={width < 900 ? `26px` : `56px`}
          fontWeight={`700`}
          color={Theme.white_C}
        >
          {title}
        </Text>
      </Wrapper>
    </WholeWrapper>
  );
};

export default SubBanner;
