import exerciseLibrary = require('../model/exerciseLibrary');
import exerciseLibraryRepository = exerciseLibrary.repository;

export let getOrCreateLibrary = (req, callback) => {
    exerciseLibraryRepository.count({"owner": req.user._id}, (err, count) => {
        if (count === 0) {
            var library = {
                "owner": req.user._id,
                practiceFocuses: [{title: 'Current focus'}]
            };
            exerciseLibraryRepository.create(library, (err, library) => {
                callback(err, library);
            });
        } else {
            getUserLibrary(req, callback);
        }
    });
};

let getUserLibrary = function (req, callback) {
    exerciseLibraryRepository.findOne({"owner": req.user._id}).populate({
        path: 'exercises',
        populate: {path: 'executions'}
    }).populate({
        path: 'practiceFocuses',
        populate: {path: 'exercises'}
    }).exec(callback);
};

export let addExerciseToLibrary = function (library, ex, res) {
    library.exercises.push(ex);
    library.save(()=> {
        res.sendStatus(200);
    });
};