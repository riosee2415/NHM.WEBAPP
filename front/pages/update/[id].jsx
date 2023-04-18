import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import useInput from "../../hooks/useInput";
import ClientLayout from "../../components/ClientLayout";
import axios from "axios";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import {
  CommonButton,
  CustomPage,
  Image,
  RsWrapper,
  SpanText,
  Text,
  Title,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import styled from "styled-components";
import Head from "next/head";
import Popup from "../../components/popup/popup";
import UpdateSlider from "../../components/slide/UpdateSlider";
import SubBanner from "../../components/SubBanner";
import { Button, Dropdown, Menu, Popover, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const BackWrapper = styled(Wrapper)`
  flex-direction: row;
  justify-content: flex-start;
  cursor: pointer;
  color: ${Theme.darkGrey2_C};
  width: auto;

  &:hover {
    color: ${Theme.basicTheme_C};
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;
const Id = ({}) => {
  ////// GLOBAL STATE //////

  ////// HOOKS //////
  const width = useWidth();

  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>KOREAIS | UPDATE</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          {width > 900 && (
            <SubBanner
              bgImg={
                width < 900
                  ? `url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/sub-banner/update_m.png")`
                  : `url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/sub-banner/update.png")`
              }
              title="Update"
            />
          )}

          <RsWrapper>
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              padding={width < 900 ? `0 0 15px` : `0 0 20px`}
              borderBottom={`4px solid ${Theme.lightGrey_C}`}
              margin={width < 900 ? `0 0 25px` : `0 0 40px`}
            >
              <BackWrapper>
                <Image
                  src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms/icon_back.png"
                  alt="icon"
                  width={`8px`}
                />

                <Text
                  fontSize={`20px`}
                  fontWeight={`700`}
                  margin={`0 0 0 10px`}
                >
                  Notice and Update
                </Text>
              </BackWrapper>

              <Text display={width < 900 ? `none` : `flex`} fontSize={`16px`}>
                2023.03.24
              </Text>
            </Wrapper>

            <Wrapper
              al={`flex-start`}
              padding={width < 900 ? `0 0 50px` : `0 0 34px`}
              borderBottom={`4px solid ${Theme.lightGrey_C}`}
              margin={width < 900 ? `0 0 30px` : `0 0 40px`}
            >
              <Text
                fontSize={width < 900 ? `26px` : `34px`}
                fontWeight={`700`}
                margin={width < 900 ? `0 0 25px` : `0 0 34px`}
              >
                Lorem ipsum dolor sit amet, consetetur
              </Text>

              <Text
                fontSize={`18px`}
                color={Theme.darkGrey2_C}
                margin={width < 900 ? `0 0 30px` : `0 0 34px`}
              >
                292, Jayang-ro, Gwangjin-gu, Seoul 292, Jayang-ro, Gwangjin-gu,
                Seoul
              </Text>

              <Image
                src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms/img_detail.png"
                alt="image"
                width={`100%`}
              />
            </Wrapper>

            <Wrapper margin={`0 0 100px`}>
              <CommonButton
                kindOf={`grey`}
                fontSize={`16px`}
                radius={`20px`}
                padding={`6px 22px`}
                height={`auto`}
              >
                Go to privous
              </CommonButton>
            </Wrapper>
          </RsWrapper>
        </WholeWrapper>
      </ClientLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // SSR Cookie Settings For Data Load/////////////////////////////////////
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    ////////////////////////////////////////////////////////////////////////
    // 구현부

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);
export default Id;
