// Initialize Tau Prolog
var pl = new Pl();

// Load your Prolog rules and queries for the Zebra Puzzle
var prologRules = `
    % The Zebra Puzzle
    % Five houses are painted different colors, and their inhabitants all have different nationalities, own different pets, drink different beverages, and smoke different brands of cigarettes.
    % The question is: Who owns the zebra?

    % Define the possible values for each property.
    color(red).
    color(green).
    color(blue).
    color(yellow).
    color(ivory).

    nationality(english).
    nationality(spanish).
    nationality(ukrainian).
    nationality(norwegian).
    nationality(japanese).

    pet(dog).
    pet(snails).
    pet(fox).
    pet(horse).
    pet(zebra).

    drink(tea).
    drink(orange_juice).
    drink(milk).
    drink(water).
    drink(coffee).

    cigarette(old_gold).
    cigarette(kools).
    cigarette(chesterfield).
    cigarette(lucky_strike).
    cigarette(parliament).

    % Define the house/occupant relationship.
    house_owner(House, Owner) :- nationality(Owner), house(House, _, _, _, _).
    house_color(House, Color) :- color(Color), house(House, Color, _, _, _).
    house_pet(House, Pet) :- pet(Pet), house(House, _, Pet, _, _).
    house_drink(House, Drink) :- drink(Drink), house(House, _, _, Drink, _).
    house_cigarette(House, Cigarette) :- cigarette(Cigarette), house(House, _, _, _, Cigarette).

    % Define the rules of the puzzle.
    puzzle(Houses) :-
        % Create a list of five houses.
        Houses = [
            house(_, _, _, _, _),
            house(_, _, _, _, _),
            house(_, _, _, _, _),
            house(_, _, _, _, _),
            house(_, _, _, _, _)
        ],
        
        % The Englishman lives in the red house.
        member(house(red, english, _, _, _), Houses),
        
        % The Spaniard owns the dog.
        member(house(_, spanish, dog, _, _), Houses),
        
        % Coffee is drunk in the green house.
        member(house(green, _, _, coffee, _), Houses),
        
        % The Ukrainian drinks tea.
        member(house(_, ukrainian, _, tea, _), Houses),
        
        % The green house is immediately to the right of the ivory house.
        right_of(house(ivory, _, _, _, _), house(green, _, _, _, _), Houses),
        
        % The Old Gold smoker owns snails.
        member(house(_, _, snails, _, old_gold), Houses),
        
        % Kools are smoked in the yellow house.
        member(house(yellow, _, _, _, kools), Houses),
        
        % Milk is drunk in the middle house.
        middle(house(_, _, _, milk, _), Houses),
        
        % The Norwegian lives in the first house.
        Houses = [house(_, norwegian, _, _, _) | _],
        
        % Chesterfields are smoked in the house next to the fox owner.
        next_to(house(_, _, _, _, chesterfield), house(_, _, fox, _, _), Houses),
        next_to(house(_, _, fox, _, _), house(_, _, _, _, chesterfield), Houses),
        
        % Kools are smoked in the house next to the horse owner.
        next_to(house(_, _, _, _, kools), house(_, _, horse, _, _), Houses),
        next_to(house(_, _, horse, _, _), house(_, _, _, _, kools), Houses),
        
        % The Lucky Strike smoker drinks orange juice.
        member(house(_, _, _, orange_juice, lucky_strike), Houses),
        
        % The Japanese smokes Parliaments.
        member(house(_, japanese, _, _, parliament), Houses),
        
        % The Norwegian lives next to the blue house.
        next_to(house(_, norwegian, _, _, _), house(blue, _, _, _, _), Houses),
        next_to(house(blue, _, _, _, _), house(_, norwegian, _, _, _), Houses).
    
    % Define the predicate to check if X is next to Y in the list L.
    next_to(X, Y, L) :- append(_, [X, Y | _], L).
    next_to(X, Y, L) :- append(_, [Y, X | _], L).
    
    % Define the predicate to find the house in the middle.
    middle(X, L) :- append(_, [X | _], L), length(L, Len), Len mod 2 =:= 1.
    
    % Define the predicate to check if X is right of Y in the list L.
    right_of(X, Y, L) :- append(_, [Y, X | _], L).

    % Run the puzzle and find the owner of the zebra.
    zebra_owner(Owner) :-
        puzzle(Houses),
        member(house(_, Owner, zebra, _, _), Houses).

    % Find the solution to the puzzle.
    solve :-
        puzzle(Houses),
        print_houses(Houses).

    % Print the list of houses with their properties.
    print_houses([]).
    print_houses([House | Rest]) :-
        write(House), nl,
        print_houses(Rest).
`;

// Load the rules into Tau Prolog
pl.consult(prologRules);

// Function to solve the puzzle and display each step
function solvePuzzle() {
    var outputDiv = document.getElementById("output");
    outputDiv.innerHTML = ""; // Clear previous output

    pl.query("solve."); // Start solving
    var step = 1;

    function getNextStep() {
        if (pl.hasMore()) {
            var solution = pl.nextSolution();
            outputDiv.innerHTML += "<h3>Step " + step + ":</h3>";
            outputDiv.innerHTML += "<pre>" + solution.toString() + "</pre>";
            step++;
            setTimeout(getNextStep, 1000); // Delay for visualization
        } else {
            outputDiv.innerHTML += "<h3>Finished!</h3>";
        }
    }

    getNextStep();
}
