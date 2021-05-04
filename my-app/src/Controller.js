import Deck from './Deck'
import Hand from './Hand'

export default class Controller {
    constructor(deck, playerHand, houseHand, pot) {
        this.deck = deck;
        this.playerHand = playerHand;
        this.houseHand = houseHand;
        this.win = false;
        this.pot = pot;
        this.bet = 0;
        this.inPlay = false;
        this.hasBet = false;

        this.test = 1000;
    }

    setHouse() {
        if (this.houseHand.getHandValue() >= 17) {
            this.checkWin();
        } else {
            this.dealHouse();

        }
    }

    dealHouse() {

        while (this.houseHand.getHandValue() < 17) {

            this.deck.deal(this.houseHand)
        }

        this.checkWin();

    }

    checkWin() {
        if (this.houseHand.getHandValue() > this.playerHand.getHandValue() && this.houseHand.getHandValue() <= 21) {

        } else if (this.houseHand.getHandValue() < this.playerHand.getHandValue() || this.houseHand.getHandValue() > 21) {
            this.win = true;
            if (this.playerHand.getHandValue() === 21) {
                this.pot += this.bet;
                this.pot += this.bet * 1.5;

            } else {
                this.pot += (this.bet + this.bet);
            }


        } else {
            this.pot += this.bet;

        }

    }

    checkLose() {

        if (this.playerHand.getHandValue() > 21) {
            this.win = false;
        }
    }

    gameOver() {
        alert('lost');
    }

    setUp() {
        this.deck.deal(this.houseHand);
        this.deck.deal(this.houseHand);

        this.houseHand.getHand()[0].hidden = true //set hide

        this.deck.deal(this.playerHand);
        this.deck.deal(this.playerHand);
    }

    setPot(val) {
        this.pot = val;
    }

    setBet(val) {
        this.bet = val;
    }

    nextDeal() {
        this.deck = new Deck();
        this.deck.shuffle();
        this.deck.shuffle();
        // deck.shuffle();
        let masterDeck = this.deck.deck;
        this.houseHand = new Hand();
        this.playerHand = new Hand();
        this.deck.deal(this.houseHand);
        this.deck.deal(this.houseHand);
        this.houseHand.getHand()[0].hidden = true //set hide
        this.deck.deal(this.playerHand);
        this.deck.deal(this.playerHand);

        this.win = false;
        this.bet = 0;
        this.inPlay = false;
        this.hasBet = false;


    }
}