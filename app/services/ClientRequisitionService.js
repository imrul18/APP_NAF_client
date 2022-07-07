import http from "./http-common";

const getAll = async (data) => {
  const res = await http.get(`/client-requisitions`, {
    params: data
});
  return res.data;
};

const get = async (id) => {
  const res = await http.get(`/client-requisitions/${id}`);
  return res.data;
};

const create = async (data) => {
  const res = await http.post(`/client-requisitions`, data)
  return res.data;
};

const ClientRequisitionService = {
  getAll,
  get,
  create
};

export default ClientRequisitionService;