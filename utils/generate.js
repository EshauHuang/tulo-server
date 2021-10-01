const generateRandomString = () => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let result = "";
  for (let i = 0; i < 15; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

const directoryInit = (date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const randomString = generateRandomString();
  return () => `/${year}-${month}/D${day}/${randomString}`;
};

const indexInit =
  (id = 0) =>
  () =>
    id++;

module.exports = {
  directoryInit,
  indexInit,
};
