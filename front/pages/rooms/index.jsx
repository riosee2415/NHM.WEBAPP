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

const IndexBox = styled(Wrapper)`
  width: auto;
  padding: 5px 10px;
  background: ${Theme.lightGrey_C};
  border-radius: 5px;
  color: ${Theme.darkGrey_C};
  margin: 0 0 10px;
  z-index: 2;

  &:hover {
    background: ${Theme.lightGrey2_C};
  }
`;

const TitleBox = styled(Wrapper)`
  flex-direction: row;
  justify-content: flex-start;
  width: auto;
  position: relative;
  cursor: pointer;
  margin: 0 0 40px;

  @media (max-width: 900px) {
    color: ${Theme.white_C};
    margin: 0;
  }

  /* &:hover {
    color: ${Theme.basicTheme_C};
  } */
`;

const SquareBox = styled(Wrapper)`
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  margin: 0 0 20px;

  &:before {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const RommsBox = styled(Wrapper)`
  width: calc(100% / 4 - 15px);
  margin: 0 20px 40px 0;
  cursor: pointer;
  position: relative;

  &:nth-child(4n) {
    margin: 0 0 40px;
  }

  ${Image} {
    transition: 0.5s;
  }

  &:hover {
    .thumbnail {
      transform: scale(1.1);
    }

    & .title {
      color: ${Theme.basicTheme_C};
    }
  }

  @media (max-width: 900px) {
    width: 100%;
    margin: 0 0 24px;

    &:nth-child(4n) {
      margin: 0 0 24px;
    }
  }
