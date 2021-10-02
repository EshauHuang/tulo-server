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
  const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
  const day = date.getDate();
  const randomString = generateRandomString();
  return () => `/${year}/${month}/${day}/${randomString}`;
};

const indexInit =
  (id = 0) =>
  () =>
    id++;

module.exports = {
  generateRandomString,
  directoryInit,
  indexInit,
};
