import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  ROOM_LIST_REQUEST,
  ROOM_LIST_SUCCESS,
  ROOM_LIST_FAILURE,
  //
  ROOM_ADMIN_LIST_REQUEST,
  ROOM_ADMIN_LIST_SUCCESS,
  ROOM_ADMIN_LIST_FAILURE,
  //
  ROOM_CREATE_REQUEST,
  ROOM_CREATE_SUCCESS,
  ROOM_CREATE_FAILURE,
  //
  ROOM_UPDATE_REQUEST,
  ROOM_UPDATE_SUCCESS,
  ROOM_UPDATE_FAILURE,
  //
  ROOM_DELETE_REQUEST,
  ROOM_DELETE_SUCCESS,
  ROOM_DELETE_FAILURE,
  //
  ROOM_UPLOAD_REQUEST,
  ROOM_UPLOAD_SUCCESS,
  ROOM_UPLOAD_FAILURE,
  //
  //
  ROOM_TYPE_LIST_REQUEST,
  ROOM_TYPE_LIST_SUCCESS,
  ROOM_TYPE_LIST_FAILURE,
  //
  ROOM_TYPE_CREATE_REQUEST,
  ROOM_TYPE_CREATE_SUCCESS,
  ROOM_TYPE_CREATE_FAILURE,
  //
  ROOM_TYPE_UPDATE_REQUEST,
  ROOM_TYPE_UPDATE_SUCCESS,
  ROOM_TYPE_UPDATE_FAILURE,
  //
  ROOM_TYPE_DELETE_REQUEST,
  ROOM_TYPE_DELETE_SUCCESS,
  ROOM_TYPE_DELETE_FAILURE,
  //
  //
  ROOM_OPTION_LIST_REQUEST,
  ROOM_OPTION_LIST_SUCCESS,
  ROOM_OPTION_LIST_FAILURE,
  //
  ROOM_OPTION_CREATE_REQUEST,
  ROOM_OPTION_CREATE_SUCCESS,
  ROOM_OPTION_CREATE_FAILURE,
  //
  ROOM_OPTION_UPDATE_REQUEST,
  ROOM_OPTION_UPDATE_SUCCESS,
  ROOM_OPTION_UPDATE_FAILURE,
  //
  ROOM_OPTION_DELETE_REQUEST,
  ROOM_OPTION_DELETE_SUCCESS,
  ROOM_OPTION_DELETE_FAILURE,
  //
  //
  ROOM_INFRA_LIST_REQUEST,
  ROOM_INFRA_LIST_SUCCESS,
  ROOM_INFRA_LIST_FAILURE,
  //
  ROOM_INFRA_CREATE_REQUEST,
  ROOM_INFRA_CREATE_SUCCESS,
  ROOM_INFRA_CREATE_FAILURE,
  //
  ROOM_INFRA_UPDATE_REQUEST,
  ROOM_INFRA_UPDATE_SUCCESS,
  ROOM_INFRA_UPDATE_FAILURE,
  //
  ROOM_INFRA_DELETE_REQUEST,
  ROOM_INFRA_DELETE_SUCCESS,
  ROOM_INFRA_DELETE_FAILURE,
  //
  //
  ROOM_MAINT_LIST_REQUEST,
  ROOM_MAINT_LIST_SUCCESS,
  ROOM_MAINT_LIST_FAILURE,
  //
  ROOM_MAINT_CREATE_REQUEST,
  ROOM_MAINT_CREATE_SUCCESS,
  ROOM_MAINT_CREATE_FAILURE,
  //
  ROOM_MAINT_UPDATE_REQUEST,
  ROOM_MAINT_UPDATE_SUCCESS,
  ROOM_MAINT_UPDATE_FAILURE,
  //
  ROOM_MAINT_DELETE_REQUEST,
  ROOM_MAINT_DELETE_SUCCESS,
  ROOM_MAINT_DELETE_FAILURE,
  //
  //
  ROOM_BANNER_LIST_REQUEST,
  ROOM_BANNER_LIST_SUCCESS,
  ROOM_BANNER_LIST_FAILURE,
  //
  ROOM_BANNER_CREATE_REQUEST,
  ROOM_BANNER_CREATE_SUCCESS,
  ROOM_BANNER_CREATE_FAILURE,
  //
  ROOM_BANNER_UPDATE_REQUEST,
  ROOM_BANNER_UPDATE_SUCCESS,
  ROOM_BANNER_UPDATE_FAILURE,
  //
  ROOM_BANNER_DELETE_REQUEST,
  ROOM_BANNER_DELETE_SUCCESS,
  ROOM_BANNER_DELETE_FAILURE,
  //
  //
  ROOM_DETAIL_REQUEST,
  ROOM_DETAIL_SUCCESS,
  ROOM_DETAIL_FAILURE,
  //
  ROOM_TYPE_THUMBNAIL_REQUEST,
  ROOM_TYPE_THUMBNAIL_SUCCESS,
  ROOM_TYPE_THUMBNAIL_FAILURE,
  //,
  ROOM_TYPE_IMAGE_REQUEST,
  ROOM_TYPE_IMAGE_SUCCESS,
  ROOM_TYPE_IMAGE_FAILURE,
  //
  //
  ROOM_NOW_LIST_REQUEST,
  ROOM_NOW_LIST_SUCCESS,
  ROOM_NOW_LIST_FAILURE,
  //
  ROOM_NOW_CREATE_REQUEST,
  ROOM_NOW_CREATE_SUCCESS,
  ROOM_NOW_CREATE_FAILURE,
  //,
  ROOM_NOW_UPDATE_REQUEST,
  ROOM_NOW_UPDATE_SUCCESS,
  ROOM_NOW_UPDATE_FAILURE,
} from "../reducers/room";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomListAPI(data) {
  return await axios.post(`/api/room/list`, data);
}

