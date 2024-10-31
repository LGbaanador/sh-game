export default class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }

    get color() {
        return this.suit === "♣" || this.suit === "♠" ? "black" : "red";
    }

    getHTML() {
        return (
            <div className={`card ${this.color}`} data-value={`${this.value} ${this.suit}`}>
                {this.value}{this.suit}
            </div>
        );
    }
}