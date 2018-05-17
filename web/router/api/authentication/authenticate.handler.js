const Boom = require('boom');
const { createDatasetInstance } = rootRequire('utils')

async function logic() {

  // const users = [
  //   { full_name: "John Doe", email: "john@example.com", password: 'User@123', type: 'admin' },
  //   { full_name: "Jane Doe", email: "jane@example.com", password: 'User@123', type: 'admin' }
  // ];

  const commentDataset = await createDatasetInstance('comments');

  // await commentDataset.insert(users).execute();

  let selectQuery = await commentDataset.select().execute();

  return selectQuery
}

function handler(req, res, next) {
  logic(req).then((data) => {
    res.json(data);
  }).catch(err => next(err));
}
module.exports = handler;