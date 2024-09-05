const { db } = require('../../services/index');
const { sendResponse, sendError } = require('../../responses/index');

exports.handler = async (event) => {
    try {
        const { Items } = await db.scan({
            TableName: 'todo-db',
            FilterExpression : 'attribute_exists(#DYNOBASE_todo)',
			ExpressionAttributeNames : {
				'#DYNOBASE_todo' : 'task'
			}
        });

        if(Items) {
            return sendResponse(200, Items);
        } else {
            sendError(404, { success : false, message : 'No todos found!' });
        }

    } catch(error) {
        return sendError(404, { message : error.message });
    }
};
