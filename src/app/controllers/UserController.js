const User = require('../models/User');
class UserController {
    findOne(req, res, next) {
        User.findOne({ _id: req.query.id })
            .then((user) =>
                res.json({
                    code: 0,
                    data: user,
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
        User.find({})
            .then((users) =>
                res.json({
                    code: 0,
                    data: users,
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
        User.findOne({ phone: req.body.phone })
            .then((user) => {
                if (user) {
                    res.json({
                        code: 1,
                        message: 'Thất bại',
                    })
                }
                else {
                    User.create({ ...req.body })
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
            })
    }

    update(req, res, next) {
        User.updateOne({ _id: req.body._id }, req.body)
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

    changePassword(req, res, next) {
        User.findOne({ _id: req.body.id, password: req.body.password })
            .then((user) => {
                if (user) {
                    User.updateOne({ _id: req.body.id, }, { password: req.body.newPassword })
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
                else {
                    res.json({
                        code: 1,
                        message: 'Sai mật khẩu',
                    })
                }
            })
    }

    delete(req, res, next) {
        User.deleteOne({ _id: req.body.id })
            .then(() => {
                res.json({
                    code: 0,
                    message: 'Success',
                })
            })
            .catch(() => {
                res.json({
                    code: 1,
                    message: 'Failed',
                })
            })
    }
    login(req, res, next) {
        User.findOne({ phone: req.body.phone, password: req.body.password })
            .then((user) => {
                if (!user) {
                    res.json({
                        code: 1,
                        message: 'Account or password is not correct.',
                    });
                    return;
                }
                else {
                    res.json({
                        code: 0,
                        token: { id: user._id, name: user.name },
                        message: 'Success',
                    })
                }
            })
            .catch(() => {
                res.json({
                    code: 2,
                    message: 'System error.',
                });
            })
    }
}

module.exports = new UserController();
