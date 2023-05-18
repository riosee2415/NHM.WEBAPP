import produce from "../util/produce";

export const initailState = {
  roomList: [],
  roomAdminList: [],
  roomTypeList: [],
  roomLastPage: 1,
  roomOptionList: [],
  roomInfraList: [],
  roomMaintList: [],
  roomPath: null,
  roomTypeThumbnail: null,
  roomTypeImage: null,

  // 디테일
  roomDetail: null,
  bannerData: [],
  infraData: [],
  optionData: [],
  maintenanceData: [],

  roomNowList: [], // room now Admin

  //
  st_roomListLoading: false, // room 가져오기
  st_roomListDone: false,
  st_roomListError: null,
  //
  st_roomAdminListLoading: false, // room admin 가져오기
  st_roomAdminListDone: false,
  st_roomAdminListError: null,
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
  //
  //
  st_roomInfraListLoading: false, // roomInfra 가져오기
  st_roomInfraListDone: false,
  st_roomInfraListError: null,
  //
  st_roomInfraCreateLoading: false, // roomInfra 생성하기
  st_roomInfraCreateDone: false,
  st_roomInfraCreateError: null,
  //
  st_roomInfraUpdateLoading: false, // roomInfra 수정하기
  st_roomInfraUpdateDone: false,
  st_roomInfraUpdateError: null,
  //
  st_roomInfraDeleteLoading: false, // roomInfra 삭제하기
  st_roomInfraDeleteDone: false,
  st_roomInfraDeleteError: null,
  //
  //
  st_roomMaintListLoading: false, // roomMaint 가져오기
  st_roomMaintListDone: false,
  st_roomMaintListError: null,
  //
  st_roomMaintCreateLoading: false, // roomMaint 생성하기
  st_roomMaintCreateDone: false,
  st_roomMaintCreateError: null,
  //
  st_roomMaintUpdateLoading: false, // roomMaint 수정하기
  st_roomMaintUpdateDone: false,
  st_roomMaintUpdateError: null,
  //
  st_roomMaintDeleteLoading: false, // roomMaint 삭제하기
  st_roomMaintDeleteDone: false,
  st_roomMaintDeleteError: null,
  //
  //
  st_roomDetailLoading: false, // room detail 가져오기
  st_roomDetailDone: false,
  st_roomDetailError: null,
  //
  st_roomTypeThumbnailLoading: false,
  st_roomTypeThumbnailDone: false,
  st_roomTypeThumbnailError: null,
  //
  st_roomTypeImageLoading: false,
  st_roomTypeImageDone: false,
  st_roomTypeImageError: null,
  //
  //
  st_roomNowListLoading: false, // roomNow 가져오기
  st_roomNowListDone: false,
  st_roomNowListError: null,
  //
  st_roomNowCreateLoading: false, // roomNow 생성하기
  st_roomNowCreateDone: false,
  st_roomNowCreateError: null,
  //
  st_roomNowUpdateLoading: false, // roomNow 수정하기
  st_roomNowUpdateDone: false,
  st_roomNowUpdateError: null,

  //
};

export const ROOM_LIST_REQUEST = "ROOM_LIST_REQUEST";
export const ROOM_LIST_SUCCESS = "ROOM_LIST_SUCCESS";
export const ROOM_LIST_FAILURE = "ROOM_LIST_FAILURE";

export const ROOM_ADMIN_LIST_REQUEST = "ROOM_ADMIN_LIST_REQUEST";
export const ROOM_ADMIN_LIST_SUCCESS = "ROOM_ADMIN_LIST_SUCCESS";
export const ROOM_ADMIN_LIST_FAILURE = "ROOM_ADMIN_LIST_FAILURE";

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
//
//
export const ROOM_INFRA_LIST_REQUEST = "ROOM_INFRA_LIST_REQUEST";
export const ROOM_INFRA_LIST_SUCCESS = "ROOM_INFRA_LIST_SUCCESS";
export const ROOM_INFRA_LIST_FAILURE = "ROOM_INFRA_LIST_FAILURE";

