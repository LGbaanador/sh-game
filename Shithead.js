import React, {useState} from "react";
import Deck from "../components/Deck";
import Card from "../components/Card";

const CARD_VALUE_MAP = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14
};

const ShitHead = () => {
    // useEffect(() => {
    //     startGame();
    // }, []);
    const deal = (deck,num) => {
        let x = []
        for( let i = 0; i < num; i++) {
            x.push(deck.pop())
        }
        return x
    }
    const freeDeck = new Deck()
    freeDeck.shuffle();
    let playerDeck = new Deck(deal(freeDeck,10))
    let computerDeck = new Deck(deal(freeDeck,10))
    let playerFD = new Deck(deal(playerDeck,3))
    let computerFD = new Deck(deal(computerDeck,3))
    let playerFUD = new Deck(deal(playerDeck,3))
    let computerFUD = new Deck(computerDeck,3)
    let pile = new Deck(freeDeck.pop())

    const [playerHand, setPlayerHand] = useState(playerDeck);
    const [computerHand, setComputerHand] = useState(computerDeck);
    const [playingField, setPlayingField] = useState(pile);
    const [turn, setTurn] = useState("Player");

    //There may be a state issue between PlayerDeck and PLayerHand
    const handleCardSelect = (event, index) => {
        const currCard = event.target.getAttribute('data-value');
        const currCardValue = currCard.split(" ")
        console.log(CARD_VALUE_MAP[currCardValue[0]] < CARD_VALUE_MAP[playingField.cards.value])
        if(CARD_VALUE_MAP[currCardValue[0]] < CARD_VALUE_MAP[playingField.cards.value]) {
            console.log(CARD_VALUE_MAP[playingField.cards.value],"pile value", CARD_VALUE_MAP[currCardValue[0]], "You can NOT play this card")
        } else {
            console.log(currCard, "You can play this card")
            console.log(CARD_VALUE_MAP[playingField.cards.value],"pile value", CARD_VALUE_MAP[currCardValue[0]], "You can play this card")
            //playerHand.cards.splice(index,1)
            playingField.push(new Card(currCardValue[1],currCardValue[0]))
            //const newCards = { ...playerHand, cards: playerHand.cards.filter((_, i) => i !== index) };
            //console.log(newCards.cards)
            //event.target.remove()
            //setPlayerHand(newCards.cards)
        }
    }
    //If card is not higher than that is on the playing field than disable that card
    if(turn === "Player") {
        // THE PLAYER GETS TO CHOOSE WHAT CARD THEY WANT TO PLAY
        setTurn("Computer")
    } else if(turn === "Computer") {
        // THE COMP CHOOSES WHAT CARD IT WILL PLAY
    }
    return (
        <div className="game-board">
            <div className="pile-deck">{playingField && playingField.numberOfCards} Pile</div>
            <div className="player-card-slot">{playingField && playingField.cards.getHTML()}</div>
            <div className="player-deck">{playerDeck && playerDeck.numberOfCards} Player Deck</div>
            <div className="computer-card-slot">
                {playerHand && playerHand.cards.map((card, index) => (
                    <button key={index} onClick={(event) => {handleCardSelect(event, index)}}>
                        {card.getHTML()}
                    </button>
                ))}
            </div>
            <div className="computer-card-slot">{playerFUD && playerFUD.cards.map(card => card.getHTML())}</div>
        </div>
    )
}

export default ShitHead;