const { Op } = require("sequelize");
const { singular, plural } = require("pluralize");

const setOrder = (sort = "id", order = "asc") => {
  let result = [];
  sort && result.push(sort);
  order && result.push(order);
  return { order: [result] };
};

const setPage = (page, limit, offset) => {
  if (!page && !limit && !offset) return {};
  return {
    limit: parseInt(limit, 10),
    offset: page ? (parseInt(page, 10) - 1) * parseInt(limit, 10) : offset,
  };
};

const setAttrs = (attrs) => {
  if (!attrs) return {};
  return {
    attributes: attrs.split(","),
  };
};

const selectElement = (req) => {
  if (!req) return {};
  const { query } = req;
  return Object.keys(query).reduce((obj, key) => {
    if (!query[key]) return obj;
    obj[key] = {
      [Op.regexp]: `.*(${query[key]})+.*`,
    };
    return obj;
  }, {});
};

const setType = (type) => {
  if (!type) return {};
  if (type === "all") return {};
  return { type };
};

const setOptions = (req, { parentsModel, childrenModels }) => {
  const { sort, order, page, limit, offset, attrs, type } = req.query;
  const { id } = req.params;
  const source = singular(req.params.source.toLowerCase());
  const extendedModels = childrenModels[type];

  if (!extendedModels && source !== "work") return;
  delete req.query.type;
  delete req.query.sort;
  delete req.query.order;
  delete req.query.page;
  delete req.query.limit;
  delete req.query.offset;
  delete req.query.attrs;
  return {
    include: [
      {
        model: parentsModel,
        as: plural(source),
        where: extendedModels
          ? [{ ...setType(type), ...selectElement(req) }]
          : [{ ...selectElement(req) }],
        ...(extendedModels
          ? {
              include: extendedModels.map((model) => ({
                model,
                ...setAttrs(attrs),
              })),
            }
          : {}),
        ...setOrder(sort, order),
        ...setPage(page, limit, offset),
      },
    ],
    where: [{ id }],
  };
};

module.exports = {
  setOptions,
  setOrder,
  setPage,
  setAttrs,
  setType,
  selectElement,
};
