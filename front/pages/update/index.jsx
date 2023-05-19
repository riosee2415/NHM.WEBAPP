import React, { useCallback, useState } from "react";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import ClientLayout from "../../components/ClientLayout";
import axios from "axios";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import {
  CustomPage,
  Image,
  RsWrapper,
  SpanText,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import styled from "styled-components";
import Head from "next/head";
import SubBanner from "../../components/SubBanner";
import { useSelector } from "react-redux";
import { FRONT_NOTICE_LIST_REQUEST } from "../../reducers/notice";
import { useRouter } from "next/router";

const Box = styled(Wrapper)`
  padding: 25px;
  border-bottom: 1px solid ${Theme.lightGrey_C};
  cursor: pointer;
  flex-direction: row;
  justify-content: space-between;
  font-size: 16px;
  color: ${Theme.darkGrey2_C};

  &:hover {
    background: ${Theme.subTheme2_C};
    color: ${Theme.black_C};
  }
`;

const Index = ({}) => {
  ////// GLOBAL STATE //////
  const { frontNotices, maxPage } = useSelector((state) => state.notice);

  const [currentTap, setCurrentTab] = useState(1);
  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();

  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  //페이지네이션
  const nextPageCall = useCallback(
    (changePage) => {
      setCurrentTab(changePage);
    },
    [currentTap]
  );

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>KOREAIS | UPDATE</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <SubBanner
            bgImg={
              width < 900
                ? `url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/sub-banner/update_m.png")`
                : `url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/sub-banner/update.png")`
            }
            title="Update"
          />

          <RsWrapper>
            <Wrapper al={`flex-start`}>
              <Text
                fontSize={width < 900 ? `20px` : `40px`}
                fontWeight={`700`}
                margin={width < 900 ? `0 0 20px` : `0 0 40px`}
                color={Theme.darkGrey2_C}
              >
                Notice and Update
              </Text>

              <Wrapper
                bgColor={Theme.lightGrey_C}
                padding={`25px`}
                dr={`row`}
                ju={width < 900 ? `center` : `flex-start`}
              >
                <Image
                  src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/update/icon_alert.png"
                  alt="icon"
                  width={`20px`}
                  margin={`0 5px 0 0`}
                />
                <Text fontSize={width < 900 ? `16px` : `20px`}>
                  Alert : Please check the&nbsp;
                  <SpanText color={Theme.basicTheme_C}>notice</SpanText>
                </Text>
              </Wrapper>
            </Wrapper>

            {frontNotices && frontNotices.length === 0 ? (
              <Wrapper></Wrapper>
            ) : (
              frontNotices.map((data) => {
                return (
                  <Box
                    key={data.id}
                    onClick={() => moveLinkHandler(`/update/${data.id}`)}
                  >
                    <Wrapper
                      dr={`row`}
                      width={width < 900 ? `100%` : `90%`}
                      ju={`flex-start`}
                    >
                      <Wrapper
                        width={`60px`}
                        display={width < 900 ? `none` : `flex`}
                      >
                        {data.num}
                      </Wrapper>
                      <Wrapper
                        width={`auto`}
                        maxWidth={width < 900 ? `100%` : `calc(100% - 60px)`}
                        isEllipsis={true}
                      >
                        {data.title}
                      </Wrapper>
                    </Wrapper>
                    <Wrapper
                      width={`10%`}
                      al={`flex-end`}
                      display={width < 900 ? `none` : `flex`}
                    >
                      {data.viewFrontCreatedAt}
                    </Wrapper>
                  </Box>
                );
              })
            )}

            <Wrapper margin={`50px 0 0`}>
              <CustomPage
                defaultCurrent={1}
                current={parseInt(currentTap)}
                total={maxPage * 10}
                pageSize={10}
                onChange={(page) => nextPageCall(page)}
              />
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

    context.store.dispatch({
      type: FRONT_NOTICE_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);
export default Index;
