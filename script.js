// Select all elements with the class "card" (these are the game cards)
const cards = document.querySelectorAll(".card");

let matched = 0; // This keeps track of how many pairs of cards have been matched
let cardOne, cardTwo; // These will hold the first and second cards clicked
let disableDeck = false; // This prevents clicking new cards while checking for a match

// Function to flip the card when clicked
function flipCard({target: clickedCard}) {
    // Check if the clicked card is not the same as the first one and if the deck is not disabled
    if(cardOne !== clickedCard && !disableDeck) {
        // Add the "flip" class to the card to visually flip it
        clickedCard.classList.add("flip");

        // If no card is selected yet, save the clicked card as the first card
        if(!cardOne) {
            return cardOne = clickedCard;
        }

        // Save the second clicked card
        cardTwo = clickedCard;
        disableDeck = true; // Temporarily disable the deck to prevent more clicks

        // Get the image source of both flipped cards to compare them
        let cardOneImg = cardOne.querySelector(".back-view img").src,
            cardTwoImg = cardTwo.querySelector(".back-view img").src;

        // Check if the two cards match
        matchCards(cardOneImg, cardTwoImg);
    }
}

// Function to check if two flipped cards match
function matchCards(img1, img2) {
    // If the images match
    if(img1 === img2) {
        matched++; // Increase the matched count

        // If 8 pairs are matched, shuffle the cards to reset the game
        if(matched == 8) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000); // Wait 1 second before shuffling
        }

        // Remove the ability to click the matched cards again
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);

        // Reset cardOne and cardTwo to be empty for the next turn
        cardOne = cardTwo = "";
        disableDeck = false; // Re-enable the deck for new clicks
        return;
    }

    // If the cards don't match, shake them before flipping them back
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400); // Wait 400 milliseconds before adding shake animation

    // Flip the cards back after the shake animation
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");

        // Reset cardOne and cardTwo for the next turn
        cardOne = cardTwo = "";
        disableDeck = false; // Re-enable the deck for new clicks
    }, 1200); // Wait 1.2 seconds before flipping them back
}

// Function to shuffle the cards at the start of the game or after a match
function shuffleCard() {
    matched = 0; // Reset the matched count to 0
    disableDeck = false; // Ensure the deck is enabled
    cardOne = cardTwo = ""; // Reset cardOne and cardTwo

    // Array with pairs of numbers (1 to 8), each number represents a card image
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

    // Randomly shuffle the array
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    // Assign the shuffled images to the cards
    cards.forEach((card, i) => {
        card.classList.remove("flip"); // Remove any flip class to reset the cards
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `images/img-${arr[i]}.png`; // Set a random image to each card

        // Re-enable clicking on all cards
        card.addEventListener("click", flipCard);
    });
}

// Shuffle the cards when the game starts
shuffleCard();

// Add a click event listener to all cards so they can be flipped when clicked
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});
