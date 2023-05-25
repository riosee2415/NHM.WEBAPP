import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  DatePicker,
  Empty,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Popover,
  Select,
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
  DelBtn,
  ModalBtn,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import {
  AlertOutlined,
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  HomeOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  ROOM_ADMIN_LIST_REQUEST,
  ROOM_CREATE_REQUEST,
  ROOM_DELETE_REQUEST,
  ROOM_DETAIL_REQUEST,
  ROOM_IMAGE_RESET,
  ROOM_INFRA_LIST_REQUEST,
  ROOM_MAINT_LIST_REQUEST,
  ROOM_OPTION_LIST_REQUEST,
  ROOM_TYPE_LIST_REQUEST,
  ROOM_UPDATE_REQUEST,
  ROOM_UPLOAD_REQUEST,
} from "../../../reducers/room";
import moment from "moment";

const InfoTitle = styled.div`
  font-size: 19px;
  margin: 15px 0px 5px 0px;
  width: ${(props) => props.width || `100%`};

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

const CustomForm = styled(Form)`
  width: 100%;

  & .ant-form-item {
    width: 100%;
  }
`;

const Index = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    roomAdminList,
    roomTypeList,
    roomPath,
    roomInfraList,
    roomOptionList,
    roomMaintList,

    roomDetail,
    bannerData,
    infraData,
    optionData,
    maintenanceData,

    //
    st_roomUploadLoading,
    st_roomUploadDone,
    st_roomUploadError,

    st_roomCreateLoading,
    st_roomCreateDone,
    st_roomCreateError,
    //
    st_roomUpdateLoading,
    st_roomUpdateDone,
    st_roomUpdateError,
    //
    st_roomDeleteDone,
    st_roomDeleteError,
  } = useSelector((state) => state.room);

  /////////////////////////////////////////////////////////////////////////

  ////// HOOKS //////

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("매물관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [cModal, setCModal] = useState(false);

  const roomPathRef = useRef();

  const [infoForm] = Form.useForm();
  const [cForm] = Form.useForm();

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
    if (st_roomUploadDone) {
      return message.success("썸네일이 업로드 되었습니다.");
    }

    if (st_roomUploadError) {
      return message.error(st_roomUploadError);
    }
  }, [st_roomUploadDone, st_roomUploadError]);

  // 매물 생성 후처리
  useEffect(() => {
    if (st_roomCreateDone) {
      dispatch({
        type: ROOM_ADMIN_LIST_REQUEST,
      });

      createModalToggle();
      return message.success("생성되었습니다.");
    }

    if (st_roomCreateError) {
      return message.error(st_roomCreateError);
    }
  }, [st_roomCreateDone, st_roomCreateError]);

  // 매물 수정 후처리
  useEffect(() => {
    if (st_roomUpdateDone) {
      dispatch({
        type: ROOM_ADMIN_LIST_REQUEST,
      });
      return message.success("수정되었습니다.");
    }

    if (st_roomUpdateError) {
      return message.error(st_roomUpdateError);
    }
  }, [st_roomUpdateDone, st_roomUpdateError]);

  // 매물 수정 후처리
  useEffect(() => {
    if (st_roomDeleteDone) {
      dispatch({
        type: ROOM_ADMIN_LIST_REQUEST,
      });

      setCurrentData(null);
      return message.success("삭제되었습니다.");
    }

    if (st_roomDeleteError) {
      return message.error(st_roomDeleteError);
    }
  }, [st_roomDeleteDone, st_roomDeleteError]);

  // 상세데이터 후처리
  useEffect(() => {
    if (roomDetail && infraData) {
      infoForm.setFieldsValue({
        roomNum: roomDetail.roomNum,
        kiIndex: roomDetail.kiIndex,
        title: roomDetail.title,
        subTitle: roomDetail.subTitle,
        deposit1: roomDetail.deposit1,
        deposit2: roomDetail.deposit2,
        deposit3: roomDetail.deposit3,
        rentFee1: roomDetail.rentFee1,
        rentFee2: roomDetail.rentFee2,
        rentFee3: roomDetail.rentFee3,
        expense1: roomDetail.expense1,
        expense2: roomDetail.expense2,
        expense3: roomDetail.expense3,
        moveInDate: moment(roomDetail.moveInDate),
        detail: roomDetail.detail,
        realEstateName: roomDetail.realEstateName,
        realEstateAddress: roomDetail.realEstateAddress,
        region: roomDetail.region,
        RoomTypeId: roomDetail.RoomTypeId,
        infraIds: infraData.map((data) => ({
          id: data.InfraId,
          sort: data.sort,
        })),
        optionIds: optionData.map((data) => ({
          id: data.OptionId,
          sort: data.sort,
        })),
        maintenanceIds: maintenanceData.map((data) => ({
          id: data.MaintenanceId,
          sort: data.sort,
        })),
      });

      console.log(
        infraData.map((data) => ({
          id: data.InfraId,
          sort: data.sort,
        }))
      );

      dispatch({
        type: ROOM_IMAGE_RESET,
        data: {
          roomPath: roomDetail.thumbnail,
        },
      });
    }
  }, [roomDetail, bannerData, infraData, optionData, maintenanceData]);

  ////// TOGGLE //////

  // 생성 모달
  const createModalToggle = useCallback(() => {
    setCModal((prev) => !prev);

    cForm.resetFields();
  }, [cModal]);

  ////// HANDLER //////

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const beforeSetDataHandler = useCallback(
    (record) => {
      setCurrentData(record);

      dispatch({
        type: ROOM_DETAIL_REQUEST,
        data: {
          id: record.id,
        },
      });
    },
    [currentData, infoForm]
  );

  const roomPathRefClickHandler = useCallback((data) => {
    roomPathRef.current.click();
  }, []);

  const roomPathUploadHandler = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    if (e.target.files.length < 1) {
      return;
    }

    dispatch({
      type: ROOM_UPLOAD_REQUEST,
      data: formData,
    });
  }, []);

  const roomCreateHandler = useCallback((data) => {
    dispatch({
      type: ROOM_CREATE_REQUEST,
      data: {
        RoomTypeId: data.RoomTypeId,
      },
    });
  }, []);

  // 수정하기
  const roomUpdateHandler = useCallback(
    (data) => {
      if (!roomPath) {
        return message.error("썸네일을 등록해주세요.");
      }

      // if (!data.infraIds || data.infraIds.length === 0) {
      //   return message.error("인프라를 하나 이상 등록해주세요.");
      // }
      // if (!data.optionIds || data.optionIds.length === 0) {
      //   return message.error("옵션을 하나 이상 등록해주세요.");
      // }
      // if (!data.maintenanceIds || data.maintenanceIds.length === 0) {
      //   return message.error("유지보수를 하나 이상 등록해주세요.");
      // }

      dispatch({
        type: ROOM_UPDATE_REQUEST,
        data: {
          id: currentData.id,
          thumbnail: roomPath,
          roomNum: data.roomNum,
          kiIndex: data.kiIndex,
          title: data.title,
          subTitle: data.subTitle,
          deposit1: data.deposit1,
          deposit2: data.deposit2,
          deposit3: data.deposit3,
          rentFee1: data.rentFee1,
          rentFee2: data.rentFee2,
          rentFee3: data.rentFee3,
          expense1: data.expense1,
          expense2: data.expense2,
          expense3: data.expense3,
          moveInDate: data.moveInDate
            ? data.moveInDate.format("YYYY-MM-DD")
            : null,
          detail: data.detail,
          realEstateName: data.realEstateName,
          realEstateAddress: data.realEstateAddress,
          region: data.region,
          RoomTypeId: data.RoomTypeId,
          infraIds: data.infraIds.map((data) => ({
            id: data.id,
            sort: data.sort,
          })),
          optionIds: data.optionIds.map((data) => ({
            id: data.id,
            sort: data.sort,
          })),
          maintenanceIds: data.maintenanceIds.map((data) => ({
            id: data.id,
            sort: data.sort,
          })),
        },
      });
    },
    [currentData, roomPath]
  );

  // 매물 삭제
  const rooomDeleteHandler = useCallback((data) => {
    dispatch({
      type: ROOM_DELETE_REQUEST,
      data: {
        id: data.id,
      },
    });
  }, []);
  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const col = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "매물번호",
      dataIndex: "roomNum",
    },
    {
      title: "제목",
      dataIndex: "title",
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

    {
      title: "삭제",
      render: (data) => (
        <Popconfirm
          title="정말 삭제하시겠습니까?"
          onConfirm={() => rooomDeleteHandler(data)}
          okText="삭제"
          cancelText="취소"
        >
          <DelBtn />
        </Popconfirm>
      ),
    },
  ];

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
        color={Theme.grey2_C}
        // shadow={`2px 2px 6px  ${Theme.adminTheme_2}`}
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
          <GuideLi>지점지역을 추가 / 삭제 등 관리를 할 수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            매물 지역관리, option, infra, maintenance을 먼저 등록시 매물을
            생성할 수 있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            삭제처리 된 지점지역은 복구가 불가능합니다.
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
            <Button size="small" type="primary" onClick={createModalToggle}>
              매물 생성
            </Button>
          </Wrapper>
          <Table
            style={{ width: "100%" }}
            rowKey="num"
            columns={col}
            dataSource={roomAdminList}
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
                <Image width={`350px`} src={roomPath} alt="thumbnail" />
                <input
                  ref={roomPathRef}
                  type="file"
                  hidden
                  accept=".jpg, .png"
                  onChange={roomPathUploadHandler}
                />
                <Button
                  style={{ width: `350px` }}
                  type="primary"
                  size="small"
                  onClick={roomPathRefClickHandler}
                  loading={st_roomUploadLoading}
                >
                  썸네일 업로드
                </Button>
              </Wrapper>

              <Wrapper margin={`0px 0px 5px 0px`}>
                <InfoTitle>
                  <CheckOutlined />
                  배너 정보
                </InfoTitle>
                <Image width={`350px`} src={roomPath} alt="thumbnail" />
                <input
                  ref={roomPathRef}
                  type="file"
                  hidden
                  accept=".jpg, .png"
                  onChange={roomPathUploadHandler}
                />
                <Button
                  style={{ width: `350px` }}
                  type="primary"
                  size="small"
                  onClick={roomPathRefClickHandler}
                  loading={st_roomUploadLoading}
                >
                  썸네일 업로드
                </Button>
              </Wrapper>

              <Wrapper margin={`0px 0px 30px 0px`}>
                <InfoTitle>
                  <CheckOutlined />
                  매물 기본정보
                </InfoTitle>
              </Wrapper>

              <CustomForm
                form={infoForm}
                style={{ width: `100%` }}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                layout="vertical"
                onFinish={roomUpdateHandler}
              >
                <Form.Item
                  name="RoomTypeId"
                  rules={[
                    { required: true, message: "매물지역은 필수입니다." },
                  ]}
                  label="매물지역"
                >
                  <Select size="small" placeholder="매물지역을 선택해주세요.">
                    {roomTypeList.map((data, idx) => {
                      return (
                        <Select.Option value={data.id} key={idx}>
                          {data.title}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="roomNum"
                  rules={[
                    { required: true, message: "매물번호는 필수입니다." },
                  ]}
                  label="매물번호"
                >
                  <Input size="small" placeholder="매물번호를 입력해주세요." />
                </Form.Item>
                <Form.Item
                  name="kiIndex"
                  rules={[{ required: true, message: "Kiindex는 필수입니다." }]}
                  label="Kiindex"
                >
                  <Input size="small" placeholder="Kiindex를 입력해주세요." />
                </Form.Item>
                <Form.Item
                  name="title"
                  rules={[{ required: true, message: "제목은 필수입니다." }]}
                  label="제목"
                >
                  <Input size="small" placeholder="제목을 입력해주세요." />
                </Form.Item>
                <Form.Item
                  name="subTitle"
                  rules={[{ required: true, message: "부제목은 필수입니다." }]}
                  label="부제목"
                >
                  <Input size="small" placeholder="부제목을 입력해주세요." />
                </Form.Item>
                <Form.Item
                  name="deposit1"
                  rules={[
                    { required: true, message: "6개월 deposit는 필수입니다." },
                  ]}
                  label="6개월 deposit"
                >
                  <Input
                    size="small"
                    type="number"
                    placeholder="6개월 deposit를 입력해주세요."
                  />
                </Form.Item>
                <Form.Item
                  name="deposit2"
                  rules={[
                    { required: true, message: "1년 deposit는 필수입니다." },
                  ]}
                  label="1년 deposit"
                >
                  <Input
                    size="small"
                    type="number"
                    placeholder="1년 deposit를 입력해주세요."
                  />
                </Form.Item>
                <Form.Item
                  name="deposit3"
                  rules={[
                    { required: true, message: "2년 deposit는 필수입니다." },
                  ]}
                  label="2년 deposit"
                >
                  <Input
                    size="small"
                    type="number"
                    placeholder="2년 deposit를 입력해주세요."
                  />
                </Form.Item>
                <Form.Item
                  name="rentFee1"
                  rules={[
                    { required: true, message: "6개월 rentFee는 필수입니다." },
                  ]}
                  label="6개월 rentFee"
                >
                  <Input
                    size="small"
                    type="number"
                    placeholder="6개월 rentFee를 입력해주세요."
                  />
                </Form.Item>
                <Form.Item
                  name="rentFee2"
                  rules={[
                    { required: true, message: "1년 rentFee는 필수입니다." },
                  ]}
                  label="1년 rentFee"
                >
                  <Input
                    size="small"
                    type="number"
                    placeholder="1년 rentFee를 입력해주세요."
                  />
                </Form.Item>
                <Form.Item
                  name="rentFee3"
                  rules={[
                    { required: true, message: "2년 rentFee는 필수입니다." },
                  ]}
                  label="2년 rentFee"
                >
                  <Input
                    size="small"
                    type="number"
                    placeholder="2년 rentFee를 입력해주세요."
                  />
                </Form.Item>
                <Form.Item
                  name="expense1"
                  rules={[
                    {
                      required: true,
                      message: "6개월 management expense는 필수입니다.",
                    },
                  ]}
                  label="6개월 management expense"
                >
                  <Input
                    size="small"
                    type="number"
                    placeholder="6개월 management expense를 입력해주세요."
                  />
                </Form.Item>
                <Form.Item
                  name="expense2"
                  rules={[
                    {
                      required: true,
                      message: "1년 management expense는 필수입니다.",
                    },
                  ]}
                  label="1년 management expense"
                >
                  <Input
                    size="small"
                    type="number"
                    placeholder="1년 management expense를 입력해주세요."
                  />
                </Form.Item>
                <Form.Item
                  name="expense3"
                  rules={[
                    {
                      required: true,
                      message: "2년 management expense는 필수입니다.",
                    },
                  ]}
                  label="2년 management expense"
                >
                  <Input
                    size="small"
                    type="number"
                    placeholder="2년 management expense를 입력해주세요."
                  />
                </Form.Item>
                <Form.Item
                  name="moveInDate"
                  rules={[
                    { required: true, message: "입주가능은 필수입니다." },
                  ]}
                  label="입주가능"
                >
                  <DatePicker
                    style={{ width: `100%` }}
                    size="small"
                    placeholder="입주가능을 입력해주세요."
                  />
                </Form.Item>
                <Form.Item
                  name="detail"
                  rules={[
                    { required: true, message: "디테일 설명은 필수입니다." },
                  ]}
                  label="디테일 설명"
                >
                  <Input.TextArea
                    autoSize={{
                      minRows: 6,
                      maxRows: 12,
                    }}
                    size="small"
                    placeholder="디테일 설명을 입력해주세요."
                  />
                </Form.Item>
                <Form.Item
                  name="realEstateName"
                  rules={[
                    { required: true, message: "매물이름은 필수입니다." },
                  ]}
                  label="매물이름"
                >
                  <Input size="small" placeholder="매물이름을 입력해주세요." />
                </Form.Item>
                <Form.Item
                  name="realEstateAddress"
                  rules={[
                    { required: true, message: "매물주소는 필수입니다." },
                  ]}
                  label="매물주소"
                >
                  <Input size="small" placeholder="매물주소를 입력해주세요." />
                </Form.Item>
                <Form.Item
                  name="region"
                  rules={[{ required: true, message: "지역은 필수입니다요" }]}
                  label="지역"
                >
                  <Input
                    size="small"
                    placeholder="지역을 입력해주세요.
                  "
                  />
                </Form.Item>

                <Form.List name="infraIds">
                  {(fields, { add, remove }) => (
                    <>
                      <Wrapper
                        dr={`row`}
                        ju={`space-between`}
                        margin={`30px 0px 15px`}
                      >
                        <InfoTitle width={`50%`}>
                          <CheckOutlined />
                          인프라 기본정보
                        </InfoTitle>

                        <Button size="small" type="primary" onClick={add}>
                          인프라 생성
                        </Button>
                      </Wrapper>
                      <Wrapper width={`auto`} dr={`row`} overflowX={`scroll`}>
                        {fields.length === 0 ? (
                          <Wrapper height={`300px`}>
                            <Empty description="등록된 인프라가 없습니다." />
                          </Wrapper>
                        ) : (
                          fields.map((field, idx) => {
                            return (
                              <Wrapper
                                key={idx}
                                margin={`0 0 20px`}
                                border={`1px solid ${Theme.basicTheme_C}`}
                                padding={`10px`}
                                position={`relative`}
                              >
                                <Wrapper
                                  width={`auto`}
                                  position="absolute"
                                  top={`0`}
                                  right={`0`}
                                  padding={`8px`}
                                  bgColor={Theme.basicTheme_C}
                                  color={Theme.white_C}
                                  cursor={`pointer`}
                                  fontSize={`18px`}
                                  onClick={() => remove(idx)}
                                >
                                  <CloseOutlined />
                                </Wrapper>
                                <Form.Item
                                  {...field}
                                  label="옵션"
                                  name={[field.name, "id"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "인프라는 필수입니다.",
                                    },
                                  ]}
                                >
                                  <Select
                                    size="small"
                                    placeholder="인프라를 선택해주세요."
                                  >
                                    {roomInfraList.map((data, idx) => {
                                      return (
                                        <Select.Option
                                          value={data.id}
                                          key={idx}
                                        >
                                          {data.title}
                                        </Select.Option>
                                      );
                                    })}
                                  </Select>
                                </Form.Item>
                                <Form.Item
                                  {...field}
                                  label="순서"
                                  name={[field.name, "sort"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "순서는 필수입니디.",
                                    },
                                  ]}
                                >
                                  <Input
                                    size="small"
                                    type="number"
                                    placeholder="순서를 입력해주세요."
                                  ></Input>
                                </Form.Item>
                              </Wrapper>
                            );
                          })
                        )}
                      </Wrapper>
                    </>
                  )}
                </Form.List>
                <Form.List name="optionIds">
                  {(fields, { add, remove }) => (
                    <>
                      <Wrapper
                        dr={`row`}
                        ju={`space-between`}
                        margin={`30px 0px 15px`}
                      >
                        <InfoTitle width={`50%`}>
                          <CheckOutlined />
                          옵션 기본정보
                        </InfoTitle>

                        <Button size="small" type="primary" onClick={add}>
                          옵션 생성
                        </Button>
                      </Wrapper>
                      <Wrapper width={`auto`} dr={`row`} overflowX={`scroll`}>
                        {fields.length === 0 ? (
                          <Wrapper height={`300px`}>
                            <Empty description="등록된 옵션이 없습니다." />
                          </Wrapper>
                        ) : (
                          fields.map((field, idx) => {
                            return (
                              <Wrapper
                                key={idx}
                                margin={`0 0 20px`}
                                border={`1px solid ${Theme.basicTheme_C}`}
                                padding={`10px`}
                                position={`relative`}
                              >
                                <Wrapper
                                  width={`auto`}
                                  position="absolute"
                                  top={`0`}
                                  right={`0`}
                                  padding={`8px`}
                                  bgColor={Theme.basicTheme_C}
                                  color={Theme.white_C}
                                  cursor={`pointer`}
                                  fontSize={`18px`}
                                  onClick={() => remove(idx)}
                                >
                                  <CloseOutlined />
                                </Wrapper>
                                <Form.Item
                                  {...field}
                                  label="옵션"
                                  name={[field.name, "id"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "옵션은 필수입니다.",
                                    },
                                  ]}
                                >
                                  <Select
                                    size="small"
                                    placeholder="옵션을 선택해주세요."
                                  >
                                    {roomOptionList.map((data, idx) => {
                                      return (
                                        <Select.Option
                                          value={data.id}
                                          key={idx}
                                        >
                                          {data.title}
                                        </Select.Option>
                                      );
                                    })}
                                  </Select>
                                </Form.Item>
                                <Form.Item
                                  {...field}
                                  label="순서"
                                  name={[field.name, "sort"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "순서는 필수입니디.",
                                    },
                                  ]}
                                >
                                  <Input
                                    size="small"
                                    type="number"
                                    placeholder="순서를 입력해주세요."
                                  ></Input>
                                </Form.Item>
                              </Wrapper>
                            );
                          })
                        )}
                      </Wrapper>
                    </>
                  )}
                </Form.List>

                <Form.List name="maintenanceIds">
                  {(fields, { add, remove }) => (
                    <>
                      <Wrapper
                        dr={`row`}
                        ju={`space-between`}
                        margin={`30px 0px 15px`}
                      >
                        <InfoTitle width={`50%`}>
                          <CheckOutlined />
                          유지보수 기본정보
                        </InfoTitle>

                        <Button size="small" type="primary" onClick={add}>
                          유지보수 생성
                        </Button>
                      </Wrapper>
                      <Wrapper width={`auto`} dr={`row`} overflowX={`scroll`}>
                        {fields.length === 0 ? (
                          <Wrapper height={`300px`}>
                            <Empty description="등록된 유지보수가 없습니다." />
                          </Wrapper>
                        ) : (
                          fields.map((field, idx) => {
                            return (
                              <Wrapper
                                key={idx}
                                margin={`0 0 20px`}
                                border={`1px solid ${Theme.basicTheme_C}`}
                                padding={`10px`}
                                position={`relative`}
                              >
                                <Wrapper
                                  width={`auto`}
                                  position="absolute"
                                  top={`0`}
                                  right={`0`}
                                  padding={`8px`}
                                  bgColor={Theme.basicTheme_C}
                                  color={Theme.white_C}
                                  cursor={`pointer`}
                                  fontSize={`18px`}
                                  onClick={() => remove(idx)}
                                >
                                  <CloseOutlined />
                                </Wrapper>
                                <Form.Item
                                  {...field}
                                  label="옵션"
                                  name={[field.name, "id"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "인프라는 필수입니다.",
                                    },
                                  ]}
                                >
                                  <Select
                                    size="small"
                                    placeholder="인프라를 선택해주세요."
                                  >
                                    {roomMaintList.map((data, idx) => {
                                      return (
                                        <Select.Option
                                          value={data.id}
                                          key={idx}
                                        >
                                          {data.title}
                                        </Select.Option>
                                      );
                                    })}
                                  </Select>
                                </Form.Item>
                                <Form.Item
                                  {...field}
                                  label="순서"
                                  name={[field.name, "sort"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "순서는 필수입니디.",
                                    },
                                  ]}
                                >
                                  <Input
                                    size="small"
                                    type="number"
                                    placeholder="순서를 입력해주세요."
                                  ></Input>
                                </Form.Item>
                              </Wrapper>
                            );
                          })
                        )}
                      </Wrapper>
                    </>
                  )}
                </Form.List>

                <Wrapper al={`flex-end`}>
                  <ModalBtn
                    size="small"
                    type="primary"
                    htmlType="submit"
                    loading={st_roomUpdateLoading}
                  >
                    수정하기
                  </ModalBtn>
                </Wrapper>
              </CustomForm>

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

      {/* CREATE MODAL */}
      <Modal
        title="매물 생성"
        open={cModal}
        onCancel={createModalToggle}
        footer={null}
      >
        <Form form={cForm} onFinish={roomCreateHandler}>
          <Form.Item
            name="RoomTypeId"
            rules={[{ required: true, message: "매물지역은 필수입니다." }]}
            label="매물지역"
          >
            <Select size="small" placeholder="매물지역을 선택해주세요.">
              {roomTypeList.map((data, idx) => {
                return (
                  <Select.Option value={data.id} key={idx}>
                    {data.title}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Wrapper dr={`row`} ju={`flex-end`}>
            <ModalBtn size="small" onClick={createModalToggle}>
              취소
            </ModalBtn>
            <ModalBtn size="small" type="primary" htmlType="submit">
              생성
            </ModalBtn>
          </Wrapper>
        </Form>
      </Modal>
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
      type: ROOM_ADMIN_LIST_REQUEST,
    });

    context.store.dispatch({
      type: ROOM_TYPE_LIST_REQUEST,
    });

    context.store.dispatch({
      type: ROOM_OPTION_LIST_REQUEST,
    });

    context.store.dispatch({
      type: ROOM_INFRA_LIST_REQUEST,
    });

    context.store.dispatch({
      type: ROOM_MAINT_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Index);
