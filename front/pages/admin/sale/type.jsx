import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Image,
  Input,
  Popconfirm,
  Popover,
  Table,
  message,
} from "antd";
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
  HomeOutlined,
  RightOutlined,
  AlertOutlined,
  CheckOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  ROOM_TYPE_CREATE_REQUEST,
  ROOM_TYPE_DELETE_REQUEST,
  ROOM_TYPE_IMAGE_REQUEST,
  ROOM_TYPE_IMAGE_RESET,
  ROOM_TYPE_LIST_REQUEST,
  ROOM_TYPE_THUMBNAIL_REQUEST,
  ROOM_TYPE_UPDATE_REQUEST,
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

const Type = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    roomTypeList,
    roomTypeThumbnail,
    roomTypeImage,
    //
    st_roomTypeThumbnailLoading,
    st_roomTypeThumbnailDone,
    st_roomTypeThumbnailError,
    //
    st_roomTypeImageLoading,
    st_roomTypeImageDone,
    st_roomTypeImageError,
    //
    st_roomTypeCreateLoading,
    st_roomTypeCreateDone,
    st_roomTypeCreateError,
    //
    st_roomTypeUpdateLoading,
    st_roomTypeUpdateDone,
    st_roomTypeUpdateError,
    //
    st_roomTypeDeleteLoading,
    st_roomTypeDeleteDone,
    st_roomTypeDeleteError,
  } = useSelector((state) => state.room);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("매물관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);
  const [currentData, setCurrentData] = useState(null);

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

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

  /////////////////////////////////////////////////////////////////////////

  ////// HOOKS //////

  const [infoForm] = Form.useForm();

  const thumbnailRef = useRef();
  const imageRef = useRef();

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

  // 썸네일 수정 후처리
  useEffect(() => {
    if (st_roomTypeThumbnailDone) {
      return message.success("썸네일이 업로드 되었습니다.");
    }

    if (st_roomTypeThumbnailError) {
      return message.error(st_roomTypeThumbnailError);
    }
  }, [st_roomTypeThumbnailDone, st_roomTypeThumbnailError]);

  // 이미지 수정 후처리
  useEffect(() => {
    if (st_roomTypeImageDone) {
      return message.success("이미지가 업로드 되었습니다.");
    }

    if (st_roomTypeImageError) {
      return message.error(st_roomTypeImageError);
    }
  }, [st_roomTypeImageDone, st_roomTypeImageError]);

  // 매물지역 생성
  useEffect(() => {
    if (st_roomTypeCreateDone) {
      dispatch({
        type: ROOM_TYPE_LIST_REQUEST,
      });
      return message.success("매물지역이 생성되었습니다.");
    }

    if (st_roomTypeCreateError) {
      return message.error(st_roomTypeCreateError);
    }
  }, [st_roomTypeCreateDone, st_roomTypeCreateError]);

  // 매물지역 수정
  useEffect(() => {
    if (st_roomTypeUpdateDone) {
      dispatch({
        type: ROOM_TYPE_LIST_REQUEST,
      });
      return message.success("매물지역이 수정되었습니다.");
    }

    if (st_roomTypeUpdateError) {
      return message.error(st_roomTypeUpdateError);
    }
  }, [st_roomTypeUpdateDone, st_roomTypeUpdateError]);

  // 매물지역 삭제
  useEffect(() => {
    if (st_roomTypeDeleteDone) {
      setCurrentData(null);

      dispatch({
        type: ROOM_TYPE_LIST_REQUEST,
      });
      return message.success("매물지역이 삭제되었습니다.");
    }

    if (st_roomTypeDeleteError) {
      return message.error(st_roomTypeDeleteError);
    }
  }, [st_roomTypeDeleteDone, st_roomTypeDeleteError]);

  ////// HANDLER //////

  const beforeSetDataHandler = useCallback(
    (data) => {
      setCurrentData(data);

      if (data) {
        infoForm.setFieldsValue({
          title: data.title,
          createdAt: data.viewCreatedAt,
          updatedAt: data.viewUpdatedAt,
        });

        dispatch({
          type: ROOM_TYPE_IMAGE_RESET,
          data: {
            roomTypeThumbnail: data.thumbnail,
            roomTypeImage: data.imagePath,
          },
        });
      }
    },
    [currentData]
  );

  // 썸네일 수정
  const thumbnailRefClickHandler = useCallback((data) => {
    thumbnailRef.current.click();
  }, []);
  const thumbnailUploadHandler = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    if (e.target.files.length < 1) {
      return;
    }

    dispatch({
      type: ROOM_TYPE_THUMBNAIL_REQUEST,
      data: formData,
    });
  }, []);

  // 이미지 수정
  const imageRefClickHandler = useCallback((data) => {
    imageRef.current.click();
  }, []);
  const imageUploadHandler = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    if (e.target.files.length < 1) {
      return;
    }

    dispatch({
      type: ROOM_TYPE_IMAGE_REQUEST,
      data: formData,
    });
  }, []);

  // 데이터 생성
  const roomTypeCreateHandler = useCallback(() => {
    dispatch({
      type: ROOM_TYPE_CREATE_REQUEST,
    });
  }, []);

  // 데이터 수정
  const roomTypeUpdateHandler = useCallback(
    (data) => {
      if (!currentData) {
        return message.error("잠시 후 다시 시도해주세요.");
      }

      dispatch({
        type: ROOM_TYPE_UPDATE_REQUEST,
        data: {
          title: data.title,
          thumbnail: roomTypeThumbnail,
          imagePath: roomTypeImage,
          typeId: currentData.id,
        },
      });
    },
    [roomTypeThumbnail, roomTypeImage, currentData]
  );

  const roomTypeDeleteHandler = useCallback(() => {
    if (!currentData) {
      return message.error("잠시 후 다시 시도해주세요.");
    }

    dispatch({
      type: ROOM_TYPE_DELETE_REQUEST,
      data: {
        typeId: currentData.id,
      },
    });
  }, [currentData]);

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const col = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "제목",
      dataIndex: "title",
    },
    {
      title: "썸네일",
      render: (data) => {
        return <Image width={`100px`} src={data.thumbnail} />;
      },
    },
    {
      title: "생성일",
      dataIndex: "viewCreatedAt",
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
          <Wrapper al="flex-end" margin={`0px 0px 5px 0px`}>
            <Button
              size="small"
              type="primary"
              loading={st_roomTypeCreateLoading}
              onClick={roomTypeCreateHandler}
            >
              매물지역 생성
            </Button>
          </Wrapper>
          <Table
            style={{ width: "100%" }}
            rowKey="num"
            columns={col}
            dataSource={roomTypeList}
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
              <Wrapper margin={`0px 0px 5px 0px`}>
                <InfoTitle>
                  <CheckOutlined />
                  썸네일 수정
                </InfoTitle>
                <Image
                  width={`350px`}
                  src={roomTypeThumbnail}
                  alt="thumbnail"
                />
                <input
                  ref={thumbnailRef}
                  type="file"
                  hidden
                  accept=".jpg, .png"
                  onChange={thumbnailUploadHandler}
                />
                <Button
                  style={{ width: `350px` }}
                  type="primary"
                  size="small"
                  onClick={thumbnailRefClickHandler}
                  loading={st_roomTypeThumbnailLoading}
                >
                  썸네일 업로드
                </Button>
              </Wrapper>

              <Wrapper margin={`0px 0px 5px 0px`}>
                <InfoTitle>
                  <CheckOutlined />
                  이미지 수정
                </InfoTitle>
                <Image width={`350px`} src={roomTypeImage} alt="image" />
                <input
                  ref={imageRef}
                  type="file"
                  hidden
                  accept=".jpg, .png"
                  onChange={imageUploadHandler}
                />
                <Button
                  style={{ width: `350px` }}
                  type="primary"
                  size="small"
                  onClick={imageRefClickHandler}
                  loading={st_roomTypeImageLoading}
                >
                  이미지 업로드
                </Button>
              </Wrapper>

              <Wrapper margin={`0px 0px 5px 0px`}>
                <InfoTitle>
                  <CheckOutlined />
                  매물지역 기본정보
                </InfoTitle>
              </Wrapper>

              <Form
                form={infoForm}
                onFinish={roomTypeUpdateHandler}
                style={{ width: `100%` }}
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 22 }}
              >
                <Form.Item
                  label="제목"
                  name="title"
                  rules={[
                    { required: true, message: "제목은 필수 입력사항 입니다." },
                  ]}
                >
                  <Input size="small" />
                </Form.Item>

                <Form.Item label="작성일" name="createdAt">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Form.Item label="수정일" name="updatedAt">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Wrapper dr={`row`} ju="flex-end">
                  <Popconfirm
                    title="정말 삭제하시겠습니까?"
                    okText="삭제"
                    cancelText="취소"
                    onConfirm={roomTypeDeleteHandler}
                  >
                    <Button
                      type="danger"
                      size="small"
                      loading={st_roomTypeDeleteLoading}
                    >
                      삭제하기
                    </Button>
                  </Popconfirm>

                  <ModalBtn
                    type="primary"
                    size="small"
                    htmlType="submit"
                    loading={st_roomTypeUpdateLoading}
                  >
                    정보 업데이트
                  </ModalBtn>
                </Wrapper>
              </Form>

              <Wrapper
                width="100%"
                height="1px"
                bgColor={Theme.lightGrey_C}
                margin={`30px 0px`}
              ></Wrapper>
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
      type: ROOM_TYPE_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Type);
