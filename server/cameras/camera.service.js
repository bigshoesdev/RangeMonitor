const db = require('_helpers/db');
const Camera = db.Camera;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
	return await Camera.find({});
}

async function getById(id) {
	return await Camera.findById(id);
}

async function create(cameraParams) {
	const camera = new Camera(cameraParams);
	await camera.save();
}

async function update(id, cameraParam) {
	const camera = await Camera.findById(id);

	//validate
	if(!camera) throw "Camera not found";

	Object.assign(camera, cameraParam);

	await camera.save();
}

async function _delete(id) {
	await Camera.findByIdAndRemove(id);
}