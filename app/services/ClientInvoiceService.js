import http from './http-common';

const getAll = async data => {
  const res = await http.get(`/client-invoice`, {
    params: data,
  });
  return res.data;
};

const get = async id => {
  const res = await http.get(`/client-invoice/${id}`);
  return res.data;
};

const create = async data => {
  const res = await http.post(`/client-invoice`, data);
  return res.data;
};

const ClientInvoiceService = {
  getAll,
  create,
  get,
};

export default ClientInvoiceService;
