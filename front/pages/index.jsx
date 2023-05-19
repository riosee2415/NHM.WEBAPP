import React, { useCallback } from "react";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import ClientLayout from "../components/ClientLayout";
import axios from "axios";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import {
  Image,
  RsWrapper,
  Text,
  Title,
  WholeWrapper,
  Wrapper,
} from "../components/commonComponents";
import useWidth from "../hooks/useWidth";
import Theme from "../components/Theme";
import styled from "styled-components";
import Head from "next/head";
import Popup from "../components/popup/popup";
import UpdateSlider from "../components/slide/UpdateSlider";
import Link from "next/dist/client/link";
import { useSelector } from "react-redux";
import { ROOM_TYPE_LIST_REQUEST } from "../reducers/room";
import { Empty } from "antd";
import { useRouter } from "next/router";
import { NOTICE_LIST_REQUEST } from "../reducers/notice";

const SquareBox = styled(Wrapper)`
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  margin: 0 0 14px;

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

    ${Text} {
      color: ${Theme.basicTheme_C};
    }
  }

  @media (max-width: 900px) {
    width: calc(100% / 2 - 5px);
    margin: 0 10px 44px 0;

    &:nth-child(4n) {
      margin: 0 0 44px;
    }

    &:nth-child(2n) {
      margin: 0 0 44px;
    }
  }
`;

