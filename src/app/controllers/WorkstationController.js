const Workstation = require('../models/Workstation');

class WorkstationController {
    findOne(req, res, next) {
        Workstation.findOne({ _id: req.query.id })
            .then((item) =>
                res.json({
                    code: 0,
                    data: item,
                    message: 'Thành công',
                })
            )
            .catch(() => {
                res.json({
                    code: 0,
                    data: null,
                    message: 'Thành công',
                })
            });
    }

    findAll(req, res, next) {
        let payload = {}
        if(req.query.status) {
            payload.status = req.query.status
        }
        Workstation.find({name: { $regex: req.query.search?req.query.search:'' }, ...payload})
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
        Workstation.create({...req.body, status: 2})
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
        Workstation.updateOne({_id: req.body._id},req.body)
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

    changeStatus(req, res, next) {
        Workstation.updateOne({_id: req.body.id},{status: req.body.status})
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
        Workstation.deleteOne({ _id: req.body.id })
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

module.exports = new WorkstationController();
