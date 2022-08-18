import http from './http-common';

const getAll = async currentPage => {
  const paginate = {page: currentPage};
  const res = await http.get('/notification', {params: paginate});
  return res.data;
};

const getAllCount = async currentPage => {
  const paginate = {page: currentPage};
  const res = await http.get('/notification', paginate);
  return res.data;
};

const readAt = async id => {
  const res = await http.get(`/notification/read/${id}`);
  return res?.data;
};

const NotificationService = {
  getAll,
  readAt,
  getAllCount,
};

export default NotificationService;
