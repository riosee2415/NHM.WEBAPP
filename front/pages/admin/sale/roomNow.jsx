import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Popconfirm, Popover, Table, message } from "antd";
import { useRouter, withRouter } from "next/router";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import {
  Wrapper,
  Text,
  HomeText,
  PopWrapper,
  OtherMenu,
  GuideUl,
  GuideLi,
  ModalBtn,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import {
  AlertOutlined,
  CheckOutlined,
  EyeOutlined,
  HomeOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  ROOM_NOW_LIST_REQUEST,
  ROOM_NOW_UPDATE_REQUEST,
} from "../../../reducers/room";

const InfoTitle = styled.div`
  font-size: 19px;
  margin: 15px 0px 5px 0px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  padding-left: 15px;
  color: ${(props) => props.theme.subTheme5_C};
`;

const ViewStatusIcon = styled(EyeOutlined)`
  font-size: 18px;
  color: ${(props) =>
    props.active ? props.theme.basicTheme_C : props.theme.lightGrey_C};
`;

const RoomNow = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    roomNowList,
    st_roomNowUpdateLoading,
    st_roomNowUpdateDone,
    st_roomNowUpdateError,
  } = useSelector((state) => state.room);

  ////// HOOKS //////
  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("매물관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);

  const [currentData, setCurrentData] = useState(false);
  const [searchType, setSearchType] = useState(3);

  const [infoForm] = Form.useForm();

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }

      if (!(me && me.menuRight8)) {
        message.error("접근권한이 없는 페이지 입니다.");
        moveLinkHandler(`/admin`);
      }
    }
  }, [st_loadMyInfoDone]);

  useEffect(() => {
    const currentMenus = items[level1];

    setSameDepth(currentMenus);

    currentMenus.map((data) => {
      if (data.link === router.pathname) {
        setLevel2(data.name);
      }
    });
  }, []);

  // 검색 후처리
  useEffect(() => {
    dispatch({
      type: ROOM_NOW_LIST_REQUEST,
      data: {
        isComplete: searchType,
      },
    });
  }, [searchType]);

  // 확인 후처리
  useEffect(() => {
    if (st_roomNowUpdateDone) {
      dispatch({
        type: ROOM_NOW_LIST_REQUEST,
      });

      return message.success("확인처리되었습니다.");
    }

    if (st_roomNowUpdateError) {
      return message.error(st_roomNowUpdateError);
    }
  }, [st_roomNowUpdateDone, st_roomNowUpdateError]);

  ////// HANDLER //////

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const beforeSetDataHandler = useCallback((data) => {
    setCurrentData(data);

    infoForm.setFieldsValue({
      title: data.title,
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      deposit: data.deposit,
      rentfee: data.rentfee,
      region: data.region,
      movingdate: data.movingdate,
      contractPeriod: data.contractPeriod,
      messengerTypeOrId: data.messengerTypeOrId,
      otherPreferences: data.otherPreferences,
    });
  }, []);

  // 확인 처리
  const roomNowCompleteHandler = useCallback((data) => {
    dispatch({
      type: ROOM_NOW_UPDATE_REQUEST,
      data: {
        id: data.id,
      },
    });
  }, []);

  // 검색하기
  const searchTypeChangeHandler = useCallback(
    (type) => {
      setSearchType(type);
    },
    [searchType]
  );

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const content = (
    <PopWrapper>
      {sameDepth.map((data) => {
        if (data.name === level2) return;
        if (!data.useYn) return;

        return (
          <OtherMenu key={data.link} onClick={() => moveLinkHandler(data.link)}>
            {data.name}
          </OtherMenu>
        );
      })}
    </PopWrapper>
  );

  const col = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "매물이름",
      dataIndex: "title",
    },
    {
      title: "이름",
      dataIndex: "name",
    },
    {
      title: "요청일",
      dataIndex: "viewCreatedAt",
    },
    {
      title: "확인여부",
      render: (data) =>
        data.isComplete ? (
          <CheckOutlined style={{ color: Theme.naver_C }} />
        ) : (
          <Popconfirm
            title="확인처리를 하시겠습니까?"
            okText="확인"
            cancelText="취소"
            onConfirm={() => roomNowCompleteHandler(data)}
          >
            <Button
              size="small"
              type="primary"
              loading={st_roomNowUpdateLoading}
            >
              확인
            </Button>
          </Popconfirm>
        ),
    },
    {
      title: "상태창",
      render: (data) => (
        <>
          <ViewStatusIcon
            active={
              parseInt(data.id) === (currentData && parseInt(currentData.id))
            }
          />
        </>
      ),
    },
  ];

  return (
    <AdminLayout>
      {/* MENU TAB */}
      <Wrapper
        height={`30px`}
        bgColor={Theme.lightGrey_C}
        dr={`row`}
        ju={`flex-start`}
        al={`center`}
        padding={`0px 15px`}
        color={Theme.grey_C}
      >
        <HomeText
          margin={`3px 20px 0px 20px`}
          onClick={() => moveLinkHandler("/admin")}
        >
          <HomeOutlined style={{ fontSize: "15px", marginRight: "5px" }} />
          메인
        </HomeText>
        <RightOutlined />
        <Text margin={`3px 20px 0px 20px`}>{level1} </Text>
        <RightOutlined />
        <Popover content={content}>
          <HomeText cur={true} margin={`3px 20px 0px 20px`}>
            {level2}{" "}
          </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={`10px 0px 0px 0px`}>
        <GuideUl>
          <GuideLi>화면 가이드안내 문구를 입력하세요.</GuideLi>
          <GuideLi isImpo={true}>
            화면 가이드안내 문구를 입력하세요. (RED COLOR)
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper dr="row" padding="0px 20px" al="flex-start" ju={`space-between`}>
        <Wrapper
          width={`calc(50% - 10px)`}
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          <Wrapper dr={`row`} ju={`flex-start`} margin={`0px 0px 5px 0px`}>
            <Button
              size="small"
              type={searchType === 3 && `primary`}
              onClick={() => searchTypeChangeHandler(3)}
            >
              전체
            </Button>
            <Button
              size="small"
              type={searchType === 1 && `primary`}
              onClick={() => searchTypeChangeHandler(1)}
            >
              확인
            </Button>
            <Button
              size="small"
              type={searchType === 2 && `primary`}
              onClick={() => searchTypeChangeHandler(2)}
            >
              미확인
            </Button>
          </Wrapper>
          <Table
            style={{ width: "100%" }}
            rowKey="num"
            columns={col}
            dataSource={roomNowList}
            size="small"
            onRow={(record, index) => {
              return {
                onClick: (e) => beforeSetDataHandler(record),
              };
            }}
          />
        </Wrapper>

        <Wrapper
          width={`calc(50% - 10px)`}
          padding="5px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          {currentData ? (
            <Wrapper>
              <Wrapper margin={`0px 0px 30px 0px`}>
                <InfoTitle>
                  <CheckOutlined />
                  매물구매요청 정보
                </InfoTitle>
              </Wrapper>
              <Form
                form={infoForm}
                style={{ width: `100%` }}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                layout="vertical"
              >
                <Form.Item name="title" label="매물이름">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="name" label="요청자">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="email">
                  <Input size="small" readOnly label="이메일" />
                </Form.Item>
                <Form.Item name="mobile" label="전화번호">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="deposit" label="보증금">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="rentfee" label="임대료">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="region" label="지역">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="movingdate" label="이사 날짜">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="contractPeriod" label="계약기간">
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item
                  name="messengerTypeOrId"
                  label="메신저 유형 및 아이디"
                >
                  <Input size="small" readOnly />
                </Form.Item>
                <Form.Item name="otherPreferences" label="다른요청사항">
                  <Input.TextArea
                    autoSize={{ minRows: 6, maxRows: 12 }}
                    size="small"
                    readOnly
                  />
                </Form.Item>
              </Form>
            </Wrapper>
          ) : (
            <Wrapper padding={`50px 0px`} dr="row">
              <AlertOutlined
                style={{
                  fontSize: "20px",
                  color: Theme.red_C,
                  marginRight: "5px",
                }}
              />
              좌측 데이터를 선택하여 상세정보를 확인하세요.
            </Wrapper>
          )}
        </Wrapper>
      </Wrapper>
    </AdminLayout>
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
      type: ROOM_NOW_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(RoomNow);