const Home = ({}) => {
  ////// GLOBAL STATE //////
  const { roomTypeList } = useSelector((state) => state.room);
  const { notices } = useSelector((state) => state.notice);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////
  const moveHandler = useCallback((target) => {
    router.push(`/rooms?type=${target}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>KOREAIS</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <Wrapper padding={width < 900 ? `0 20px` : `0`}>
            <Wrapper
              bgImg={
                width < 900
                  ? `url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/main/main-ban_m.png")`
                  : `url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/main/main-ban.png")`
              }
              height={width < 900 ? `400px` : `550px`}
              margin={width < 900 ? `0 0 60px` : `0 0 100px`}
              radius={width < 900 ? `20px` : `0`}
            >
              <Wrapper
                bgColor={Theme.basicTheme_C}
                width={`auto`}
                padding={`5px 20px`}
                radius={`20px`}
                color={Theme.white_C}
                margin={`0 0 5px`}
                fontSize={`14px`}
              >
                HOUSINGICOMMUNITY
              </Wrapper>

              <Text
                fontSize={width < 900 ? `40px` : `56px`}
                color={Theme.white_C}
                fontWeight={`700`}
                margin={`0 0 5px`}
              >
                Korea is
              </Text>

              <Text
                color={Theme.white_C}
                fontSize={width < 1100 ? `18px` : `22px`}
              >
                Life Landing Solution
              </Text>
              <Text
                color={Theme.white_C}
                fontSize={width < 1100 ? `18px` : `22px`}
              >
                For International 2030 in Korea
              </Text>
            </Wrapper>
          </Wrapper>

          <RsWrapper>
            <Text fontSize={`20px`} color={Theme.darkGrey_C}>
              KOREAIS
            </Text>
            <Text
              fontSize={width < 900 ? `30px` : `36px`}
              fontWeight={`700`}
              margin={`0 0 60pxs`}
            >
              We care for you
            </Text>

            <Wrapper dr={`row`} margin={width < 900 ? `0 0 80px` : `0 0 120px`}>
              <Wrapper
                width={`auto`}
                margin={width < 900 ? `0 0 80px` : `0 80px 0 0`}
              >
                <Image
                  src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/main/img_care1.png"
                  alt="image"
                  height={width < 900 ? `165px` : `187px`}
                  width={`auto`}
                  margin={`0 0 34px`}
                />

                <Text
                  fontSize={width < 900 ? `24px` : `28px`}
                  fontWeight={`700`}
                  color={Theme.darkGrey2_C}
                  margin={`0 0 16px`}
                >
                  We care where you live
                </Text>

                <Text fontSize={width < 900 ? `15px` : `18px`}>
                  We focus on matching the best house for you.
                </Text>
                <Text fontSize={width < 900 ? `15px` : `18px`}>
                  We can provide you the various range of
                </Text>
                <Text
                  fontSize={width < 900 ? `15px` : `18px`}
                  margin={`0 0 20px`}
                >
                  budget, contract period, and other options.
                </Text>

                <Link href={`/rooms`}>
                  <a>
                    <Text
                      fontSize={width < 900 ? `16px` : `18px`}
                      color={Theme.basicTheme_C}
                      borderBottom={`1px solid ${Theme.basicTheme_C}`}
                      fontWeight={`600`}
                      isHover={true}
                      hoverColor={Theme.black_C}
                      lineHeight={`1.1`}
                    >
                      Check Noew
                    </Text>
                  </a>
                </Link>
              </Wrapper>
              <Wrapper width={width < 900 ? `100%` : `auto`}>
                <Image
                  src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/main/img_care2.png"
                  alt="image"
                  height={width < 900 ? `165px` : `187px`}
                  width={`auto`}
                  margin={`0 0 34px`}
                />

                <Text
                  fontSize={width < 900 ? `24px` : `28px`}
                  fontWeight={`700`}
                  color={Theme.darkGrey2_C}
                  margin={`0 0 16px`}
                >
                  We care how you live
                </Text>

                <Text fontSize={width < 900 ? `15px` : `18px`}>
                  We care how you spend your time in Korea.
                </Text>
                <Text fontSize={width < 900 ? `15px` : `18px`}>
                  We provide interesting meet-up with
                </Text>
                <Text
                  fontSize={width < 900 ? `15px` : `18px`}
                  margin={`0 0 20px`}
                >
                  other international friends and local people.
                </Text>

                <Link href={`/update`}>
                  <a>
                    <Text
                      fontSize={width < 900 ? `16px` : `18px`}
                      color={Theme.basicTheme_C}
                      borderBottom={`1px solid ${Theme.basicTheme_C}`}
                      fontWeight={`600`}
                      isHover={true}
                      hoverColor={Theme.black_C}
                      lineHeight={`1.1`}
                    >
                      Check Noew
                    </Text>
                  </a>
                </Link>
              </Wrapper>
            </Wrapper>

            <Wrapper
              al={`flex-start`}
              margin={width < 900 ? `0 0 80px` : `0 0 120px`}
            >
              <Title margin={`0 0 25px`}>Rooms</Title>

              <Wrapper dr={`row`}>
                {roomTypeList && roomTypeList.length === 0 ? (
                  <Wrapper padding={`30px 0`}>
                    <Empty />
                  </Wrapper>
                ) : (
                  roomTypeList.map((data) => {
                    return (
                      <RommsBox
                        key={data.id}
                        onClick={() => moveHandler(data.id)}
                      >
                        <SquareBox>
                          <Image
                            className="thumbnail"
                            position={`absolute`}
                            top={`0`}
                            left={`0`}
                            src={data.thumbnail}
                            alt="thumbnail"
                            width={`100%`}
                          />
                        </SquareBox>
                        <Wrapper
                          dr={`row`}
                          ju={width < 900 ? `center` : `flex-start`}
                        >
                          <Text
                            fontSize={
                              width < 1100
                                ? width < 900
                                  ? `16px`
                                  : `18px`
                                : `22px`
                            }
                            fontWeight={`600`}
                            margin={`0 5px 0 0`}
                            color={Theme.darkGrey2_C}
                          >
                            {data.title}
                          </Text>

                          <Wrapper
                            dr={`row`}
                            width={width < 900 ? `100%` : `auto`}
                          >
                            <Text
                              display={width < 900 ? `flex` : `none`}
                              fontSize={`14px`}
                              color={Theme.basicTheme_C}
                              margin={`0 5px 0 0`}
                              fontWeight={`600`}
                            >
                              Check Now
                            </Text>
                            <Image
                              src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/main/icon_arrow.png"
                              alt="icon"
                              width={
                                width < 1100
                                  ? width < 900
                                    ? `14px`
                                    : `16px`
                                  : `20px`
                              }
                            />
                          </Wrapper>
                        </Wrapper>
                      </RommsBox>
                    );
                  })
                )}
              </Wrapper>
            </Wrapper>

            <Wrapper margin={width < 900 ? `0 0 80px` : `0 0 120px`}>
              <Title margin={`0 0 50px`}>Update</Title>

              <UpdateSlider datum={notices} />
            </Wrapper>
          </RsWrapper>
          <Popup />
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

    context.store.dispatch({
      type: ROOM_TYPE_LIST_REQUEST,
    });

    context.store.dispatch({
      type: NOTICE_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);
export default Home;