export const ROOM_INFRA_CREATE_REQUEST = "ROOM_INFRA_CREATE_REQUEST";
export const ROOM_INFRA_CREATE_SUCCESS = "ROOM_INFRA_CREATE_SUCCESS";
export const ROOM_INFRA_CREATE_FAILURE = "ROOM_INFRA_CREATE_FAILURE";

export const ROOM_INFRA_UPDATE_REQUEST = "ROOM_INFRA_UPDATE_REQUEST";
export const ROOM_INFRA_UPDATE_SUCCESS = "ROOM_INFRA_UPDATE_SUCCESS";
export const ROOM_INFRA_UPDATE_FAILURE = "ROOM_INFRA_UPDATE_FAILURE";

export const ROOM_INFRA_DELETE_REQUEST = "ROOM_INFRA_DELETE_REQUEST";
export const ROOM_INFRA_DELETE_SUCCESS = "ROOM_INFRA_DELETE_SUCCESS";
export const ROOM_INFRA_DELETE_FAILURE = "ROOM_INFRA_DELETE_FAILURE";
//
//
export const ROOM_MAINT_LIST_REQUEST = "ROOM_MAINT_LIST_REQUEST";
export const ROOM_MAINT_LIST_SUCCESS = "ROOM_MAINT_LIST_SUCCESS";
export const ROOM_MAINT_LIST_FAILURE = "ROOM_MAINT_LIST_FAILURE";

export const ROOM_MAINT_CREATE_REQUEST = "ROOM_MAINT_CREATE_REQUEST";
export const ROOM_MAINT_CREATE_SUCCESS = "ROOM_MAINT_CREATE_SUCCESS";
export const ROOM_MAINT_CREATE_FAILURE = "ROOM_MAINT_CREATE_FAILURE";

export const ROOM_MAINT_UPDATE_REQUEST = "ROOM_MAINT_UPDATE_REQUEST";
export const ROOM_MAINT_UPDATE_SUCCESS = "ROOM_MAINT_UPDATE_SUCCESS";
export const ROOM_MAINT_UPDATE_FAILURE = "ROOM_MAINT_UPDATE_FAILURE";

export const ROOM_MAINT_DELETE_REQUEST = "ROOM_MAINT_DELETE_REQUEST";
export const ROOM_MAINT_DELETE_SUCCESS = "ROOM_MAINT_DELETE_SUCCESS";
export const ROOM_MAINT_DELETE_FAILURE = "ROOM_MAINT_DELETE_FAILURE";
//
//
export const ROOM_DETAIL_REQUEST = "ROOM_DETAIL_REQUEST";
export const ROOM_DETAIL_SUCCESS = "ROOM_DETAIL_SUCCESS";
export const ROOM_DETAIL_FAILURE = "ROOM_DETAIL_FAILURE";

export const ROOM_TYPE_THUMBNAIL_REQUEST = "ROOM_TYPE_THUMBNAIL_REQUEST";
export const ROOM_TYPE_THUMBNAIL_SUCCESS = "ROOM_TYPE_THUMBNAIL_SUCCESS";
export const ROOM_TYPE_THUMBNAIL_FAILURE = "ROOM_TYPE_THUMBNAIL_FAILURE";

export const ROOM_TYPE_IMAGE_REQUEST = "ROOM_TYPE_IMAGE_REQUEST";
export const ROOM_TYPE_IMAGE_SUCCESS = "ROOM_TYPE_IMAGE_SUCCESS";
export const ROOM_TYPE_IMAGE_FAILURE = "ROOM_TYPE_IMAGE_FAILURE";
//
//
export const ROOM_NOW_LIST_REQUEST = "ROOM_NOW_LIST_REQUEST";
export const ROOM_NOW_LIST_SUCCESS = "ROOM_NOW_LIST_SUCCESS";
export const ROOM_NOW_LIST_FAILURE = "ROOM_NOW_LIST_FAILURE";

