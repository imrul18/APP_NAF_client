import http from "./http-common";

const getAll = async (params) => {
  const res = await http.get("/companies", {
    params: params
  });
  return res.data; 
};

const get = async (id) => {
  const res = await http.get(`/companies/${id}`);
  return res.data;
};

const create = async (data) => {
  return http.post("/companies", data);
};

const update = async (id, data) => {
  data["_method"] = "PUT";
  const res = await http.post(`/companies/${id}`, data);
  return res.data;
};

const remove = async (id) => {
  const res = await http.delete(`/companies/${id}`);
  return res.data;
};

const getUsers = async (companyId) => {
  let res = await http.get(`/companies/${companyId}/users`);
  return res.data;
};

const addUser = async (companyId, data) => {
  let res = await http.post(`/companies/${companyId}/users`, data);
  return res.data;
};

const getUser = async (companyId, userId) => {
  let res = await http.get(`/companies/${companyId}/users/${userId}`);
  return res.data;
};

const updateUser = async (companyId, userId, data) => {
  data.append("_method", "PUT");
  let res = await http.post(`/companies/${companyId}/users/${userId}`, data);
  return res.data;
};

const deleteUser = async (companyId, userId) => {
  let res = await http.delete(`/companies/${companyId}/users/${userId}`);
  return res.data;
};

const getMachines = async (companyId) => {
  let res = await http.get(`/companies/${companyId}/machines`);
  return res.data;
};

const attachMachine = async (companyId, data) => {
  let res = await http.post(`/companies/${companyId}/machines`, data);
  return res.data;
};

const detachMachine = async (companyId, machineId) => {
  let res = await http.delete(`/companies/${companyId}/machines/${machineId}`);
  return res.data;
};


const getClientCompany = async () => {
  const res = await http.get("/client-company");
  return res.data;
};

const getClientMachines = async () => {
  const res = await http.get("/client-machines");
  return res.data;
};

const CompanyService = {
  getAll,
  get,
  create,
  update,
  remove,
  getUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
  getMachines,
  attachMachine,
  detachMachine,

  getClientCompany,
  getClientMachines,
};

export default CompanyService;