`;

const Index = ({}) => {
  ////// GLOBAL STATE //////

  ////// HOOKS //////
  const width = useWidth();

  const [isArrow, setIsArrow] = useState(false); // 타이틀
  const [isIndex, setIsIndex] = useState(false); // index Modal
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>ALAL</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          {width < 900 ? (
            <>
              <RsWrapper margin={`0 0 30px`}>
                <Wrapper
                  bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms/img_GU_m.png")`}
                  height={`200px`}
                  radius={`10px`}
                >
                  <TitleBox dr={`row`} ju={`flex-start`}>
                    <Text
                      fontSize={`26px`}
                      fontWeight={`700`}
                      isHover={true}
                      onClick={() => setIsArrow(!isArrow)}
                    >
                      Dongdaemun-gu
                    </Text>

                    <Image
                      onClick={() => setIsArrow(!isArrow)}
                      src={
                        isArrow
                          ? "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms/icon_more_m_a.png"
                          : "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms/icon_more_m.png"
                      }
                      width={`20px`}
                      alt="icon"
                      margin={`0 0 0 10px`}
                    />

                    {isArrow && (
                      <Wrapper
                        padding={`35px`}
                        bgColor={Theme.white_C}
                        width={`auto`}
                        radius={`10px`}
                        shadow={`0px 0px 10px rgba(0,0,0,0.1)`}
                        position={`absolute`}
                        left={`0`}
                        top={`50px`}
                        zIndex={`3`}
                      >
                        <Text
                          fontSize={`20px`}
                          isHover={true}
                          color={Theme.darkGrey_C}
                          margin={`0 0 14px`}
                        >
                          Dongdaemun-gu
                        </Text>
                        <Text
                          fontSize={`20px`}
                          isHover={true}
                          color={Theme.darkGrey_C}
                          margin={`0 0 14px`}
                        >
                          Dongdaemun-gu
                        </Text>
                        <Text
                          fontSize={`20px`}
                          isHover={true}
                          color={Theme.darkGrey_C}
                          margin={`0 0 14px`}
                        >
                          Dongdaemun-gu
                        </Text>
                        <Text
                          fontSize={`20px`}
                          isHover={true}
                          color={Theme.darkGrey_C}
                          margin={`0 0 14px`}
                        >
                          Dongdaemun-gu
                        </Text>
                        <Text
                          fontSize={`20px`}
                          isHover={true}
                          color={Theme.darkGrey_C}
                          margin={`0 0 14px`}
                        >
                          Dongdaemun-gu
                        </Text>
                      </Wrapper>
                    )}
                  </TitleBox>
                </Wrapper>
              </RsWrapper>
            </>
          ) : (
            <>
              <SubBanner
                bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/sub-banner/rooms.png")`}
                title="Rooms"
              />
              <RsWrapper>
                <Wrapper al={`flex-start`}>
                  <TitleBox dr={`row`} ju={`flex-start`}>
                    <Text
                      fontSize={`56px`}
                      fontWeight={`700`}
                      isHover={true}
                      onClick={() => setIsArrow(!isArrow)}
                    >
                      Dongdaemun-gu
                    </Text>

                    <Image
                      onClick={() => setIsArrow(!isArrow)}
                      src={
                        isArrow
                          ? "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms/icon_more_a.png"
                          : "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms/icon_more.png"
                      }
                      width={`25px`}
                      alt="icon"
                      margin={`0 0 0 10px`}
                    />

                    {isArrow && (
                      <Wrapper
                        padding={`35px`}
                        bgColor={Theme.white_C}
                        width={`auto`}
                        radius={`10px`}
                        shadow={`0px 0px 10px rgba(0,0,0,0.1)`}
                        position={`absolute`}
                        left={`0`}
                        top={`88px`}
                        zIndex={`2`}
                      >
                        <Text
                          fontSize={`20px`}
                          isHover={true}
                          color={Theme.darkGrey_C}
                          margin={`0 0 14px`}
                        >
                          Dongdaemun-gu
                        </Text>
                        <Text
                          fontSize={`20px`}
                          isHover={true}
                          color={Theme.darkGrey_C}
                          margin={`0 0 14px`}
                        >
                          Dongdaemun-gu
                        </Text>
                        <Text
                          fontSize={`20px`}
                          isHover={true}
                          color={Theme.darkGrey_C}
                          margin={`0 0 14px`}
                        >
                          Dongdaemun-gu
                        </Text>
                        <Text
                          fontSize={`20px`}
                          isHover={true}
                          color={Theme.darkGrey_C}
                          margin={`0 0 14px`}
                        >
                          Dongdaemun-gu
                        </Text>
                        <Text
                          fontSize={`20px`}
                          isHover={true}
                          color={Theme.darkGrey_C}
                          margin={`0 0 14px`}
                        >
                          Dongdaemun-gu
                        </Text>
                      </Wrapper>
                    )}
                  </TitleBox>

                  <Image
                    src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms/img_GU.png"
                    alt="banner"
                    height={`320px`}
                    margin={`0 0 50px`}
                    radius={`10px`}
                  />
                </Wrapper>
              </RsWrapper>
            </>
          )}

          <RsWrapper>
            <Wrapper dr={`row`} ju={`flex-start`}>
              <RommsBox>
                <SquareBox>
                  <Wrapper
                    position={`absolute`}
                    top={`20px`}
                    left={`20px`}
                    bgColor={`rgba(0,0,0,0.4)`}
                    color={Theme.white_C}
                    fontSize={`16px`}
                    radius={`5px`}
                    zIndex={`2`}
                    width={`auto`}
                    padding={`3px 10px`}
                  >
                    NO.123456
                  </Wrapper>
                  <Image
                    className="thumbnail"
                    position={`absolute`}
                    top={`0`}
                    left={`0`}
                    src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/main/img_rooms_gangbukgu.png"
                    alt="thumbnail"
                    width={`100%`}
                  />
                </SquareBox>
                <Wrapper al={`flex-start`}>
                  <IndexBox onClick={() => setIsIndex(true)}>
                    <Text fontSize={`15px`}>
                      KI index&nbsp;
                      <SpanText color={Theme.basicTheme_C}>5.0</SpanText>
                    </Text>
                  </IndexBox>
                  {isIndex && (
                    <Wrapper
                      position={`absolute`}
                      bottom={`-210px`}
                      left={`0`}
                      padding={width < 900 ? `40px 15px` : `40px`}
                      bgColor={Theme.white_C}
                      shadow={`0px 0px 10px rgba(0,0,0,0.1)`}
                      zIndex={`10`}
                      radius={`5px`}
                      width={width < 900 ? `90%` : `404px`}
                    >
                      <Wrapper
                        al={`flex-end`}
                        margin={width < 900 ? `0` : `0 -20px 0 0`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms/icon_close.png"
                          alt="icon"
                          onClick={() => setIsIndex(false)}
                          width={`14px`}
                        />
                      </Wrapper>

                      <Wrapper fontSize={`16px`} color={Theme.black_C}>
                        <Text>The Koreais develop KI index.</Text>
                        <Text>KI index is a foreigner-friendly score</Text>
                        <Text>considering the infrastructure and</Text>
                        <Text>characteristics of the area where the</Text>
                        <Text>property are located, and the higher the</Text>
                        <Text>score, the better the neighborhood for</Text>
                        <Text>foreigners to live in</Text>
                      </Wrapper>
                    </Wrapper>
                  )}

                  <Text fontSize={`20px`} fontWeight={`600`} margin={`0 0 5px`}>
                    Month 1.3m/20m
                  </Text>
                  <Text fontSize={`16px`} color={Theme.darkGrey_C}>
                    Dondaemun Station One room
                  </Text>
                </Wrapper>
              </RommsBox>

              <RommsBox>
                <SquareBox>
                  <Wrapper
                    position={`absolute`}
                    top={`20px`}
                    left={`20px`}
                    bgColor={`rgba(0,0,0,0.4)`}
                    color={Theme.white_C}
                    fontSize={`16px`}
                    radius={`5px`}
                    zIndex={`2`}
                    width={`auto`}
                    padding={`3px 10px`}
                  >
                    NO.123456
                  </Wrapper>
                  <Image
                    className="thumbnail"
                    position={`absolute`}
                    top={`0`}
                    left={`0`}
                    src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/main/img_rooms_gangbukgu.png"
                    alt="thumbnail"
                    width={`100%`}
                  />
                </SquareBox>
                <Wrapper al={`flex-start`}>
                  <IndexBox onClick={() => setIsIndex(true)}>
                    <Text fontSize={`15px`}>
                      KI index&nbsp;
                      <SpanText color={Theme.basicTheme_C}>5.0</SpanText>
                    </Text>
                  </IndexBox>
                  {isIndex && (
                    <Wrapper
                      position={`absolute`}
                      bottom={`-210px`}
                      left={`0`}
                      padding={`40px`}
                      bgColor={Theme.white_C}
                      shadow={`0px 0px 10px rgba(0,0,0,0.1)`}
                      zIndex={`10`}
                      radius={`5px`}
                      width={`404px`}
                    >
                      <Wrapper al={`flex-end`} margin={`0 -20px 0 0`}>
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms/icon_close.png"
                          alt="icon"
                          onClick={() => setIsIndex(false)}
                          width={`14px`}
                        />
                      </Wrapper>

                      <Wrapper fontSize={`16px`} color={Theme.black_C}>
                        <Text>The Koreais develop KI index.</Text>
                        <Text>KI index is a foreigner-friendly score</Text>
                        <Text>considering the infrastructure and</Text>
                        <Text>characteristics of the area where the</Text>
                        <Text>property are located, and the higher the</Text>
                        <Text>score, the better the neighborhood for</Text>
                        <Text>foreigners to live in</Text>
                      </Wrapper>
                    </Wrapper>
                  )}

                  <Text fontSize={`20px`} fontWeight={`600`} margin={`0 0 5px`}>
                    Month 1.3m/20m
                  </Text>
                  <Text fontSize={`16px`} color={Theme.darkGrey_C}>
                    Dondaemun Station One room
                  </Text>
                </Wrapper>
              </RommsBox>

              <RommsBox>
                <SquareBox>
                  <Wrapper
                    position={`absolute`}
                    top={`20px`}
                    left={`20px`}
                    bgColor={`rgba(0,0,0,0.4)`}
                    color={Theme.white_C}
                    fontSize={`16px`}
                    radius={`5px`}
                    zIndex={`2`}
                    width={`auto`}
                    padding={`3px 10px`}
                  >
                    NO.123456
                  </Wrapper>
                  <Image
                    className="thumbnail"
                    position={`absolute`}
                    top={`0`}
                    left={`0`}
                    src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/main/img_rooms_gangbukgu.png"
                    alt="thumbnail"
                    width={`100%`}
                  />
                </SquareBox>
                <Wrapper al={`flex-start`}>
                  <IndexBox onClick={() => setIsIndex(true)}>
                    <Text fontSize={`15px`}>
                      KI index&nbsp;
                      <SpanText color={Theme.basicTheme_C}>5.0</SpanText>
                    </Text>
                  </IndexBox>
                  {isIndex && (
                    <Wrapper
                      position={`absolute`}
                      bottom={`-210px`}
                      left={`0`}
                      padding={`40px`}
                      bgColor={Theme.white_C}
                      shadow={`0px 0px 10px rgba(0,0,0,0.1)`}
                      zIndex={`10`}
                      radius={`5px`}
                      width={`404px`}
                    >
                      <Wrapper al={`flex-end`} margin={`0 -20px 0 0`}>
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms/icon_close.png"
                          alt="icon"
                          onClick={() => setIsIndex(false)}
                          width={`14px`}
                        />
                      </Wrapper>

                      <Wrapper fontSize={`16px`} color={Theme.black_C}>
                        <Text>The Koreais develop KI index.</Text>
                        <Text>KI index is a foreigner-friendly score</Text>
                        <Text>considering the infrastructure and</Text>
                        <Text>characteristics of the area where the</Text>
                        <Text>property are located, and the higher the</Text>
                        <Text>score, the better the neighborhood for</Text>
                        <Text>foreigners to live in</Text>
                      </Wrapper>
                    </Wrapper>
                  )}

                  <Text fontSize={`20px`} fontWeight={`600`} margin={`0 0 5px`}>
                    Month 1.3m/20m
                  </Text>
                  <Text fontSize={`16px`} color={Theme.darkGrey_C}>
                    Dondaemun Station One room
                  </Text>
                </Wrapper>
              </RommsBox>

              <RommsBox>
                <SquareBox>
                  <Wrapper
                    position={`absolute`}
                    top={`20px`}
                    left={`20px`}
                    bgColor={`rgba(0,0,0,0.4)`}
                    color={Theme.white_C}
                    fontSize={`16px`}
                    radius={`5px`}
                    zIndex={`2`}
                    width={`auto`}
                    padding={`3px 10px`}
                  >
                    NO.123456
                  </Wrapper>
                  <Image
                    className="thumbnail"
                    position={`absolute`}
                    top={`0`}
                    left={`0`}
                    src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/main/img_rooms_gangbukgu.png"
                    alt="thumbnail"
                    width={`100%`}
                  />
                </SquareBox>
                <Wrapper al={`flex-start`}>
                  <IndexBox onClick={() => setIsIndex(true)}>
                    <Text fontSize={`15px`}>
                      KI index&nbsp;
                      <SpanText color={Theme.basicTheme_C}>5.0</SpanText>
                    </Text>
                  </IndexBox>
                  {isIndex && (
                    <Wrapper
                      position={`absolute`}
                      bottom={`-210px`}
                      left={`0`}
                      padding={`40px`}
                      bgColor={Theme.white_C}
                      shadow={`0px 0px 10px rgba(0,0,0,0.1)`}
                      zIndex={`10`}
                      radius={`5px`}
                      width={`404px`}
                    >
                      <Wrapper al={`flex-end`} margin={`0 -20px 0 0`}>
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms/icon_close.png"
                          alt="icon"
                          onClick={() => setIsIndex(false)}
                          width={`14px`}
                        />
                      </Wrapper>

                      <Wrapper fontSize={`16px`} color={Theme.black_C}>
                        <Text>The Koreais develop KI index.</Text>
                        <Text>KI index is a foreigner-friendly score</Text>
                        <Text>considering the infrastructure and</Text>
                        <Text>characteristics of the area where the</Text>
                        <Text>property are located, and the higher the</Text>
                        <Text>score, the better the neighborhood for</Text>
                        <Text>foreigners to live in</Text>
                      </Wrapper>
                    </Wrapper>
                  )}

                  <Text fontSize={`20px`} fontWeight={`600`} margin={`0 0 5px`}>
                    Month 1.3m/20m
                  </Text>
                  <Text fontSize={`16px`} color={Theme.darkGrey_C}>
                    Dondaemun Station One room
                  </Text>
                </Wrapper>
              </RommsBox>

              <RommsBox>
                <SquareBox>
                  <Wrapper
                    position={`absolute`}
                    top={`20px`}
                    left={`20px`}
                    bgColor={`rgba(0,0,0,0.4)`}
                    color={Theme.white_C}
                    fontSize={`16px`}
                    radius={`5px`}
                    zIndex={`2`}
                    width={`auto`}
                    padding={`3px 10px`}
                  >
                    NO.123456
                  </Wrapper>
                  <Image
                    className="thumbnail"
                    position={`absolute`}
                    top={`0`}
                    left={`0`}
                    src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/main/img_rooms_gangbukgu.png"
                    alt="thumbnail"
                    width={`100%`}
                  />
                </SquareBox>
                <Wrapper al={`flex-start`}>
                  <IndexBox onClick={() => setIsIndex(true)}>
                    <Text fontSize={`15px`}>
                      KI index&nbsp;
                      <SpanText color={Theme.basicTheme_C}>5.0</SpanText>
                    </Text>
                  </IndexBox>
                  {isIndex && (
                    <Wrapper
                      position={`absolute`}
                      bottom={`-210px`}
                      left={`0`}
                      padding={`40px`}
                      bgColor={Theme.white_C}
                      shadow={`0px 0px 10px rgba(0,0,0,0.1)`}
                      zIndex={`10`}
                      radius={`5px`}
                      width={`404px`}
                    >
                      <Wrapper al={`flex-end`} margin={`0 -20px 0 0`}>
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms/icon_close.png"
                          alt="icon"
                          onClick={() => setIsIndex(false)}
                          width={`14px`}
                        />
                      </Wrapper>

                      <Wrapper fontSize={`16px`} color={Theme.black_C}>
                        <Text>The Koreais develop KI index.</Text>
                        <Text>KI index is a foreigner-friendly score</Text>
                        <Text>considering the infrastructure and</Text>
                        <Text>characteristics of the area where the</Text>
                        <Text>property are located, and the higher the</Text>
                        <Text>score, the better the neighborhood for</Text>
                        <Text>foreigners to live in</Text>
                      </Wrapper>
                    </Wrapper>
                  )}

                  <Text fontSize={`20px`} fontWeight={`600`} margin={`0 0 5px`}>
                    Month 1.3m/20m
                  </Text>
                  <Text fontSize={`16px`} color={Theme.darkGrey_C}>
                    Dondaemun Station One room
                  </Text>
                </Wrapper>
              </RommsBox>
            </Wrapper>

            <CustomPage />
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
export default Index;