export const ROOM_NOW_CREATE_REQUEST = "ROOM_NOW_CREATE_REQUEST";
export const ROOM_NOW_CREATE_SUCCESS = "ROOM_NOW_CREATE_SUCCESS";
export const ROOM_NOW_CREATE_FAILURE = "ROOM_NOW_CREATE_FAILURE";

export const ROOM_NOW_UPDATE_REQUEST = "ROOM_NOW_UPDATE_REQUEST";
export const ROOM_NOW_UPDATE_SUCCESS = "ROOM_NOW_UPDATE_SUCCESS";
export const ROOM_NOW_UPDATE_FAILURE = "ROOM_NOW_UPDATE_FAILURE";
//

export const ROOM_IMAGE_RESET = "ROOM_IMAGE_RESET";

export const ROOM_TYPE_IMAGE_RESET = "ROOM_TYPE_IMAGE_RESET";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ROOM_ADMIN_LIST_REQUEST: {
        draft.st_roomAdminListLoading = true;
        draft.st_roomAdminListDone = false;
        draft.st_roomAdminListError = null;
        break;
      }
      case ROOM_ADMIN_LIST_SUCCESS: {
        draft.st_roomAdminListLoading = false;
        draft.st_roomAdminListDone = true;
        draft.st_roomAdminListError = null;
        draft.roomAdminList = action.data;
        break;
      }
      case ROOM_ADMIN_LIST_FAILURE: {
        draft.st_roomAdminListLoading = false;
        draft.st_roomAdminListDone = false;
        draft.st_roomAdminListError = action.error;
        break;
      }

      //////////////////////////////////////////////
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
        draft.roomList = action.data.rooms;
        draft.roomLastPage = action.data.lastPage;
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
      //////////////////////////////////////////////
      //////////////////////////////////////////////

      case ROOM_INFRA_LIST_REQUEST: {
        draft.st_roomInfraListLoading = true;
        draft.st_roomInfraListDone = false;
        draft.st_roomInfraListError = null;
        break;
      }
      case ROOM_INFRA_LIST_SUCCESS: {
        draft.st_roomInfraListLoading = false;
        draft.st_roomInfraListDone = true;
        draft.st_roomInfraListError = null;
        draft.roomInfraList = action.data;
        break;
      }
      case ROOM_INFRA_LIST_FAILURE: {
        draft.st_roomInfraListLoading = false;
        draft.st_roomInfraListDone = false;
        draft.st_roomInfraListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ROOM_INFRA_CREATE_REQUEST: {
        draft.st_roomInfraCreateLoading = true;
        draft.st_roomInfraCreateDone = false;
        draft.st_roomInfraCreateError = null;
        break;
      }
      case ROOM_INFRA_CREATE_SUCCESS: {
        draft.st_roomInfraCreateLoading = false;
        draft.st_roomInfraCreateDone = true;
        draft.st_roomInfraCreateError = null;
        break;
      }
      case ROOM_INFRA_CREATE_FAILURE: {
        draft.st_roomInfraCreateLoading = false;
        draft.st_roomInfraCreateDone = false;
        draft.st_roomInfraCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ROOM_INFRA_UPDATE_REQUEST: {
        draft.st_roomInfraUpdateLoading = true;
        draft.st_roomInfraUpdateDone = false;
        draft.st_roomInfraUpdateError = null;
        break;
      }
      case ROOM_INFRA_UPDATE_SUCCESS: {
        draft.st_roomInfraUpdateLoading = false;
        draft.st_roomInfraUpdateDone = true;
        draft.st_roomInfraUpdateError = null;
        break;
      }
      case ROOM_INFRA_UPDATE_FAILURE: {
        draft.st_roomInfraUpdateLoading = false;
        draft.st_roomInfraUpdateDone = false;
        draft.st_roomInfraUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ROOM_INFRA_DELETE_REQUEST: {
        draft.st_roomInfraDeleteLoading = true;
        draft.st_roomInfraDeleteDone = false;
        draft.st_roomInfraDeleteError = null;
        break;
      }
      case ROOM_INFRA_DELETE_SUCCESS: {
        draft.st_roomInfraDeleteLoading = false;
        draft.st_roomInfraDeleteDone = true;
        draft.st_roomInfraDeleteError = null;
        break;
      }
      case ROOM_INFRA_DELETE_FAILURE: {
        draft.st_roomInfraDeleteLoading = false;
        draft.st_roomInfraDeleteDone = false;
        draft.st_roomInfraDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////
      //////////////////////////////////////////////
      //////////////////////////////////////////////

      case ROOM_MAINT_LIST_REQUEST: {
        draft.st_roomMaintListLoading = true;
        draft.st_roomMaintListDone = false;
        draft.st_roomMaintListError = null;
        break;
      }
      case ROOM_MAINT_LIST_SUCCESS: {
        draft.st_roomMaintListLoading = false;
        draft.st_roomMaintListDone = true;
        draft.st_roomMaintListError = null;
        draft.roomMaintList = action.data;
        break;
      }
      case ROOM_MAINT_LIST_FAILURE: {
        draft.st_roomMaintListLoading = false;
        draft.st_roomMaintListDone = false;
        draft.st_roomMaintListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ROOM_MAINT_CREATE_REQUEST: {
        draft.st_roomMaintCreateLoading = true;
        draft.st_roomMaintCreateDone = false;
        draft.st_roomMaintCreateError = null;
        break;
      }
      case ROOM_MAINT_CREATE_SUCCESS: {
        draft.st_roomMaintCreateLoading = false;
        draft.st_roomMaintCreateDone = true;
        draft.st_roomMaintCreateError = null;
        break;
      }
      case ROOM_MAINT_CREATE_FAILURE: {
        draft.st_roomMaintCreateLoading = false;
        draft.st_roomMaintCreateDone = false;
        draft.st_roomMaintCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ROOM_MAINT_UPDATE_REQUEST: {
        draft.st_roomMaintUpdateLoading = true;
        draft.st_roomMaintUpdateDone = false;
        draft.st_roomMaintUpdateError = null;
        break;
      }
      case ROOM_MAINT_UPDATE_SUCCESS: {
        draft.st_roomMaintUpdateLoading = false;
        draft.st_roomMaintUpdateDone = true;
        draft.st_roomMaintUpdateError = null;
        break;
      }
      case ROOM_MAINT_UPDATE_FAILURE: {
        draft.st_roomMaintUpdateLoading = false;
        draft.st_roomMaintUpdateDone = false;
        draft.st_roomMaintUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ROOM_MAINT_DELETE_REQUEST: {
        draft.st_roomMaintDeleteLoading = true;
        draft.st_roomMaintDeleteDone = false;
        draft.st_roomMaintDeleteError = null;
        break;
      }
      case ROOM_MAINT_DELETE_SUCCESS: {
        draft.st_roomMaintDeleteLoading = false;
        draft.st_roomMaintDeleteDone = true;
        draft.st_roomMaintDeleteError = null;
        break;
      }
      case ROOM_MAINT_DELETE_FAILURE: {
        draft.st_roomMaintDeleteLoading = false;
        draft.st_roomMaintDeleteDone = false;
        draft.st_roomMaintDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ROOM_DETAIL_REQUEST: {
        draft.st_roomDetailLoading = true;
        draft.st_roomDetailDone = false;
        draft.st_roomDetailError = null;
        break;
      }
      case ROOM_DETAIL_SUCCESS: {
        draft.st_roomDetailLoading = false;
        draft.st_roomDetailDone = true;
        draft.st_roomDetailError = null;
        draft.roomDetail = action.data.room;
        draft.bannerData = action.data.bannerData;
        draft.infraData = action.data.infraData;
        draft.optionData = action.data.optionData;
        draft.maintenanceData = action.data.maintenanceData;
        break;
      }
      case ROOM_DETAIL_FAILURE: {
        draft.st_roomDetailLoading = false;
        draft.st_roomDetailDone = false;
        draft.st_roomDetailError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ROOM_TYPE_THUMBNAIL_REQUEST: {
        draft.st_roomTypeThumbnailLoading = true;
        draft.st_roomTypeThumbnailDone = false;
        draft.st_roomTypeThumbnailError = null;
        break;
      }
      case ROOM_TYPE_THUMBNAIL_SUCCESS: {
        draft.st_roomTypeThumbnailLoading = false;
        draft.st_roomTypeThumbnailDone = true;
        draft.st_roomTypeThumbnailError = null;
        draft.roomTypeThumbnail = action.data.path;
        break;
      }
      case ROOM_TYPE_THUMBNAIL_FAILURE: {
        draft.st_roomTypeThumbnailLoading = false;
        draft.st_roomTypeThumbnailDone = false;
        draft.st_roomTypeThumbnailError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ROOM_TYPE_IMAGE_REQUEST: {
        draft.st_roomTypeImageLoading = true;
        draft.st_roomTypeImageDone = false;
        draft.st_roomTypeImageError = null;
        break;
      }
      case ROOM_TYPE_IMAGE_SUCCESS: {
        draft.st_roomTypeImageLoading = false;
        draft.st_roomTypeImageDone = true;
        draft.st_roomTypeImageError = null;
        draft.roomTypeImage = action.data.path;
        break;
      }
      case ROOM_TYPE_IMAGE_FAILURE: {
        draft.st_roomTypeImageLoading = false;
        draft.st_roomTypeImageDone = false;
        draft.st_roomTypeImageError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ROOM_NOW_LIST_REQUEST: {
        draft.st_roomNowListLoading = true;
        draft.st_roomNowListDone = false;
        draft.st_roomNowListError = null;
        break;
      }
      case ROOM_NOW_LIST_SUCCESS: {
        draft.st_roomNowListLoading = false;
        draft.st_roomNowListDone = true;
        draft.st_roomNowListError = null;
        draft.roomNowList = action.data;
        break;
      }
      case ROOM_NOW_LIST_FAILURE: {
        draft.st_roomNowListLoading = false;
        draft.st_roomNowListDone = false;
        draft.st_roomNowListError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case ROOM_NOW_CREATE_REQUEST: {
        draft.st_roomNowCreateLoading = true;
        draft.st_roomNowCreateDone = false;
        draft.st_roomNowCreateError = null;
        break;
      }
      case ROOM_NOW_CREATE_SUCCESS: {
        draft.st_roomNowCreateLoading = false;
        draft.st_roomNowCreateDone = true;
        draft.st_roomNowCreateError = null;
        break;
      }
      case ROOM_NOW_CREATE_FAILURE: {
        draft.st_roomNowCreateLoading = false;
        draft.st_roomNowCreateDone = false;
        draft.st_roomNowCreateError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case ROOM_NOW_UPDATE_REQUEST: {
        draft.st_roomNowUpdateLoading = true;
        draft.st_roomNowUpdateDone = false;
        draft.st_roomNowUpdateError = null;
        break;
      }
      case ROOM_NOW_UPDATE_SUCCESS: {
        draft.st_roomNowUpdateLoading = false;
        draft.st_roomNowUpdateDone = true;
        draft.st_roomNowUpdateError = null;
        break;
      }
      case ROOM_NOW_UPDATE_FAILURE: {
        draft.st_roomNowUpdateLoading = false;
        draft.st_roomNowUpdateDone = false;
        draft.st_roomNowUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ROOM_IMAGE_RESET: {
        draft.roomPath = action.data.roomPath;
        break;
      }

      //////////////////////////////////////////////

      case ROOM_TYPE_IMAGE_RESET: {
        draft.roomTypeThumbnail = action.data.roomTypeThumbnail;
        draft.roomTypeImage = action.data.roomTypeImage;
        break;
      }

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
