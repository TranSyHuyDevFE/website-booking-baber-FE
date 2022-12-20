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
const getAllDetailServiceById = (data) => {
  return axios.get(
    `/api/get-detail-service-by-id?id=${data.id}&location=${data.location}`
  );
};
const editServiceBarber = (inputData) => {
  return axios.put("/api/edit-detail-service-by-id", inputData);
};
const deleteServiceBarber = (inputData) => {
  return axios.delete("/api/delete-detail-service-by-id", {
    data: { id: inputData },
  });
};
const createNewBranchingWorking = (data) => {
  return axios.post("/api/create-new-branching", data);
};
const getAllBranching = () => {
  return axios.get("/api/get-branching");
};
const getAllBranchingById = (data) => {
  return axios.get(`/api/get-detail-branching-by-id?id=${data.id}`);
};
const editBranching = (inputData) => {
  return axios.put("/api/edit-detail-branching-by-id", inputData);
};
const deleteBranching = (inputData) => {
  return axios.delete("/api/delete-detail-branching-by-id", {
    data: { id: inputData },
  });
};
const getAllCustomerForBarber = (data) => {
  return axios.get(
    `/api/get-list-customer-for-barber?barberId=${data.barberId}&date=${data.date}`
  );
};
const getAllCustomerHistoryForBarber = (data) => {
  return axios.get(
    `/api/get-list-customer-history-for-barber?barberId=${data.barberId}&date=${data.date}`
  );
};
const postSendThankEmail = (data) => {
  return axios.post("/api/send-thanks", data);
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
  getAllDetailServiceById,
  editServiceBarber,
  deleteServiceBarber,
  createNewBranchingWorking,
  getAllBranching,
  getAllBranchingById,
  editBranching,
  deleteBranching,
  getAllCustomerForBarber,
  getAllCustomerHistoryForBarber,
  postSendThankEmail,
};
