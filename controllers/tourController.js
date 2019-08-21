const fs = require("fs");
const jsend = require("jsend");

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, id) => {
    if (parseInt(req.params.id) > tours.length) {
        return res.status(404).json(jsend.fail({ msg: "INVALID ID!" }));
    }
    next();
};

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res
            .status(400)
            .json(jsend.fail({ msg: "Missing name or price" }));
    }
    next();
};

exports.getAllTours = (req, res) => {
    res.status(200).json(
        jsend.success({ results: tours.length, tours: tours })
    );
};

exports.getTour = (req, res) => {
    const id = parseInt(req.params.id);
    const tour = tours.find(el => {
        return el.id === id;
    });
    res.status(200).json(jsend.success({ tour: tour }));
};

exports.createTour = (req, res) => {
    // console.log(req.body);

    const newId = tours[tours.length - 1].id + 1;
    const newTour = { ...req.body, id: newId };
    console.log(newTour);
    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        err => {
            res.status(201).json(jsend.success({ tour: newTour }));
        }
    );

    // res.send("Done");
};

exports.updateTour = (req, res) => {
    res.status(200).json(jsend.success({ tour: "Updated tour here!" }));
};

exports.deleteTour = (req, res) => {
    res.status(204).json(jsend.success(null));
};
