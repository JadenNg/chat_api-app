const Room = require('../models/Room');

class RoomController {
    findOne(req, res, next) {
        let id1 = req.query.id1
        let id2 = req.query.id2
        Room.findOne({
            $or: [
                { $and: [{ id1: id1 }, { id2: id2 }] },
                { $and: [{ id1: id2 }, { id2: id1 }] }
            ]
        })
            .then((item) =>
                res.json({
                    code: 0,
                    data: item,
                    message: 'Thành công',
                })
            )
            .catch(() => {
                res.json({
                    code: 1,
                    data: null,
                    message: 'Thành công',
                })
            });
    }

    findAll(req, res, next) {
        Room.find({ $or: [{ id1Name: req.query.name }, { id2Name: req.query.name }] })
            .then((items) =>
                res.json({
                    code: 0,
                    data: items,
                    message: 'Thành công',
                })
            )
            .catch(() => {
                res.json({
                    code: 0,
                    data: [],
                    message: 'Thành công',
                })
            });
    }

    create(req, res, next) {
        Room.create({ ...req.body, })
            .then(() => {
                res.json({
                    code: 0,
                    message: 'Thành công',
                })
            })
            .catch(() => {
                res.json({
                    code: 1,
                    message: 'Thất bại',
                })
            })
    }

    update(req, res, next) {
        Room.updateOne({ _id: req.body._id }, req.body)
            .then(() => {
                res.json({
                    code: 0,
                    message: 'Thành công',
                })
            })
            .catch(() => {
                res.json({
                    code: 1,
                    message: 'Thất bại',
                })
            })
    }
    delete(req, res, next) {
        Room.deleteOne({ _id: req.body.id })
            .then(() => {
                res.json({
                    code: 0,
                    message: 'Thành công',
                })
            })
            .catch(() => {
                res.json({
                    code: 1,
                    message: 'Thất bại',
                })
            })
    }
}

module.exports = new RoomController();
