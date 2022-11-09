import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};
const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};
const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};
const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", { data: { id: userId } });
};
const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopBarberHomeService = (limit) => {
  return axios.get(`/api/top-barber-home?limit=${limit}`);
};
const getAllBarbers = (limit) => {
  return axios.get(`/api/get-all-barber`);
};
const saveDetailBarberService = (data) => {
  return axios.post("/api/save-infor-barber", data);
};
const getDetailInforBarber = (inputId) => {
  return axios.get(`/api/get-detail-barber-by-id?id=${inputId}`);
};
const saveBulkScheduleBarber = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};

const getScheduleBarberByDate = (barberId, date) => {
  return axios.get(
    `/api/get-schedule-barber-by-date?barberId=${barberId}&date=${date}`
  );
};
const getExtraInforBarberById = (barberId) => {
  return axios.get(`/api/get-extra-infor-barber-by-id?barberId=${barberId}`);
};
const getProfileBarberById = (barberId) => {
  return axios.get(`/api/get-profile-barber-by-id?barberId=${barberId}`);
};
const postCustomerBookAppointment = (data) => {
  return axios.post("/api/customer-book-appointment", data);
};
const postVerifyBookAppointment = (data) => {
  return axios.post("/api/verify-book-appointment", data);
};
const createNewServiceBarber = (data) => {
  return axios.post("/api/create-new-serviceBarber", data);
};
const getAllServiceBarber = () => {
  return axios.get("/api/get-serviceBarber");
};

export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopBarberHomeService,
  getAllBarbers,
  saveDetailBarberService,
  getDetailInforBarber,
  saveBulkScheduleBarber,
  getScheduleBarberByDate,
  getExtraInforBarberById,
  getProfileBarberById,
  postCustomerBookAppointment,
  postVerifyBookAppointment,
  createNewServiceBarber,
  getAllServiceBarber,
};
