import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  ROOM_LIST_REQUEST,
  ROOM_LIST_SUCCESS,
  ROOM_LIST_FAILURE,
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

//////////////////////////////////////////////////////////////
function* watchRoomList() {
  yield takeLatest(ROOM_LIST_REQUEST, roomList);
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

//////////////////////////////////////////////////////////////
export default function* roomSaga() {
  yield all([
    fork(watchRoomList),
    fork(watchRoomCreate),
    fork(watchRoomUpdate),
    fork(watchRoomDelete),
    fork(watchRoomUpload),

    //
  ]);
}
