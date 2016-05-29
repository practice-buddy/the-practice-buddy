var env = require('../env.json');

export let config = function () {
    var node_env = process.env.NODE_ENV || 'development';
    console.log(node_env);
    return env[node_env];
};


export let isAuthenticated = (req, res, next) => {
    console.log('check')
    if (req.isAuthenticated())return next();
    res.send(401);
};
