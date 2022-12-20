import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopBarberHomeService,
  getAllBarbers,
  saveDetailBarberService,
  getAllServiceBarber,
  getAllBranching,
} from "../../services/userService";
import { toast } from "react-toastify";
//code chuan redux :start, doing, end
//Gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (e) {
      dispatch(fetchGenderFail());
      console.log("fetchStart error", e);
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAIL,
});
//Position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (e) {
      dispatch(fetchPositionFail());
      console.log("fetchStart error", e);
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFail = () => ({
  type: actionTypes.FETCH_POSITION_FAIL,
});
//Role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (e) {
      dispatch(fetchRoleFail());
      console.log("fetchStart error", e);
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAIL,
});
//CRUD redux
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);

      if (res && res.errCode === 0) {
        toast.success("Tạo người dùng mới thành công!");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        dispatch(saveUserFail());
      }
    } catch (e) {
      dispatch(saveUserFail());
      console.log("createNewUser error", e);
    }
  };
};
export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFail = () => ({
  type: actionTypes.CREATE_USER_FAIL,
});
export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");

      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        toast.error("Fetch all user error!");
        dispatch(fetchAllUserFail());
      }
    } catch (e) {
      toast.error("Fetch all user error!");
      dispatch(fetchAllUserFail());
      console.log("fetchStart error", e);
    }
  };
};

export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});
export const fetchAllUserFail = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAIL,
});
export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        dispatch(deleteUserFail());
      } else {
        toast.success("Đã xóa người dùng!");
        dispatch(fetchAllUserStart());
        dispatch(deleteUserSuccess());
      }
    } catch (e) {
      toast.error("Lỗi xóa người dùng!");
      dispatch(deleteUserFail());
      console.log("Delete a user error!", e);
    }
  };
};
export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFail = () => ({
  type: actionTypes.DELETE_USER_FAIL,
});
export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Đã cập nhập người dùng thành công!");
        dispatch(fetchAllUserStart());
        dispatch(editUserSuccess());
      } else {
        toast.error("Lỗi cập nhập người dùng!");
        dispatch(editUserFail());
      }
    } catch (e) {
      toast.error("Lỗi cập nhập người dùng!");
      dispatch(editUserFail());
      console.log("Update a user error!", e);
    }
  };
};
export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFail = () => ({
  type: actionTypes.EDIT_USER_FAIL,
});
export const fetchTopBarber = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopBarberHomeService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_BARBER_SUCCESS,
          dataBarber: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_BARBER_FAIL,
        });
      }
    } catch (e) {
      console.log("Fail", e);
      dispatch({
        type: actionTypes.FETCH_TOP_BARBER_FAIL,
      });
    }
  };
};
export const fetchAllBarbers = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllBarbers("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_BARBER_SUCCESS,
          dataBarbers: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_BARBER_FAIL,
        });
      }
    } catch (e) {
      console.log("Fail", e);
      dispatch({
        type: actionTypes.FETCH_ALL_BARBER_FAIL,
      });
    }
  };
};
export const saveDetailBarber = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailBarberService(data);
      console.log(data);
      if (res && res.errCode === 0) {
        toast.success("Lưu thay đổi thành công!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_BARBER_SUCCESS,
        });
      } else {
        toast.error("Lỗi! Lưu thay đổi không thành công!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_BARBER_FAIL,
        });
      }
    } catch (e) {
      toast.error("Lỗi! Lưu thay đổi không thành công!");
      console.log("Fail", e);
      dispatch({
        type: actionTypes.SAVE_DETAIL_BARBER_FAIL,
      });
    }
  };
};
export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL,
        });
      }
    } catch (e) {
      console.log("Fail", e);
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL,
      });
    }
  };
};

export const getRequiredBarberInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_REQUIRED_BARBER_INFOR_START,
      });
      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      let resServiceBarber = await getAllServiceBarber();
      let resBranching = await getAllBranching();
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resServiceBarber &&
        resServiceBarber.errCode === 0 &&
        resBranching &&
        resBranching.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resServiceBarber: resServiceBarber.data,
          resBranching: resBranching.data,
        };
        dispatch(fetchRequiredBarberInforSuccess(data));
      } else {
        dispatch(fetchRequiredBarberInforFail());
      }
    } catch (e) {
      dispatch(fetchRequiredBarberInforFail());
      console.log("fetch Barber Infor error", e);
    }
  };
};
export const fetchRequiredBarberInforSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_BARBER_INFOR_SUCCESS,
  data: allRequiredData,
});
export const fetchRequiredBarberInforFail = () => ({
  type: actionTypes.FETCH_REQUIRED_BARBER_INFOR_FAIL,
});
