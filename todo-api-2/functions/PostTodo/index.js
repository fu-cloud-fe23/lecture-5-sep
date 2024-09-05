const { db } = require('../../services/index');
const { sendResponse, sendError } = require('../../responses/index');
const { v4 : uuid } = require('uuid');

exports.handler = async (event) => {
    const { task } = JSON.parse(event.body);
    const id = uuid().substring(0, 5);

    if(task) {
        try {
            await db.put({
                TableName: 'todo-db',
                Item: {
                    id: id,
                    task: task,
                    done: false
                }
            });
            return sendResponse(200, { success : true });
        } catch(error) {
            return sendError(404, { message : error.message });
        }
    } else {
        return sendError(404, { message : 'Could not add todo' });
    }
};
