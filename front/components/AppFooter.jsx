import React, { useEffect } from "react";
import {
  Wrapper,
  Text,
  Image,
  WholeWrapper,
  RsWrapper,
  SpanText,
} from "./commonComponents";
import Theme from "./Theme";
import useWidth from "../hooks/useWidth";
import { useDispatch, useSelector } from "react-redux";
import { COMPANY_GET_REQUEST } from "../reducers/company";
import { LOGO_GET_REQUEST } from "../reducers/logo";
import { message } from "antd";

const AppFooter = () => {
  const width = useWidth();
  const dispatch = useDispatch();

  const { logos } = useSelector((state) => state.logo);
  const {
    companys,
    //
    st_companyError,
  } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch({
      type: COMPANY_GET_REQUEST,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: LOGO_GET_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (st_companyError) {
      return message.error(st_companyError);
    }
  }, [st_companyError]);

  return (
    <WholeWrapper
      bgColor={Theme.lightGrey_C}
      padding={width < 700 ? `60px 0 30px` : `55px 0`}
    >
      <RsWrapper al={`flex-start`}>
        <Wrapper
          dr={`row`}
          width={`auto`}
          display={width < 700 ? `flex` : `none`}
          margin={`0 0 30px`}
        >
          <Text
            fontSize={`16px`}
            isHover={true}
            color={Theme.darkGrey2_C}
            margin={`0 40px 0 0`}
          >
            Terms of User
          </Text>
          <Text fontSize={`16px`} isHover={true} color={Theme.darkGrey2_C}>
            privacy policy
          </Text>
        </Wrapper>

        <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 24px`}>
          {logos &&
            logos.length !== 0 &&
            logos.find((data) => data.typeOf === "F") && (
              <Image
                width={`56px`}
                src={logos.find((data) => data.typeOf === "F").imageURL}
                alt="logo"
              />
            )}

          <Wrapper
            dr={`row`}
            width={`auto`}
            display={width < 700 ? `none` : `flex`}
          >
            <Text
              isHover={true}
              color={Theme.darkGrey2_C}
              margin={`0 40px 0 0`}
            >
              Terms of User
            </Text>
            <Text isHover={true} color={Theme.darkGrey2_C}>
              privacy policy
            </Text>
          </Wrapper>
        </Wrapper>

        <Wrapper al={`flex-start`}>
          <Text
            fontSize={`18px`}
            margin={width < 700 ? `0 0 10px` : `0 0 5px`}
            fontWeight={`600`}
          >
            NHM Consulting Coporation
          </Text>

          {companys && companys[0] && (
            <Wrapper dr={`row`} width={`auto`}>
              <Text
                lineHeight={width < 900 && `2`}
                fontSize={width < 700 ? `13px` : `14px`}
                width={`65px`}
                display={width < 700 ? `none` : `flex`}
              >
                {companys[0].name}
              </Text>
              <Text
                fontSize={width < 700 ? `13px` : `14px`}
                color={Theme.darkGrey_C}
              >
                {companys[0].value}
              </Text>
            </Wrapper>
          )}

          {companys && companys[1] && (
            <Wrapper
              dr={`row`}
              width={`auto`}
              margin={width < 700 ? `3px 0` : `5px 0`}
            >
              <Text
                lineHeight={width < 900 && `2`}
                fontSize={width < 700 ? `13px` : `14px`}
                width={`65px`}
                display={width < 700 ? `none` : `flex`}
              >
                {companys[1].name}
              </Text>
              <Text
                fontSize={width < 700 ? `13px` : `14px`}
                color={Theme.darkGrey_C}
              >
                {companys[1].value}
              </Text>
            </Wrapper>
          )}

          <Wrapper dr={`row`} ju={`space-between`}>
            {companys && companys[2] && (
              <Wrapper
                dr={`row`}
                width={width < 700 ? `100%` : `auto`}
                ju={`flex-start`}
              >
                <Text
                  lineHeight={width < 900 && `2`}
                  fontSize={width < 700 ? `13px` : `14px`}
                  width={`65px`}
                  display={width < 700 ? `none` : `flex`}
                >
                  {companys[2].name}
                </Text>
                <Text
                  fontSize={width < 700 ? `13px` : `14px`}
                  color={Theme.darkGrey_C}
                >
                  {companys[2].value}
                </Text>
              </Wrapper>
            )}

            <Text
              fontSize={width < 700 ? `13px` : `14px`}
              color={Theme.grey2_C}
              margin={width < 700 ? `30px 0 0` : `0`}
            >
              Copyright © 2023 Koreais. All Rights Reserved.
            </Text>
          </Wrapper>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default AppFooter;
