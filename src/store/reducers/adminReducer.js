import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topBarber: [],
  allBarbers: [],
  allScheduleTime: [],

  allRequiredBarberInfor: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadingGender = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAIL:
      state.isLoadingGender = false;
      state.genders = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAIL:
      state.positions = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAIL:
      state.roles = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_FAIL:
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_BARBER_SUCCESS:
      state.topBarber = action.dataBarber;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_BARBER_FAIL:
      state.topBarber = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_BARBER_SUCCESS:
      state.allBarbers = action.dataBarbers;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_BARBER_FAIL:
      state.allBarbers = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      state.allScheduleTime = action.dataTime;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL:
      state.allScheduleTime = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_REQUIRED_BARBER_INFOR_SUCCESS:
      state.allRequiredBarberInfor = action.data;
      // console.log("check data from required info",state, action);
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_BARBER_INFOR_FAIL:
      state.allRequiredBarberInfor = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
