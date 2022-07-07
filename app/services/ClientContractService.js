import http from "./http-common";

const getAll = async (data) => {
  const res = await http.get(`/client-contract`, {
    params: data
});
  return res;
};

const get = async (id) => {
    const res = await http.get(`/client-contract/${id}`);
    return res.data;
  };

const ClientContractService = {
    getAll,
    get
  };
  
  export default ClientContractService; 