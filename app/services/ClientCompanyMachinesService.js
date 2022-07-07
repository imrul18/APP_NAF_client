import http from './http-common';

const getAll = async() => {
  const res = await http.get(`/client-company-machines`);
  return res.data;
};

const ClientCompanyMachinesService = {
  getAll,
};

export default ClientCompanyMachinesService;
