import http from "./http-common";

const getAll = async () => {
  const res = await http.get("/notification");
  return res.data;
};
const readAt = async (id) => {
  const res = await http.get(`/notification/read/${id}`);
  return res?.data;
};

const NotificationService = {
  getAll,
  readAt,
};

export default NotificationService;
