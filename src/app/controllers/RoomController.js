const Room = require('../models/Room');
const User = require('../models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose')
class RoomController {
    findOne(req, res, next) {
        let id = req.query.id
        Room.findOne({ _id: id })
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
        var my_name = ""
        User.findOne({ _id: req.query.id })
            .then((user) => {
                my_name = user.name
            })
            .then(() => {
                Room.find({ $or: [{ id1: req.query.id }, { id2: req.query.id }] })
                    .then((items) => {
                        let list = items;
                        list.forEach(i => {
                            if (req.query.id.toString() == i.id1) {
                                i.id1Name = i.id2Name
                            }
                            else {
                                i.id2Name = i.id1Name
                            }
                        })
                        User.find({})
                            .then((users) =>
                                res.render('chats/show', {
                                    rooms: mutipleMongooseToObject(list),
                                    me: req.query.id,
                                    users: mutipleMongooseToObject(users)
                                })

                            )
                    }
                    )
            })
            .catch(() => {
                res.render('login/show.hbs')
            })
    }

    create(req, res, next) {
        var id1 = req.body.id1
        var id2 = req.body.id2
        var id1Name = ""
        var id2Name = ""
        Room.findOne({ id1: id1, id2: id2 })
            .then((item) => {
                if (item) {
                    res.json({
                        code: 1,
                        message: 'Thất bại',
                    })
                }
                else {
                    User.findOne({ _id: id1 })
                        .then((user) => {
                            if (!user) {
                                res.json({
                                    code: 2,
                                    message: 'Thất bại',
                                })
                            }
                            id1Name = user.name
                        }
                        )
                        .then(() => {
                            User.findOne({ _id: id2 })
                                .then((user) => {
                                    if (!user) {
                                        res.json({
                                            code: 2,
                                            message: 'Thất bại',
                                        })
                                    }
                                    id2Name = user.name
                                }
                                )
                                .then(() => {
                                    Room.create({ id1: id1, id2: id2, id1Name: id1Name, id2Name: id2Name, messages: [] })
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
                                })
                                .catch(() => {
                                    res.json({
                                        code: 2,
                                        message: 'Thất bại',
                                    })
                                })
                        })
                        .catch(() => {
                            res.json({
                                code: 2,
                                message: 'Thất bại',
                            })
                        })
                }
            })
            .catch(() => {
                res.json({
                    code: 2,
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
        let id1 = req.query.id1
        let id2 = req.query.id2
        Room.deleteOne({
            $or: [
                { $and: [{ id1: id1 }, { id2: id2 }] },
                { $and: [{ id1: id2 }, { id2: id1 }] }
            ]
        })
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
