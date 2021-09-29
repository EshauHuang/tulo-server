const checkParams = (params) => {
  console.log(params);
  if (!Number(params.id)) throw new Error('Invalid')
}

module.exports = checkParams