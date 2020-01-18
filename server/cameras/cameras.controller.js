const express = require('express');
const router = express.Router();
const cameraService = require('./camera.service');
const Stream = require('node-rtsp-stream')

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/create', create);
router.put('/:id', update);
router.delete('/:id', _delete);
router.get('/viewStream/:id', viewStream);

module.exports = router;

function viewStream(req, res, next) {
	cameraService.getById(req.params.id)
		.then(camera => {
			if (global.stream) {
				global.stream.stop();
			}
			var port = 9999;
			global.stream = new Stream({
				name: camera.name,
				streamUrl: camera.address,
				wsPort: port,
				ffmpegOptions: { // options ffmpeg flags
					'-stats': '', // an option with no neccessary value uses a blank string
					'-r': 30 // options with required values specify the value after the key
				}
			})
			res.json({ url: 'ws://' + 'localhost' + ':' + port });
		})
		.catch(err => next(err));
}

function getAll(req, res, next) {
	cameraService.getAll()
		.then(cameras => res.json(cameras))
		.catch(err => next(err));
}

function getById(req, res, next) {
	cameraService.getById(req.params.id)
		.then(camera => camera ? res.json(camera) : res.sendStatus(404))
		.catch(err => next(err));
}

function create(req, res, next) {
	cameraService.create(req.body)
		.then(() => res.json({}))
		.catch(err => next(err));
}

function update(req, res, next) {
	cameraService.update(req.params.id, req.body)
		.then(() => res.json({}))
		.catch(err => next(err));
}

function _delete(req, res, next) {
	cameraService.delete(req.params.id)
		.then(() => res.json({}))
		.catch(err => next(err));
}