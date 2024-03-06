let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();



//Student model
let studentSchema = require('../models/Student');

//Create Student
router.route('/create-student').post(async (req, res, next) => {
    try {
        const data = await studentSchema.create(req.body);
        console.log(data);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

//Read students
router.route('/').get((req, res) => {
    studentSchema.find().then((doc) => {
        res.json(doc);
    }).catch((err) => {
        console.log(err);
    });
});

//Get single students
router.route('/edit-student/:id').get((req, res) => {
    // studentSchema.findById(req.params.id, (err, data) => {
    //     if (err) {
    //         return next(err);
    //     } else {
    //         res.json(data);
    //     }
    // });

    studentSchema.findOne({_id:req.params.id})
    .then((doc) => {
        res.json(doc);
    }).catch((err) => {
        console.log(err);
    });
});

//update student
router.route('/update-student/:id').put((req, res) => {
    let data = {
        name:req.body.name,
        email:req.body.email,
        rollno:req.body.rollno
    };
    const update_id = req.params.id;
    studentSchema.findByIdAndUpdate(update_id, data).then((data) => {
        res.json(data);
        console.log('Updated successfully');
    });
})

//Delete student
router.route('/delete-student/:id').delete(async (req, res,) => {
    // studentSchema.findByIdAndRemove(req.params.id, (error, data) => {
    //     if (error) {
    //         return next(error);
    //     } else {
    //         res.status(200).json({
    //             msg: data
    //         });
    //     }
    // })
    
    const id = req.params.id;
    try {
        const deleteStudent = await studentSchema.findByIdAndDelete(id);

        if (!deleteStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        return res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        return res.status(500).json({ message: 'Internal Server Error' })
    }
    
});

module.exports = router;