import produce from "../util/produce";

export const initailState = {
  roomList: [],
  roomTypeList: [],
  roomOptionList: [],
  roomPath: null,

  //
  st_roomListLoading: false, // room 가져오기
  st_roomListDone: false,
  st_roomListError: null,
  //
  st_roomCreateLoading: false, // room 생성하기
  st_roomCreateDone: false,
  st_roomCreateError: null,
  //
  st_roomUpdateLoading: false, // room 수정하기
  st_roomUpdateDone: false,
  st_roomUpdateError: null,
  //
  st_roomDeleteLoading: false, // room 삭제하기
  st_roomDeleteDone: false,
  st_roomDeleteError: null,
  //
  st_roomUploadLoading: false, // room 이미지 등록
  st_roomUploadDone: false,
  st_roomUploadError: null,
  //
  //
  st_roomTypeListLoading: false, // roomType 가져오기
  st_roomTypeListDone: false,
  st_roomTypeListError: null,
  //
  st_roomTypeCreateLoading: false, // roomType 생성하기
  st_roomTypeCreateDone: false,
  st_roomTypeCreateError: null,
  //
  st_roomTypeUpdateLoading: false, // roomType 수정하기
  st_roomTypeUpdateDone: false,
  st_roomTypeUpdateError: null,
  //
  st_roomTypeDeleteLoading: false, // roomType 삭제하기
  st_roomTypeDeleteDone: false,
  st_roomTypeDeleteError: null,
  //
  //
  st_roomOptionListLoading: false, // roomOption 가져오기
  st_roomOptionListDone: false,
  st_roomOptionListError: null,
  //
  st_roomOptionCreateLoading: false, // roomOption 생성하기
  st_roomOptionCreateDone: false,
  st_roomOptionCreateError: null,
  //
  st_roomOptionUpdateLoading: false, // roomOption 수정하기
  st_roomOptionUpdateDone: false,
  st_roomOptionUpdateError: null,
  //
  st_roomOptionDeleteLoading: false, // roomOption 삭제하기
  st_roomOptionDeleteDone: false,
  st_roomOptionDeleteError: null,
};

export const ROOM_LIST_REQUEST = "ROOM_LIST_REQUEST";
export const ROOM_LIST_SUCCESS = "ROOM_LIST_SUCCESS";
export const ROOM_LIST_FAILURE = "ROOM_LIST_FAILURE";

export const ROOM_CREATE_REQUEST = "ROOM_CREATE_REQUEST";
export const ROOM_CREATE_SUCCESS = "ROOM_CREATE_SUCCESS";
export const ROOM_CREATE_FAILURE = "ROOM_CREATE_FAILURE";

export const ROOM_UPDATE_REQUEST = "ROOM_UPDATE_REQUEST";
export const ROOM_UPDATE_SUCCESS = "ROOM_UPDATE_SUCCESS";
export const ROOM_UPDATE_FAILURE = "ROOM_UPDATE_FAILURE";

export const ROOM_DELETE_REQUEST = "ROOM_DELETE_REQUEST";
export const ROOM_DELETE_SUCCESS = "ROOM_DELETE_SUCCESS";
export const ROOM_DELETE_FAILURE = "ROOM_DELETE_FAILURE";

export const ROOM_UPLOAD_REQUEST = "ROOM_UPLOAD_REQUEST";
export const ROOM_UPLOAD_SUCCESS = "ROOM_UPLOAD_SUCCESS";
export const ROOM_UPLOAD_FAILURE = "ROOM_UPLOAD_FAILURE";
//
//
export const ROOM_TYPE_LIST_REQUEST = "ROOM_TYPE_LIST_REQUEST";
export const ROOM_TYPE_LIST_SUCCESS = "ROOM_TYPE_LIST_SUCCESS";
export const ROOM_TYPE_LIST_FAILURE = "ROOM_TYPE_LIST_FAILURE";

export const ROOM_TYPE_CREATE_REQUEST = "ROOM_TYPE_CREATE_REQUEST";
export const ROOM_TYPE_CREATE_SUCCESS = "ROOM_TYPE_CREATE_SUCCESS";
export const ROOM_TYPE_CREATE_FAILURE = "ROOM_TYPE_CREATE_FAILURE";

export const ROOM_TYPE_UPDATE_REQUEST = "ROOM_TYPE_UPDATE_REQUEST";
export const ROOM_TYPE_UPDATE_SUCCESS = "ROOM_TYPE_UPDATE_SUCCESS";
export const ROOM_TYPE_UPDATE_FAILURE = "ROOM_TYPE_UPDATE_FAILURE";

export const ROOM_TYPE_DELETE_REQUEST = "ROOM_TYPE_DELETE_REQUEST";
export const ROOM_TYPE_DELETE_SUCCESS = "ROOM_TYPE_DELETE_SUCCESS";
export const ROOM_TYPE_DELETE_FAILURE = "ROOM_TYPE_DELETE_FAILURE";
//
//
export const ROOM_OPTION_LIST_REQUEST = "ROOM_OPTION_LIST_REQUEST";
export const ROOM_OPTION_LIST_SUCCESS = "ROOM_OPTION_LIST_SUCCESS";
export const ROOM_OPTION_LIST_FAILURE = "ROOM_OPTION_LIST_FAILURE";

