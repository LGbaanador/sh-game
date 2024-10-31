import React, { useState, useEffect } from 'react';
import Deck from './Deck.js';

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
    J: 11,
    Q: 12,
    K: 13,
    A: 14
};

const CardGame = () => {
    const [playerDeck, setPlayerDeck] = useState(null);
    const [computerDeck, setComputerDeck] = useState(null);
    const [inRound, setInRound] = useState(false);
    const [stop, setStop] = useState(false);
    const [playerCard, setPlayerCard] = useState(null);
    const [computerCard, setComputerCard] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        startGame();
    }, []);
    const startGame = () => {
        const deck = new Deck();
        deck.shuffle();

        const deckMidpoint = Math.ceil(deck.numberOfCards / 2);
        setPlayerDeck(new Deck(deck.cards.slice(0, deckMidpoint)));
        setComputerDeck(new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards)));
        setInRound(false);
        setStop(false);
        setMessage('');
    };

    const cleanBeforeRound = () => {
        setInRound(false);
        setPlayerCard(null);
        setComputerCard(null);
        setMessage('');
        updateDeckCount();
    };

    const flipCards = () => {
        setInRound(true);

        const newPlayerCard = playerDeck.pop();
        const newComputerCard = computerDeck.pop();

        setPlayerCard(newPlayerCard);
        setComputerCard(newComputerCard);

        updateDeckCount();

        if (isRoundWinner(newPlayerCard, newComputerCard)) {
            setMessage('Win');
            playerDeck.push(newPlayerCard);
            playerDeck.push(newComputerCard);
        } else if (isRoundWinner(newComputerCard, newPlayerCard)) {
            setMessage('Lose');
            computerDeck.push(newPlayerCard);
            computerDeck.push(newComputerCard);
        } else {
            setMessage('Draw');
            playerDeck.push(newPlayerCard);
            computerDeck.push(newComputerCard);
        }

        if (isGameOver(playerDeck)) {
            setMessage('You Lose!!');
            setStop(true);
        } else if (isGameOver(computerDeck)) {
            setMessage('You Win!!');
            setStop(true);
        }
    };

    const updateDeckCount = () => {
        // This function can be used to update the deck count display if needed
    };

    const isRoundWinner = (cardOne, cardTwo) => {
        return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value];
    };

    const isGameOver = (deck) => {
        return deck.numberOfCards === 0;
    };

    const handleClick = () => {
        if (stop) {
            startGame();
        } else if (inRound) {
            cleanBeforeRound();
        } else {
            flipCards();
        }
    };

    return (
        <div onClick={handleClick}>
            <div className="computer-deck">{computerDeck && computerDeck.numberOfCards} Computer Deck </div>
            <div className="computer-card-slot">{computerCard && computerCard.getHTML()} </div>
            <div className="player-deck">{playerDeck && playerDeck.numberOfCards} Player Deck</div>
            <div className="player-card-slot">{playerCard && playerCard.getHTML()}</div>
            <div className="text">{message}</div>
            <div className="computer-card-slot">{computerDeck && computerDeck.cards.map(card => card.getHTML())}</div>
            {/*<div className="player-card-slot">*/}
            {/*    {playerDeck && playerDeck.cards.map((card, index) => (*/}
            {/*        <div key={index} onClick={() => {}}>*/}
            {/*            {card.getHTML()}*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}
        </div>
    );
};

export default CardGame;
