import http from "./http-common";

const getAll = async (data) => {
  const res = await http.get(`/client-quotation`, {
    params: data
});
  return res.data;
};

const create = async (data) => {
  const res = await http.post(`/client-quotation`, data) 
  return res.data;
};

const get = async (id) => {
  const res = await http.get(`/client-quotation/${id}`);
  return res.data;
};

const update = async (id, data) => {
  const res = await http.put(`/client-quotation/${id}`, data);
  return res.data;
};

const lock = async(data) => {
  const res = await http.post(`/client-quotation/lock`,data);
  return res.data;
}
const ClientQuotationService = { 
    getAll,
    create,
    get,
    update,
    lock
  };
  
  export default ClientQuotationService; 