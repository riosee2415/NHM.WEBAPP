import React, { useState } from "react";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import ClientLayout from "../../components/ClientLayout";
import axios from "axios";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import {
  CommonButton,
  Image,
  RsWrapper,
  SpanText,
  Text,
  TextArea,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import styled from "styled-components";
import Head from "next/head";
import SubBanner from "../../components/SubBanner";
import { Modal } from "antd";
import RoomsSlider from "../../components/slide/RoomsSlider";
import { useDispatch, useSelector } from "react-redux";
import { ROOM_DETAIL_REQUEST } from "../../reducers/room";
import { useRouter } from "next/router";

const LocalWrapper = styled(Wrapper)`
  width: 110px;
  margin: 0 13px 40px 0;
`;

const RoundWrapper = styled(Wrapper)`
  width: 110px;
  margin: 0 13px 40px 0;

  @media (max-width: 900px) {
    width: 52px;
    margin: 0 6px 8px 0;
  }
`;

const Tab = styled(Wrapper)`
  width: auto;
  padding: 8px 22px;
  border-radius: 30px;
  border: 1px solid ${Theme.lightGrey2_C};
  color: ${Theme.darkGrey2_C};
  font-size: 18px;
  background: ${Theme.lightGrey2_C};
  cursor: pointer;

  &:hover {
    background: ${Theme.basicTheme_C};
    color: ${Theme.white_C};
  }

  ${(props) =>
    props.isActive &&
    `
    background: ${Theme.basicTheme_C};
    color: ${Theme.white_C};
  `}

  @media (max-width : 900px) {
    padding: 6px 20px;
    font-size: 16px;
  }
`;

const BackWrapper = styled(Wrapper)`
  flex-direction: row;
  justify-content: flex-start;
  cursor: pointer;
  color: ${Theme.darkGrey2_C};
  padding: 0 0 20px;
  border-bottom: 4px solid ${Theme.lightGrey_C};
  margin: 0 0 34px;

  &:hover {
    color: ${Theme.basicTheme_C};
  }

  @media (max-width: 900px) {
    margin: 0 0 25px;
    padding: 0 0 15px;
  }
`;

const IndexBox = styled(Wrapper)`
  width: auto;
  padding: 5px 10px;
  background: ${Theme.lightGrey_C};
  border-radius: 5px;
  color: ${Theme.darkGrey_C};
  margin: 0 0 10px;
  z-index: 2;
`;

const Id = ({}) => {
  ////// GLOBAL STATE //////
  const { roomDetail, bannerData, infraData, optionData, maintenanceData } =
    useSelector((state) => state.room);

  console.log(roomDetail, bannerData, infraData, optionData, maintenanceData);

  ////// HOOKS //////
  const width = useWidth();

  const [bookModal, setBookModal] = useState(false); // 모바일 Book Now
  const [monthData, setMonthData] = useState(0); // 0:6month , 1:1year, 2:2yaer

  ////// REDUX //////
  const router = useRouter();
  const dispatch = useDispatch();
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>KOREAIS | ROOMS</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          {width > 900 && (
            <SubBanner
              bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/sub-banner/rooms.png")`}
              title="Rooms"
            />
          )}

          <RsWrapper>
            <BackWrapper>
              <Image
                src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms/icon_back.png"
                alt="icon"
                width={`8px`}
              />

              <Text fontSize={`20px`} fontWeight={`700`} margin={`0 0 0 10px`}>
                {roomDetail && roomDetail.roomTypeTitle}
              </Text>
            </BackWrapper>

            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              margin={width < 900 ? `0 0 16px` : `0 0 28px`}
            >
              <Text fontSize={width < 900 ? `26px` : `34px`} fontWeight={`700`}>
                NO.{roomDetail && roomDetail.roomNum}
              </Text>
              <Image
                src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms/icon_share.png"
                alt="icon"
                width={width < 900 ? `19px` : `24px`}
                margin={`0 0 0 10px`}
              />
            </Wrapper>

            <Wrapper margin={width < 900 ? `0 0 20px` : `0 0 30px`}>
              <RoomsSlider datum={bannerData} />
            </Wrapper>

            <Wrapper
              al={`flex-start`}
              padding={`0 0 28px`}
              borderBottom={`4px solid ${Theme.lightGrey_C}`}
              margin={`0 0 40px`}
            >
              <IndexBox>
                <Text fontSize={`18px`}>
                  KI index&nbsp;
                  <SpanText color={Theme.basicTheme_C}>
                    {roomDetail && roomDetail.kiIndex}
                  </SpanText>
                </Text>
              </IndexBox>

              <Text
                fontSize={`24px`}
                fontWeight={`600`}
                margin={width < 900 ? `0` : `0 0 5px`}
              >
                {roomDetail && roomDetail.title}
              </Text>
              <Text fontSize={`18px`} color={Theme.darkGrey_C}>
                {roomDetail && roomDetail.subTitle}
              </Text>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`space-between`}
              margin={`0 0 100px`}
              al={`flex-start`}
            >
              <Wrapper width={width < 900 ? `100%` : `73%`} al={`flex-start`}>
                <Text
                  fontSize={width < 900 ? `20px` : `22px`}
                  fontWeight={`700`}
                  margin={`0 0 24px`}
                >
                  Contract Period
                </Text>

                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  padding={`0 0 20px`}
                  borderBottom={`2px solid ${Theme.basicTheme_C}`}
                >
                  <Tab
                    onClick={() => setMonthData(0)}
                    isActive={monthData === 0}
                  >
                    6Months
                  </Tab>
                  <Tab
                    onClick={() => setMonthData(1)}
                    isActive={monthData === 1}
                    margin={width < 900 ? `0 10px` : `0 16px`}
                  >
                    1year
                  </Tab>
                  <Tab
                    onClick={() => setMonthData(2)}
                    isActive={monthData === 2}
                  >
                    2year
                  </Tab>
                </Wrapper>

                <Wrapper
                  padding={`12px 14px`}
                  dr={`row`}
                  ju={`space-between`}
                  borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                >
                  <Text
                    fontSize={width < 900 ? `14px` : `16px`}
                    fontWeight={`600`}
                  >
                    Deposit
                  </Text>

                  <Text fontSize={`16px`}>
                    {monthData === 0
                      ? String(roomDetail && roomDetail.deposit1).replace(
                          /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                          ","
                        )
                      : monthData === 1
                      ? String(roomDetail && roomDetail.deposit2).replace(
                          /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                          ","
                        )
                      : String(roomDetail && roomDetail.deposit3).replace(
                          /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                          ","
                        )}
                  </Text>
                </Wrapper>

                <Wrapper
                  padding={`12px 14px`}
                  dr={`row`}
                  ju={`space-between`}
                  borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                >
                  <Text
                    fontSize={width < 900 ? `14px` : `16px`}
                    fontWeight={`600`}
                  >
                    Monthly Payment
                  </Text>

                  <Text fontSize={`16px`}>
                    {monthData === 0
                      ? String(roomDetail && roomDetail.rentFee1).replace(
                          /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                          ","
                        )
                      : monthData === 1
                      ? String(roomDetail && roomDetail.rentFee2).replace(
                          /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                          ","
                        )
                      : String(roomDetail && roomDetail.rentFee3).replace(
                          /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                          ","
                        )}
                  </Text>
                </Wrapper>

                <Wrapper
                  padding={`12px 14px`}
                  dr={`row`}
                  ju={`space-between`}
                  borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                  margin={`0 0 20px`}
                >
                  <Text
                    fontSize={width < 900 ? `14px` : `16px`}
                    fontWeight={`600`}
                  >
                    Management expense
                  </Text>

                  <Text fontSize={`16px`}>
                    {monthData === 0
                      ? String(roomDetail && roomDetail.expense1).replace(
                          /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                          ","
                        )
                      : monthData === 1
                      ? String(roomDetail && roomDetail.expense2).replace(
                          /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                          ","
                        )
                      : String(roomDetail && roomDetail.expense3).replace(
                          /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                          ","
                        )}
                  </Text>
                </Wrapper>

                <Wrapper
                  padding={width < 900 ? `20px` : `40px 30px`}
                  bgColor={Theme.lightGrey_C}
                  radius={`20px`}
                  margin={`0 0 40px`}
                >
                  <Wrapper
                    dr={`row`}
                    ju={width < 900 ? `flex-end` : `space-between`}
                  >
                    <Text
                      display={width < 900 ? `none` : `flex`}
                      fontSize={`24px`}
                      fontWeight={`600`}
                      color={Theme.basicTheme_C}
                    >
                      Total
                    </Text>

                    <Text fontSize={`24px`} fontWeight={`600`}>
                      500,000₩/{" "}
                      {monthData === 0
                        ? roomDetail && roomDetail.monthConcatTotalPrice
                        : monthData === 1
                        ? roomDetail && roomDetail.oneYearConcatTotalPrice
                        : roomDetail && roomDetail.twoYearConcatTotalPrice}
                    </Text>
                  </Wrapper>
                  <Wrapper
                    al={`flex-end`}
                    fontSize={width < 900 ? `13px` : `14px`}
                    color={Theme.darkGrey_C}
                    margin={`10px 0 5px`}
                  >
                    Service fee will be charged depending on service package
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  borderTop={`4px solid ${Theme.lightGrey_C}`}
                  padding={`40px 0`}
                  borderBottom={`4px solid ${Theme.lightGrey_C}`}
                  al={`flex-start`}
                  margin={`0 0 40px`}
                >
                  <Text
                    fontSize={width < 900 ? `20px` : `22px`}
                    fontWeight={`700`}
                    margin={`0 0 24px`}
                  >
                    Move-in date
                  </Text>

                  <Wrapper
                    padding={`20px 15px`}
                    bgColor={Theme.lightGrey_C}
                    radius={`10px`}
                    dr={`row`}
                    ju={`flex-start`}
                  >
                    <Image
                      src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms/icon_Move-in+date.png"
                      alt="icon"
                      width={`20px`}
                      margin={`0 5px 0 0`}
                    />
                    <Text fontSize={`16px`}>27 March 2023</Text>
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  al={`flex-start`}
                  margin={`0 0 40px`}
                  borderBottom={`4px solid ${Theme.lightGrey_C}`}
                >
                  <Text
                    fontSize={width < 900 ? `20px` : `22px`}
                    fontWeight={`700`}
                    margin={`0 0 24px`}
                  >
                    Option
                  </Text>

                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <RoundWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={width < 900 ? `52px` : `110px`}
                        height={width < 900 ? `52px` : `110px`}
                        padding={width < 900 ? `14px` : `30px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </RoundWrapper>

                    <RoundWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={width < 900 ? `52px` : `110px`}
                        height={width < 900 ? `52px` : `110px`}
                        padding={width < 900 ? `14px` : `30px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </RoundWrapper>

                    <RoundWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={width < 900 ? `52px` : `110px`}
                        height={width < 900 ? `52px` : `110px`}
                        padding={width < 900 ? `14px` : `30px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </RoundWrapper>

                    <RoundWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={width < 900 ? `52px` : `110px`}
                        height={width < 900 ? `52px` : `110px`}
                        padding={width < 900 ? `14px` : `30px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </RoundWrapper>

                    <RoundWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={width < 900 ? `52px` : `110px`}
                        height={width < 900 ? `52px` : `110px`}
                        padding={width < 900 ? `14px` : `30px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </RoundWrapper>

                    <RoundWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={width < 900 ? `52px` : `110px`}
                        height={width < 900 ? `52px` : `110px`}
                        padding={width < 900 ? `14px` : `30px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </RoundWrapper>

                    <RoundWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={width < 900 ? `52px` : `110px`}
                        height={width < 900 ? `52px` : `110px`}
                        padding={width < 900 ? `14px` : `30px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </RoundWrapper>

                    <RoundWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={width < 900 ? `52px` : `110px`}
                        height={width < 900 ? `52px` : `110px`}
                        padding={width < 900 ? `14px` : `30px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </RoundWrapper>

                    <RoundWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={width < 900 ? `52px` : `110px`}
                        height={width < 900 ? `52px` : `110px`}
                        padding={width < 900 ? `14px` : `30px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </RoundWrapper>

                    <RoundWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={width < 900 ? `52px` : `110px`}
                        height={width < 900 ? `52px` : `110px`}
                        padding={width < 900 ? `14px` : `30px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </RoundWrapper>

                    <RoundWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={width < 900 ? `52px` : `110px`}
                        height={width < 900 ? `52px` : `110px`}
                        padding={width < 900 ? `14px` : `30px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </RoundWrapper>
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  al={`flex-start`}
                  margin={`0 0 40px`}
                  borderBottom={`4px solid ${Theme.lightGrey_C}`}
                >
                  <Text
                    fontSize={width < 900 ? `20px` : `22px`}
                    fontWeight={`700`}
                    margin={`0 0 24px`}
                  >
                    Maintenance cost
                  </Text>

                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <RoundWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={width < 900 ? `52px` : `110px`}
                        height={width < 900 ? `52px` : `110px`}
                        padding={width < 900 ? `14px` : `30px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </RoundWrapper>

                    <RoundWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={width < 900 ? `52px` : `110px`}
                        height={width < 900 ? `52px` : `110px`}
                        padding={width < 900 ? `14px` : `30px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </RoundWrapper>

                    <RoundWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={width < 900 ? `52px` : `110px`}
                        height={width < 900 ? `52px` : `110px`}
                        padding={width < 900 ? `14px` : `30px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </RoundWrapper>

                    <RoundWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={width < 900 ? `52px` : `110px`}
                        height={width < 900 ? `52px` : `110px`}
                        padding={width < 900 ? `14px` : `30px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </RoundWrapper>

                    <RoundWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={width < 900 ? `52px` : `110px`}
                        height={width < 900 ? `52px` : `110px`}
                        padding={width < 900 ? `14px` : `30px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </RoundWrapper>

                    <RoundWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={width < 900 ? `52px` : `110px`}
                        height={width < 900 ? `52px` : `110px`}
                        padding={width < 900 ? `14px` : `30px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </RoundWrapper>

                    <RoundWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={width < 900 ? `52px` : `110px`}
                        height={width < 900 ? `52px` : `110px`}
                        padding={width < 900 ? `14px` : `30px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </RoundWrapper>

                    <RoundWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={width < 900 ? `52px` : `110px`}
                        height={width < 900 ? `52px` : `110px`}
                        padding={width < 900 ? `14px` : `30px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </RoundWrapper>

                    <RoundWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={width < 900 ? `52px` : `110px`}
                        height={width < 900 ? `52px` : `110px`}
                        padding={width < 900 ? `14px` : `30px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </RoundWrapper>

                    <RoundWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={width < 900 ? `52px` : `110px`}
                        height={width < 900 ? `52px` : `110px`}
                        padding={width < 900 ? `14px` : `30px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </RoundWrapper>

                    <RoundWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={width < 900 ? `52px` : `110px`}
                        height={width < 900 ? `52px` : `110px`}
                        padding={width < 900 ? `14px` : `30px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </RoundWrapper>
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  al={`flex-start`}
                  padding={`0 0 40px`}
                  borderBottom={`4px solid ${Theme.lightGrey_C}`}
                  margin={`0 0 40px`}
                >
                  <Text
                    fontSize={width < 900 ? `20px` : `22px`}
                    fontWeight={`700`}
                    margin={`0 0 24px`}
                  >
                    Detail
                  </Text>

                  <Text fontSize={width < 900 ? `14px` : `16px`}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                    ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    sea takimata sanctus est Lorem ipsum dolor sit amet
                  </Text>
                </Wrapper>

                <Wrapper
                  al={`flex-start`}
                  padding={`0 0 40px`}
                  borderBottom={`4px solid ${Theme.lightGrey_C}`}
                  margin={`0 0 40px`}
                >
                  <Text
                    fontSize={width < 900 ? `20px` : `22px`}
                    fontWeight={`700`}
                    margin={`0 0 24px`}
                  >
                    Local infrastructure
                  </Text>

                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <LocalWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={`110px`}
                        height={`110px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </LocalWrapper>

                    <LocalWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={`110px`}
                        height={`110px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </LocalWrapper>

                    <LocalWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={`110px`}
                        height={`110px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </LocalWrapper>

                    <LocalWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={`110px`}
                        height={`110px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </LocalWrapper>

                    <LocalWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={`110px`}
                        height={`110px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </LocalWrapper>

                    <LocalWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={`110px`}
                        height={`110px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </LocalWrapper>

                    <LocalWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={`110px`}
                        height={`110px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </LocalWrapper>

                    <LocalWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={`110px`}
                        height={`110px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </LocalWrapper>

                    <LocalWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={`110px`}
                        height={`110px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </LocalWrapper>

                    <LocalWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={`110px`}
                        height={`110px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </LocalWrapper>

                    <LocalWrapper>
                      <Wrapper
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`100%`}
                        width={`110px`}
                        height={`110px`}
                        margin={`0 0 5px`}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms-option/electricity.png"
                          alt="icon"
                        />
                      </Wrapper>

                      <Text fontSize={`14px`}>Sink</Text>
                    </LocalWrapper>
                  </Wrapper>
                </Wrapper>

                <Wrapper al={`flex-start`}>
                  <Text
                    fontSize={width < 900 ? `20px` : `22px`}
                    fontWeight={`700`}
                    margin={`0 0 24px`}
                  >
                    Real Estate Info
                  </Text>

                  <Wrapper
                    dr={`row`}
                    fontSize={width < 900 ? `14px` : `16px`}
                    margin={`0 0 5px`}
                    al={`flex-start`}
                  >
                    <Wrapper
                      width={width < 900 ? `140px` : `153px`}
                      al={`flex-start`}
                    >
                      Real Estate Name :&nbsp;
                    </Wrapper>
                    <Wrapper
                      width={
                        width < 900
                          ? `calc(100% - 140px)`
                          : `calc(100% - 153px)`
                      }
                      al={`flex-start`}
                      color={Theme.darkGrey2_C}
                    >
                      Hotel
                    </Wrapper>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    fontSize={width < 900 ? `14px` : `16px`}
                    margin={`0 0 5px`}
                    al={`flex-start`}
                  >
                    <Wrapper
                      width={width < 900 ? `145px` : `159px`}
                      al={`flex-start`}
                    >
                      Real Estate Adress :&nbsp;
                    </Wrapper>
                    <Wrapper
                      width={
                        width < 900
                          ? `calc(100% - 145px)`
                          : `calc(100% - 159px)`
                      }
                      al={`flex-start`}
                      color={Theme.darkGrey2_C}
                    >
                      91, Seokgye-ro, Nowon-gu, Seoul, Republic of Korea
                    </Wrapper>
                  </Wrapper>
                  <Text></Text>
                </Wrapper>
              </Wrapper>

              {/* Book Now */}
              <Wrapper width={`25%`} display={width < 900 ? `none` : `flex`}>
                <Wrapper
                  padding={`25px`}
                  bgColor={Theme.lightGrey_C}
                  radius={`5px`}
                  al={`flex-start`}
                >
                  <Text
                    fontSize={`16px`}
                    color={Theme.darkGrey_C}
                    margin={`0 0 5px`}
                  >
                    Name
                  </Text>

                  <TextInput
                    width={`100%`}
                    height={`40px`}
                    radius={`5px`}
                    placeholder="Name"
                    margin={`0 0 16px`}
                  />
                  <Text
                    fontSize={`16px`}
                    color={Theme.darkGrey_C}
                    margin={`0 0 5px`}
                  >
                    Phone Number
                  </Text>

                  <TextInput
                    width={`100%`}
                    height={`40px`}
                    radius={`5px`}
                    placeholder="Phone Number"
                    margin={`0 0 16px`}
                  />
                  <Text
                    fontSize={`16px`}
                    color={Theme.darkGrey_C}
                    margin={`0 0 5px`}
                  >
                    Deposit
                  </Text>

                  <Wrapper position={`relative`} margin={`0 0 16px`}>
                    <TextInput
                      width={`100%`}
                      height={`40px`}
                      radius={`5px`}
                      placeholder="Deposit"
                      type="number"
                    />

                    <Wrapper
                      width={`auto`}
                      position={`absolute`}
                      top={`1px`}
                      right={`10px`}
                      height={`38px`}
                      bgColor={Theme.white_C}
                    >
                      ₩
                    </Wrapper>
                  </Wrapper>
                  <Text
                    fontSize={`16px`}
                    color={Theme.darkGrey_C}
                    margin={`0 0 5px`}
                  >
                    Monthly payment
                  </Text>

                  <Wrapper position={`relative`} margin={`0 0 16px`}>
                    <TextInput
                      width={`100%`}
                      height={`40px`}
                      radius={`5px`}
                      placeholder="Monthly payment"
                      type="number"
                    />

                    <Wrapper
                      width={`auto`}
                      position={`absolute`}
                      top={`1px`}
                      right={`10px`}
                      height={`38px`}
                      bgColor={Theme.white_C}
                    >
                      ₩
                    </Wrapper>
                  </Wrapper>
                  <Text
                    fontSize={`16px`}
                    color={Theme.darkGrey_C}
                    margin={`0 0 5px`}
                  >
                    Region
                  </Text>

                  <TextInput
                    width={`100%`}
                    height={`40px`}
                    radius={`5px`}
                    placeholder="Region"
                    margin={`0 0 16px`}
                  />
                  <Text
                    fontSize={`16px`}
                    color={Theme.darkGrey_C}
                    margin={`0 0 5px`}
                  >
                    Moving date
                  </Text>

                  <Wrapper
                    position={`relative`}
                    margin={`0 0 16px`}
                    cursor={`pointer`}
                  >
                    <TextInput
                      width={`100%`}
                      height={`40px`}
                      radius={`5px`}
                      placeholder="Monthly payment"
                      type="number"
                    />

                    <Wrapper
                      width={`auto`}
                      position={`absolute`}
                      top={`1px`}
                      right={`10px`}
                      height={`38px`}
                      bgColor={Theme.white_C}
                    >
                      <Image
                        src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms/icon_Move-in+date.png"
                        alt="icon"
                      />
                    </Wrapper>
                  </Wrapper>
                  <Text
                    fontSize={`16px`}
                    color={Theme.darkGrey_C}
                    margin={`0 0 5px`}
                  >
                    Contract Period
                  </Text>

                  <Wrapper
                    position={`relative`}
                    margin={`0 0 16px`}
                    cursor={`pointer`}
                  >
                    <TextInput
                      width={`100%`}
                      height={`40px`}
                      radius={`5px`}
                      placeholder="Contract Period"
                      type="number"
                    />

                    <Wrapper
                      width={`auto`}
                      position={`absolute`}
                      top={`1px`}
                      right={`10px`}
                      height={`38px`}
                      bgColor={Theme.white_C}
                    >
                      <Image
                        src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms/icon_Move-in+date.png"
                        alt="icon"
                      />
                    </Wrapper>
                  </Wrapper>
                  <Text
                    fontSize={`16px`}
                    color={Theme.darkGrey_C}
                    margin={`0 0 5px`}
                  >
                    Messenger type & ID
                  </Text>

                  <TextInput
                    width={`100%`}
                    height={`40px`}
                    radius={`5px`}
                    placeholder="Messenger type & ID"
                    margin={`0 0 16px`}
                  />
                  <Text
                    fontSize={`16px`}
                    color={Theme.darkGrey_C}
                    margin={`0 0 5px`}
                  >
                    Email
                  </Text>

                  <TextInput
                    width={`100%`}
                    height={`40px`}
                    radius={`5px`}
                    placeholder="Email"
                    margin={`0 0 16px`}
                  />
                  <Text
                    fontSize={`16px`}
                    color={Theme.darkGrey_C}
                    margin={`0 0 5px`}
                  >
                    Other preferences
                  </Text>

                  <TextArea
                    width={`100%`}
                    height={`65px`}
                    radius={`5px`}
                    placeholder="Other preferences"
                    margin={`0 0 16px`}
                  />
                </Wrapper>

                <CommonButton
                  kindOf={`subTheme`}
                  width={`100%`}
                  height={`60px`}
                  fontSize={`22px`}
                  fontWeight={`700`}
                  margin={`10px 0 0`}
                >
                  Book Now
                </CommonButton>
              </Wrapper>
            </Wrapper>

            {/* 모바일 문의하기 */}
            <Wrapper
              position={`fixed`}
              bottom={bookModal ? `-146px` : `-100vh`}
              left={`0`}
              padding={`15px 0 220px`}
              bgColor={Theme.white_C}
              zIndex={`10`}
              overflow={`auto`}
              height={`100vh`}
              ju={`flex-start`}
            >
              <Wrapper>
                <RsWrapper wrap={`nowrap`} ju={`flex-start`}>
                  <BackWrapper onClick={() => setBookModal(false)}>
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
                      NO.123456
                    </Text>
                  </BackWrapper>

                  <Wrapper al={`flex-start`}>
                    <Text
                      fontSize={`26px`}
                      fontWeight={`700`}
                      margin={`0 0 20px`}
                    >
                      Booking
                    </Text>

                    <Text
                      fontSize={`16px`}
                      color={Theme.darkGrey_C}
                      margin={`0 0 5px`}
                    >
                      Name
                    </Text>

                    <TextInput
                      width={`100%`}
                      height={`40px`}
                      radius={`5px`}
                      placeholder="Name"
                      margin={`0 0 16px`}
                    />
                    <Text
                      fontSize={`16px`}
                      color={Theme.darkGrey_C}
                      margin={`0 0 5px`}
                    >
                      Phone Number
                    </Text>

                    <TextInput
                      width={`100%`}
                      height={`40px`}
                      radius={`5px`}
                      placeholder="Phone Number"
                      margin={`0 0 16px`}
                    />
                    <Text
                      fontSize={`16px`}
                      color={Theme.darkGrey_C}
                      margin={`0 0 5px`}
                    >
                      Deposit
                    </Text>

                    <Wrapper position={`relative`} margin={`0 0 16px`}>
                      <TextInput
                        width={`100%`}
                        height={`40px`}
                        radius={`5px`}
                        placeholder="Deposit"
                        type="number"
                      />

                      <Wrapper
                        width={`auto`}
                        position={`absolute`}
                        top={`1px`}
                        right={`10px`}
                        height={`38px`}
                        bgColor={Theme.white_C}
                      >
                        ₩
                      </Wrapper>
                    </Wrapper>
                    <Text
                      fontSize={`16px`}
                      color={Theme.darkGrey_C}
                      margin={`0 0 5px`}
                    >
                      Monthly payment
                    </Text>

                    <Wrapper position={`relative`} margin={`0 0 16px`}>
                      <TextInput
                        width={`100%`}
                        height={`40px`}
                        radius={`5px`}
                        placeholder="Monthly payment"
                        type="number"
                      />

                      <Wrapper
                        width={`auto`}
                        position={`absolute`}
                        top={`1px`}
                        right={`10px`}
                        height={`38px`}
                        bgColor={Theme.white_C}
                      >
                        ₩
                      </Wrapper>
                    </Wrapper>
                    <Text
                      fontSize={`16px`}
                      color={Theme.darkGrey_C}
                      margin={`0 0 5px`}
                    >
                      Region
                    </Text>

                    <TextInput
                      width={`100%`}
                      height={`40px`}
                      radius={`5px`}
                      placeholder="Region"
                      margin={`0 0 16px`}
                    />
                    <Text
                      fontSize={`16px`}
                      color={Theme.darkGrey_C}
                      margin={`0 0 5px`}
                    >
                      Moving date
                    </Text>

                    <Wrapper
                      position={`relative`}
                      margin={`0 0 16px`}
                      cursor={`pointer`}
                    >
                      <TextInput
                        width={`100%`}
                        height={`40px`}
                        radius={`5px`}
                        placeholder="Monthly payment"
                        type="number"
                      />

                      <Wrapper
                        width={`auto`}
                        position={`absolute`}
                        top={`1px`}
                        right={`10px`}
                        height={`38px`}
                        bgColor={Theme.white_C}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms/icon_Move-in+date.png"
                          alt="icon"
                        />
                      </Wrapper>
                    </Wrapper>
                    <Text
                      fontSize={`16px`}
                      color={Theme.darkGrey_C}
                      margin={`0 0 5px`}
                    >
                      Contract Period
                    </Text>

                    <Wrapper
                      position={`relative`}
                      margin={`0 0 16px`}
                      cursor={`pointer`}
                    >
                      <TextInput
                        width={`100%`}
                        height={`40px`}
                        radius={`5px`}
                        placeholder="Contract Period"
                        type="number"
                      />

                      <Wrapper
                        width={`auto`}
                        position={`absolute`}
                        top={`1px`}
                        right={`10px`}
                        height={`38px`}
                        bgColor={Theme.white_C}
                      >
                        <Image
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms/icon_Move-in+date.png"
                          alt="icon"
                        />
                      </Wrapper>
                    </Wrapper>
                    <Text
                      fontSize={`16px`}
                      color={Theme.darkGrey_C}
                      margin={`0 0 5px`}
                    >
                      Messenger type & ID
                    </Text>

                    <TextInput
                      width={`100%`}
                      height={`40px`}
                      radius={`5px`}
                      placeholder="Messenger type & ID"
                      margin={`0 0 16px`}
                    />
                    <Text
                      fontSize={`16px`}
                      color={Theme.darkGrey_C}
                      margin={`0 0 5px`}
                    >
                      Email
                    </Text>

                    <TextInput
                      width={`100%`}
                      height={`40px`}
                      radius={`5px`}
                      placeholder="Email"
                      margin={`0 0 16px`}
                    />
                    <Text
                      fontSize={`16px`}
                      color={Theme.darkGrey_C}
                      margin={`0 0 5px`}
                    >
                      Other preferences
                    </Text>

                    <TextArea
                      width={`100%`}
                      height={`65px`}
                      radius={`5px`}
                      placeholder="Other preferences"
                      margin={`0 0 16px`}
                    />
                  </Wrapper>
                </RsWrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper
              display={width < 900 ? `flex` : `none`}
              position={`fixed`}
              bottom={`10px`}
              right={`0`}
              zIndex={`10`}
              padding={`0 20px`}
            >
              <CommonButton
                kindOf={`subTheme`}
                width={`100%`}
                height={`60px`}
                fontSize={width < 900 ? `20px` : `22px`}
                fontWeight={`700`}
                margin={`10px 0 0`}
                onClick={() => setBookModal(true)}
                shadow={`0px 0px 10px rgba(0,0,0,0.1)`}
              >
                Book Now
              </CommonButton>
            </Wrapper>
          </RsWrapper>
        </WholeWrapper>

        <Modal
          visible={false}
          footer={null}
          closeIcon={
            <Image
              src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms/icon_close.png"
              alt="icon"
              width={`14px`}
              cursor={`pointer`}
            />
          }
        >
          <Wrapper padding={`30px 0`}>
            <Text
              fontSize={width < 900 ? `20px` : `24px`}
              fontWeight={`700`}
              margin={`0 0 8px`}
            >
              Reservation Complete
            </Text>

            <Text fontSize={width < 900 ? `13px` : `16px`} margin={`0 0 20px`}>
              Your reservation has been completed.
            </Text>

            <CommonButton
              kindOf={`subTheme`}
              width={`156px`}
              height={`50px`}
              fontSize={width < 900 ? `16px` : `18px`}
            >
              Confirm
            </CommonButton>
          </Wrapper>
        </Modal>
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
      type: ROOM_DETAIL_REQUEST,
      data: {
        id: context.query.id,
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);
export default Id;
