const pl = require('tau-prolog');

// Create a Prolog engine
const session = pl.create();

// Load your Prolog program
const prologProgram = `
    task_variable(knight).
    task_variable(knave).
    say(knight, Statement) :- Statement.
    say(knave, Statement) :- not(Statement).
    create([Head|[]]) :- task_variable(Head).
    create([Head|Tail]) :- task_variable(Head), create(Tail).
    % Your example exercise/2 predicates go here...
`;

session.consult(prologProgram);

const query = "exercise(1, [A, B])."; // Change the query as needed
const solutions = session.query(query);

// Check if there are solutions
if (solutions && solutions.length > 0) {
    solutions.forEach((solution, index) => {
        console.log(`Solution ${index + 1}:`);
        visualizeSolution(solution);
    });
} else {
    console.log("No solutions found.");
}

// Close the Prolog engine session
session.dispose();
