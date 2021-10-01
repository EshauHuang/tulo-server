const { Op } = require("sequelize");
const { singular } = require("pluralize");

const setOrder = (sort = "id", order = "asc") => {
  let result = [];
  sort && result.push(sort);
  order && result.push(order);
  return { order: [result] };
};

const setPage = (page = 1, limit = 10, offset = 0) => ({
  limit: parseInt(limit, 10),
  offset: page ? (parseInt(page, 10) - 1) * parseInt(limit, 10) : offset,
});

const setAttrs = (attrs = "") => {
  if (attrs === "") return {};
  return {
    attributes: attrs.split(","),
  };
};

const selectElement = (req) => {
  if (!req) return {};
  const { query } = req;
  return Object.keys(query).reduce((obj, key) => {
    if (query[key]) {
      obj[key] = {
        [Op.regexp]: `.*(${query[key]})+.*`,
      };
    }
    return obj;
  }, {});
};

const setOptions = (req, parentsModel, childrenModels) => {
  const source = singular(req.params.source.toLowerCase());
  const sourceModel = childrenModels[source];
  const { id } = req.params;
  const { sort, order, page, limit, offset, attrs } = req.query;

  delete req.query.sort;
  delete req.query.order;
  delete req.query.page;
  delete req.query.limit;
  delete req.query.offset;
  delete req.query.attrs;

  console.log({
    include: [
      {
        model: parentsModel,
        where: [{ type: source, ...selectElement(req) }],
        ...(sourceModel
          ? {
              include: {
                model: sourceModel,
                ...setAttrs(attrs),
              },
            }
          : {}),
        ...setPage(page, limit, offset),
      },
    ],
    where: [{ id }],
    ...setOrder(sort, order, parentsModel),
  });

  return {
    include: [
      {
        model: parentsModel,
        where: [{ type: source, ...selectElement(req) }],
        ...(sourceModel
          ? {
              include: {
                model: sourceModel,
                ...setAttrs(attrs),
              },
            }
          : {}),
        ...setOrder(sort, order),
        ...setPage(page, limit, offset),
      },
    ],
    where: [{ id }],
  };
};

module.exports = setOptions;