export const ROOM_OPTION_CREATE_REQUEST = "ROOM_OPTION_CREATE_REQUEST";
export const ROOM_OPTION_CREATE_SUCCESS = "ROOM_OPTION_CREATE_SUCCESS";
export const ROOM_OPTION_CREATE_FAILURE = "ROOM_OPTION_CREATE_FAILURE";

export const ROOM_OPTION_UPDATE_REQUEST = "ROOM_OPTION_UPDATE_REQUEST";
export const ROOM_OPTION_UPDATE_SUCCESS = "ROOM_OPTION_UPDATE_SUCCESS";
export const ROOM_OPTION_UPDATE_FAILURE = "ROOM_OPTION_UPDATE_FAILURE";

export const ROOM_OPTION_DELETE_REQUEST = "ROOM_OPTION_DELETE_REQUEST";
export const ROOM_OPTION_DELETE_SUCCESS = "ROOM_OPTION_DELETE_SUCCESS";
export const ROOM_OPTION_DELETE_FAILURE = "ROOM_OPTION_DELETE_FAILURE";

export const ROOM_IMAGE_RESET = "ROOM_IMAGE_RESET";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ROOM_LIST_REQUEST: {
        draft.st_roomListLoading = true;
        draft.st_roomListDone = false;
        draft.st_roomListError = null;
        break;
      }
      case ROOM_LIST_SUCCESS: {
        draft.st_roomListLoading = false;
        draft.st_roomListDone = true;
        draft.st_roomListError = null;
        draft.roomList = action.data;
        break;
      }
      case ROOM_LIST_FAILURE: {
        draft.st_roomListLoading = false;
        draft.st_roomListDone = false;
        draft.st_roomListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ROOM_CREATE_REQUEST: {
        draft.st_roomCreateLoading = true;
        draft.st_roomCreateDone = false;
        draft.st_roomCreateError = null;
        break;
      }
      case ROOM_CREATE_SUCCESS: {
        draft.st_roomCreateLoading = false;
        draft.st_roomCreateDone = true;
        draft.st_roomCreateError = null;
        break;
      }
      case ROOM_CREATE_FAILURE: {
        draft.st_roomCreateLoading = false;
        draft.st_roomCreateDone = false;
        draft.st_roomCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ROOM_UPDATE_REQUEST: {
        draft.st_roomUpdateLoading = true;
        draft.st_roomUpdateDone = false;
        draft.st_roomUpdateError = null;
        break;
      }
      case ROOM_UPDATE_SUCCESS: {
        draft.st_roomUpdateLoading = false;
        draft.st_roomUpdateDone = true;
        draft.st_roomUpdateError = null;
        break;
      }
      case ROOM_UPDATE_FAILURE: {
        draft.st_roomUpdateLoading = false;
        draft.st_roomUpdateDone = false;
        draft.st_roomUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ROOM_DELETE_REQUEST: {
        draft.st_roomDeleteLoading = true;
        draft.st_roomDeleteDone = false;
        draft.st_roomDeleteError = null;
        break;
      }
      case ROOM_DELETE_SUCCESS: {
        draft.st_roomDeleteLoading = false;
        draft.st_roomDeleteDone = true;
        draft.st_roomDeleteError = null;
        break;
      }
      case ROOM_DELETE_FAILURE: {
        draft.st_roomDeleteLoading = false;
        draft.st_roomDeleteDone = false;
        draft.st_roomDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ROOM_UPLOAD_REQUEST: {
        draft.st_roomUploadLoading = true;
        draft.st_roomUploadDone = false;
        draft.st_roomUploadError = null;
        break;
      }
      case ROOM_UPLOAD_SUCCESS: {
        draft.st_roomUploadLoading = false;
        draft.st_roomUploadDone = true;
        draft.st_roomUploadError = null;
        draft.roomPath = action.data.path;
        break;
      }
      case ROOM_UPLOAD_FAILURE: {
        draft.st_roomUploadLoading = false;
        draft.st_roomUploadDone = false;
        draft.st_roomUploadError = action.error;
        break;
      }

      //////////////////////////////////////////////
      //////////////////////////////////////////////
      //////////////////////////////////////////////

      case ROOM_TYPE_LIST_REQUEST: {
        draft.st_roomTypeListLoading = true;
        draft.st_roomTypeListDone = false;
        draft.st_roomTypeListError = null;
        break;
      }
      case ROOM_TYPE_LIST_SUCCESS: {
        draft.st_roomTypeListLoading = false;
        draft.st_roomTypeListDone = true;
        draft.st_roomTypeListError = null;
        draft.roomTypeList = action.data;
        break;
      }
      case ROOM_TYPE_LIST_FAILURE: {
        draft.st_roomTypeListLoading = false;
        draft.st_roomTypeListDone = false;
        draft.st_roomTypeListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ROOM_TYPE_CREATE_REQUEST: {
        draft.st_roomTypeCreateLoading = true;
        draft.st_roomTypeCreateDone = false;
        draft.st_roomTypeCreateError = null;
        break;
      }
      case ROOM_TYPE_CREATE_SUCCESS: {
        draft.st_roomTypeCreateLoading = false;
        draft.st_roomTypeCreateDone = true;
        draft.st_roomTypeCreateError = null;
        break;
      }
      case ROOM_TYPE_CREATE_FAILURE: {
        draft.st_roomTypeCreateLoading = false;
        draft.st_roomTypeCreateDone = false;
        draft.st_roomTypeCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ROOM_TYPE_UPDATE_REQUEST: {
        draft.st_roomTypeUpdateLoading = true;
        draft.st_roomTypeUpdateDone = false;
        draft.st_roomTypeUpdateError = null;
        break;
      }
      case ROOM_TYPE_UPDATE_SUCCESS: {
        draft.st_roomTypeUpdateLoading = false;
        draft.st_roomTypeUpdateDone = true;
        draft.st_roomTypeUpdateError = null;
        break;
      }
      case ROOM_TYPE_UPDATE_FAILURE: {
        draft.st_roomTypeUpdateLoading = false;
        draft.st_roomTypeUpdateDone = false;
        draft.st_roomTypeUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ROOM_TYPE_DELETE_REQUEST: {
        draft.st_roomTypeDeleteLoading = true;
        draft.st_roomTypeDeleteDone = false;
        draft.st_roomTypeDeleteError = null;
        break;
      }
      case ROOM_TYPE_DELETE_SUCCESS: {
        draft.st_roomTypeDeleteLoading = false;
        draft.st_roomTypeDeleteDone = true;
        draft.st_roomTypeDeleteError = null;
        break;
      }
      case ROOM_TYPE_DELETE_FAILURE: {
        draft.st_roomTypeDeleteLoading = false;
        draft.st_roomTypeDeleteDone = false;
        draft.st_roomTypeDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////
      //////////////////////////////////////////////
      //////////////////////////////////////////////

      case ROOM_OPTION_LIST_REQUEST: {
        draft.st_roomOptionListLoading = true;
        draft.st_roomOptionListDone = false;
        draft.st_roomOptionListError = null;
        break;
      }
      case ROOM_OPTION_LIST_SUCCESS: {
        draft.st_roomOptionListLoading = false;
        draft.st_roomOptionListDone = true;
        draft.st_roomOptionListError = null;
        draft.roomOptionList = action.data;
        break;
      }
      case ROOM_OPTION_LIST_FAILURE: {
        draft.st_roomOptionListLoading = false;
        draft.st_roomOptionListDone = false;
        draft.st_roomOptionListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ROOM_OPTION_CREATE_REQUEST: {
        draft.st_roomOptionCreateLoading = true;
        draft.st_roomOptionCreateDone = false;
        draft.st_roomOptionCreateError = null;
        break;
      }
      case ROOM_OPTION_CREATE_SUCCESS: {
        draft.st_roomOptionCreateLoading = false;
        draft.st_roomOptionCreateDone = true;
        draft.st_roomOptionCreateError = null;
        break;
      }
      case ROOM_OPTION_CREATE_FAILURE: {
        draft.st_roomOptionCreateLoading = false;
        draft.st_roomOptionCreateDone = false;
        draft.st_roomOptionCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ROOM_OPTION_UPDATE_REQUEST: {
        draft.st_roomOptionUpdateLoading = true;
        draft.st_roomOptionUpdateDone = false;
        draft.st_roomOptionUpdateError = null;
        break;
      }
      case ROOM_OPTION_UPDATE_SUCCESS: {
        draft.st_roomOptionUpdateLoading = false;
        draft.st_roomOptionUpdateDone = true;
        draft.st_roomOptionUpdateError = null;
        break;
      }
      case ROOM_OPTION_UPDATE_FAILURE: {
        draft.st_roomOptionUpdateLoading = false;
        draft.st_roomOptionUpdateDone = false;
        draft.st_roomOptionUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ROOM_OPTION_DELETE_REQUEST: {
        draft.st_roomOptionDeleteLoading = true;
        draft.st_roomOptionDeleteDone = false;
        draft.st_roomOptionDeleteError = null;
        break;
      }
      case ROOM_OPTION_DELETE_SUCCESS: {
        draft.st_roomOptionDeleteLoading = false;
        draft.st_roomOptionDeleteDone = true;
        draft.st_roomOptionDeleteError = null;
        break;
      }
      case ROOM_OPTION_DELETE_FAILURE: {
        draft.st_roomOptionDeleteLoading = false;
        draft.st_roomOptionDeleteDone = false;
        draft.st_roomOptionDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ROOM_IMAGE_RESET: {
        draft.roomPath = null;
        break;
      }

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
