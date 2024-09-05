const { db } = require('../../services/index');
const { sendResponse, sendError } = require('../../responses/index');

exports.handler = async (event) => {
  const { id } = event.pathParameters;

  if(id) {
    try {
      const { Item } = await db.get({
        TableName: 'todo-db',
        Key: {
          id : id
        }
      });
      
      if(Item) {
        return sendResponse(200, Item);
      } else {
        return sendError(404, { message : "Could not find Todo!" });
      }
    } catch(error) {
      return sendError(404, { message : error.message });
    }
  } else {
    return sendError(404, { message : "Could not find Todo!" });
  }
};