function* roomList(action) {
  try {
    const result = yield call(roomListAPI, action.data);

    yield put({
      type: ROOM_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_LIST_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomAdminListAPI(data) {
  return await axios.post(`/api/room/admin/list`, data);
}

function* roomAdminList(action) {
  try {
    const result = yield call(roomAdminListAPI, action.data);

    yield put({
      type: ROOM_ADMIN_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_ADMIN_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomCreateAPI(data) {
  return await axios.post(`/api/room/create`, data);
}

function* roomCreate(action) {
  try {
    const result = yield call(roomCreateAPI, action.data);

    yield put({
      type: ROOM_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomUpdateAPI(data) {
  return await axios.post(`/api/room/update`, data);
}

function* roomUpdate(action) {
  try {
    const result = yield call(roomUpdateAPI, action.data);

    yield put({
      type: ROOM_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomDeleteAPI(data) {
  return await axios.post(`/api/room/delete`, data);
}

function* roomDelete(action) {
  try {
    const result = yield call(roomDeleteAPI, action.data);

    yield put({
      type: ROOM_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomImgAPI(data) {
  return await axios.post(`/api/room/image`, data);
}

function* roomImg(action) {
  try {
    const result = yield call(roomImgAPI, action.data);

    yield put({
      type: ROOM_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomTypeListAPI(data) {
  return await axios.post(`/api/room/type/list`, data);
}

function* roomTypeList(action) {
  try {
    const result = yield call(roomTypeListAPI, action.data);

    yield put({
      type: ROOM_TYPE_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_TYPE_LIST_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomTypeCreateAPI(data) {
  return await axios.post(`/api/room/type/create`, data);
}

function* roomTypeCreate(action) {
  try {
    const result = yield call(roomTypeCreateAPI, action.data);

    yield put({
      type: ROOM_TYPE_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_TYPE_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomTypeUpdateAPI(data) {
  return await axios.post(`/api/room/type/update`, data);
}

function* roomTypeUpdate(action) {
  try {
    const result = yield call(roomTypeUpdateAPI, action.data);

    yield put({
      type: ROOM_TYPE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_TYPE_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomTypeDeleteAPI(data) {
  return await axios.post(`/api/room/type/delete`, data);
}

function* roomTypeDelete(action) {
  try {
    const result = yield call(roomTypeDeleteAPI, action.data);

    yield put({
      type: ROOM_TYPE_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_TYPE_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomOptionListAPI(data) {
  return await axios.post(`/api/room/option/list`, data);
}

function* roomOptionList(action) {
  try {
    const result = yield call(roomOptionListAPI, action.data);

    yield put({
      type: ROOM_OPTION_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_OPTION_LIST_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomOptionCreateAPI(data) {
  return await axios.post(`/api/room/option/create`, data);
}

function* roomOptionCreate(action) {
  try {
    const result = yield call(roomOptionCreateAPI, action.data);

    yield put({
      type: ROOM_OPTION_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_OPTION_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomOptionUpdateAPI(data) {
  return await axios.post(`/api/room/option/update`, data);
}

function* roomOptionUpdate(action) {
  try {
    const result = yield call(roomOptionUpdateAPI, action.data);

    yield put({
      type: ROOM_OPTION_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_OPTION_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomOptionDeleteAPI(data) {
  return await axios.post(`/api/room/option/delete`, data);
}

function* roomOptionDelete(action) {
  try {
    const result = yield call(roomOptionDeleteAPI, action.data);

    yield put({
      type: ROOM_OPTION_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_OPTION_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomInfraListAPI(data) {
  return await axios.post(`/api/room/infra/list`, data);
}

function* roomInfraList(action) {
  try {
    const result = yield call(roomInfraListAPI, action.data);

    yield put({
      type: ROOM_INFRA_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_INFRA_LIST_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomInfraCreateAPI(data) {
  return await axios.post(`/api/room/infra/create`, data);
}

function* roomInfraCreate(action) {
  try {
    const result = yield call(roomInfraCreateAPI, action.data);

    yield put({
      type: ROOM_INFRA_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_INFRA_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomInfraUpdateAPI(data) {
  return await axios.post(`/api/room/infra/update`, data);
}

function* roomInfraUpdate(action) {
  try {
    const result = yield call(roomInfraUpdateAPI, action.data);

    yield put({
      type: ROOM_INFRA_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_INFRA_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomInfraDeleteAPI(data) {
  return await axios.post(`/api/room/infra/delete`, data);
}

function* roomInfraDelete(action) {
  try {
    const result = yield call(roomInfraDeleteAPI, action.data);

    yield put({
      type: ROOM_INFRA_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_INFRA_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomBannerListAPI(data) {
  return await axios.post(`/api/room/banner/list`, data);
}

function* roomBannerList(action) {
  try {
    const result = yield call(roomBannerListAPI, action.data);

    yield put({
      type: ROOM_BANNER_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_BANNER_LIST_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomBannerCreateAPI(data) {
  return await axios.post(`/api/room/infra/create`, data);
}

function* roomBannerCreate(action) {
  try {
    const result = yield call(roomBannerCreateAPI, action.data);

    yield put({
      type: ROOM_BANNER_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_BANNER_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomBannerUpdateAPI(data) {
  return await axios.post(`/api/room/infra/update`, data);
}

function* roomBannerUpdate(action) {
  try {
    const result = yield call(roomBannerUpdateAPI, action.data);

    yield put({
      type: ROOM_BANNER_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_BANNER_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomBannerDeleteAPI(data) {
  return await axios.post(`/api/room/infra/delete`, data);
}

function* roomBannerDelete(action) {
  try {
    const result = yield call(roomBannerDeleteAPI, action.data);

    yield put({
      type: ROOM_BANNER_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_BANNER_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomMaintListAPI(data) {
  return await axios.post(`/api/room/maintenance/list`, data);
}

function* roomMaintList(action) {
  try {
    const result = yield call(roomMaintListAPI, action.data);

    yield put({
      type: ROOM_MAINT_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_MAINT_LIST_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomMaintCreateAPI(data) {
  return await axios.post(`/api/room/maintenance/create`, data);
}

function* roomMaintCreate(action) {
  try {
    const result = yield call(roomMaintCreateAPI, action.data);

    yield put({
      type: ROOM_MAINT_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_MAINT_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomMaintUpdateAPI(data) {
  return await axios.post(`/api/room/maintenance/update`, data);
}

function* roomMaintUpdate(action) {
  try {
    const result = yield call(roomMaintUpdateAPI, action.data);

    yield put({
      type: ROOM_MAINT_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_MAINT_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomMaintDeleteAPI(data) {
  return await axios.post(`/api/room/maintenance/delete`, data);
}

function* roomMaintDelete(action) {
  try {
    const result = yield call(roomMaintDeleteAPI, action.data);

    yield put({
      type: ROOM_MAINT_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_MAINT_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomDetailAPI(data) {
  return await axios.post(`/api/room/detail`, data);
}

function* roomDetail(action) {
  try {
    const result = yield call(roomDetailAPI, action.data);

    yield put({
      type: ROOM_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_DETAIL_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomTypeThumbnailAPI(data) {
  return await axios.post(`/api/room/image`, data);
}

function* roomTypeThumbnail(action) {
  try {
    const result = yield call(roomTypeThumbnailAPI, action.data);

    yield put({
      type: ROOM_TYPE_THUMBNAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_TYPE_THUMBNAIL_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomTypeImageAPI(data) {
  return await axios.post(`/api/room/image`, data);
}

function* roomTypeImage(action) {
  try {
    const result = yield call(roomTypeImageAPI, action.data);

    yield put({
      type: ROOM_TYPE_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_TYPE_IMAGE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomNowListAPI(data) {
  return await axios.post(`/api/room/roomNow/list`, data);
}

function* roomNowList(action) {
  try {
    const result = yield call(roomNowListAPI, action.data);

    yield put({
      type: ROOM_NOW_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_NOW_LIST_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomNowCreateAPI(data) {
  return await axios.post(`/api/room/roomNow/create`, data);
}

function* roomNowCreate(action) {
  try {
    const result = yield call(roomNowCreateAPI, action.data);

    yield put({
      type: ROOM_NOW_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_NOW_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function roomNowUpdateAPI(data) {
  return await axios.post(`/api/room/roomNow/isComplete`, data);
}

function* roomNowUpdate(action) {
  try {
    const result = yield call(roomNowUpdateAPI, action.data);

    yield put({
      type: ROOM_NOW_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_NOW_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchRoomList() {
  yield takeLatest(ROOM_LIST_REQUEST, roomList);
}
function* watchRoomAdminList() {
  yield takeLatest(ROOM_ADMIN_LIST_REQUEST, roomAdminList);
}
function* watchRoomCreate() {
  yield takeLatest(ROOM_CREATE_REQUEST, roomCreate);
}
function* watchRoomUpdate() {
  yield takeLatest(ROOM_UPDATE_REQUEST, roomUpdate);
}
function* watchRoomDelete() {
  yield takeLatest(ROOM_DELETE_REQUEST, roomDelete);
}
function* watchRoomUpload() {
  yield takeLatest(ROOM_UPLOAD_REQUEST, roomImg);
}

function* watchRoomTypeList() {
  yield takeLatest(ROOM_TYPE_LIST_REQUEST, roomTypeList);
}
function* watchRoomTypeCreate() {
  yield takeLatest(ROOM_TYPE_CREATE_REQUEST, roomTypeCreate);
}
function* watchRoomTypeUpdate() {
  yield takeLatest(ROOM_TYPE_UPDATE_REQUEST, roomTypeUpdate);
}
function* watchRoomTypeDelete() {
  yield takeLatest(ROOM_TYPE_DELETE_REQUEST, roomTypeDelete);
}

function* watchRoomOptionList() {
  yield takeLatest(ROOM_OPTION_LIST_REQUEST, roomOptionList);
}
function* watchRoomOptionCreate() {
  yield takeLatest(ROOM_OPTION_CREATE_REQUEST, roomOptionCreate);
}
function* watchRoomOptionUpdate() {
  yield takeLatest(ROOM_OPTION_UPDATE_REQUEST, roomOptionUpdate);
}
function* watchRoomOptionDelete() {
  yield takeLatest(ROOM_OPTION_DELETE_REQUEST, roomOptionDelete);
}

function* watchRoomBannerList() {
  yield takeLatest(ROOM_BANNER_LIST_REQUEST, roomBannerList);
}
function* watchRoomBannerCreate() {
  yield takeLatest(ROOM_BANNER_CREATE_REQUEST, roomBannerCreate);
}
function* watchRoomBannerUpdate() {
  yield takeLatest(ROOM_BANNER_UPDATE_REQUEST, roomBannerUpdate);
}
function* watchRoomBannerDelete() {
  yield takeLatest(ROOM_BANNER_DELETE_REQUEST, roomBannerDelete);
}

function* watchRoomInfraList() {
  yield takeLatest(ROOM_INFRA_LIST_REQUEST, roomInfraList);
}
function* watchRoomInfraCreate() {
  yield takeLatest(ROOM_INFRA_CREATE_REQUEST, roomInfraCreate);
}
function* watchRoomInfraUpdate() {
  yield takeLatest(ROOM_INFRA_UPDATE_REQUEST, roomInfraUpdate);
}
function* watchRoomInfraDelete() {
  yield takeLatest(ROOM_INFRA_DELETE_REQUEST, roomInfraDelete);
}

function* watchRoomMaintList() {
  yield takeLatest(ROOM_MAINT_LIST_REQUEST, roomMaintList);
}
function* watchRoomMaintCreate() {
  yield takeLatest(ROOM_MAINT_CREATE_REQUEST, roomMaintCreate);
}
function* watchRoomMaintUpdate() {
  yield takeLatest(ROOM_MAINT_UPDATE_REQUEST, roomMaintUpdate);
}
function* watchRoomMaintDelete() {
  yield takeLatest(ROOM_MAINT_DELETE_REQUEST, roomMaintDelete);
}

function* watchRoomDetail() {
  yield takeLatest(ROOM_DETAIL_REQUEST, roomDetail);
}

function* watchRoomTypeThumbnail() {
  yield takeLatest(ROOM_TYPE_THUMBNAIL_REQUEST, roomTypeThumbnail);
}

function* watchRoomTypeImage() {
  yield takeLatest(ROOM_TYPE_IMAGE_REQUEST, roomTypeImage);
}

function* watchRoomNowList() {
  yield takeLatest(ROOM_NOW_LIST_REQUEST, roomNowList);
}
function* watchRoomNowCreate() {
  yield takeLatest(ROOM_NOW_CREATE_REQUEST, roomNowCreate);
}
function* watchRoomNowUpdate() {
  yield takeLatest(ROOM_NOW_UPDATE_REQUEST, roomNowUpdate);
}

//////////////////////////////////////////////////////////////
export default function* roomSaga() {
  yield all([
    fork(watchRoomList),
    fork(watchRoomAdminList),
    fork(watchRoomCreate),
    fork(watchRoomUpdate),
    fork(watchRoomDelete),
    fork(watchRoomUpload),

    fork(watchRoomTypeList),
    fork(watchRoomTypeCreate),
    fork(watchRoomTypeUpdate),
    fork(watchRoomTypeDelete),

    fork(watchRoomOptionList),
    fork(watchRoomOptionCreate),
    fork(watchRoomOptionUpdate),
    fork(watchRoomOptionDelete),

    fork(watchRoomInfraList),
    fork(watchRoomInfraCreate),
    fork(watchRoomInfraUpdate),
    fork(watchRoomInfraDelete),

    fork(watchRoomBannerList),
    fork(watchRoomBannerCreate),
    fork(watchRoomBannerUpdate),
    fork(watchRoomBannerDelete),

    fork(watchRoomMaintList),
    fork(watchRoomMaintCreate),
    fork(watchRoomMaintUpdate),
    fork(watchRoomMaintDelete),

    fork(watchRoomDetail),

    fork(watchRoomTypeThumbnail),
    fork(watchRoomTypeImage),

    fork(watchRoomNowList),
    fork(watchRoomNowCreate),
    fork(watchRoomNowUpdate),
    //
  ]);
}
