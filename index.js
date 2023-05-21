const express = require("express");
const lib = require("./sudoku.js");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json())

// diff
// space
//list
//grid
//candidate
app.get("/generate", (req, res) => {
    var responce = {};

    const data = req.body;
    const diff = data.difficulty;
    if (!diff) {
        res.status(418).send({ message: "need to fill out diff" })
    }
    var seed = difficulty(diff, responce);



    const candidate = data.candidates;
    if (candidate == true) {
        candidates(seed, responce);
    }

    const space = data.spaces;
    if (space) {
        replaceChar(seed,space, responce);
    }

    const list = data.list;
    if (list == true) {
        to_list(seed, responce);
    }

    const grid = data.grid;
    if (grid == false) {
        to_grid(seed, responce);
    }

    res.send(responce);
});





app.listen(
    PORT,
    () => console.log("http://localhost:8080")
);



function difficulty(str, responce) {
    var seed = ".";
    switch (str) {
        case "easy":
            seed = lib.sudoku.generate("easy");
            break;
        case "medium":
            seed = lib.sudoku.generate("medium");
            break;
        case "hard":
            seed = lib.sudoku.generate("hard");
            break;
        case "very-hard":
            seed = lib.sudoku.generate("very-hard");
            break;
        case "insane":
            seed = lib.sudoku.generate("insane");
            break;
        case "inhuman":
            seed = lib.sudoku.generate("inhuman");
            break;
        default:
            res.status(418).send({ message: "fill in a valid diff" })
    }
    responce.seed = seed;
    responce.difficulty = str;
    return seed;
}

// candidates
function candidates(str, responce) {
    responce.candidates = lib.sudoku.get_candidates(str);


}

// mezery 
function replaceChar(str,space, responce) {
    responce.seed = str.replace(new RegExp(".", "g"), space);
    return;
}

//string default
// list
function to_list(str, responce) {
    responce.list = Array.from(str);
    return;

}
// grid
function to_grid(seed, responce) {
    responce.grid = lib.sudoku.board_string_to_grid(seed);
    return;
}
