import http from "./http-common";

const getAll = async (data) => {
  const res = await http.get(`/requisitions`,{
    params: data
});
  return res.data;
};

const get = async (id) => {
  const res = await http.get(`/requisitions/${id}`);
  return res.data;
};

const getEngineers = async () =>{
  const res = await http.get('/engineers');
  return res.data;
}

const engineers = async () =>{
  const res = await http.get('/requisitions/engineers');
  return res.data;
}

const create = async (data) => {
  const res = await http.post(`/requisitions`, data)
  return res.data;
};

const update = async (id, data) => {
  const res = await http.put(`/requisitions/${id}`, data);
  return res.data;
};

const remove = async (id) => {
  const res = await http.delete(`/requisitions/${id}`);
  return res.data;
};

const RequisitionService = {
  getAll,
  get,
  engineers,
  getEngineers,
  create,
  update,
  remove,
};

export default RequisitionService;