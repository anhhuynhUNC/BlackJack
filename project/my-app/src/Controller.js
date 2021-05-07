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

        this.currency = "USD";
        this.test = 1000;

        this.test2 = [1, 2, 4, 5];
        this.lowestScore = 2500;
        this.highScore = this.pot;

        //second Kit
        this.playerHand2 = null;
        this.splitMode = false;
        this.inPlay2 = true; //always true if no split
        this.hasSet2 = true;
        this.hasSet1 = false;
        this.bet2 = 0;
    }

    setHouse() {
        if (!this.splitMode) {
            if (this.houseHand.getHandValue() >= 17) {
                this.checkWin();
            } else {
                this.dealHouse();

            }
        } else {
            if (this.hasSet1 && this.hasSet2) {
                if (this.houseHand.getHandValue() >= 17) {
                    this.checkWin();
                } else {
                    this.dealHouse();
                }
            }
        }
    }

    dealHouse() {

        while (this.houseHand.getHandValue() < 17) {

            this.deck.deal(this.houseHand)
        }

        this.checkWin();

    }

    checkWin() {
        if (!this.splitMode) {
            if (this.houseHand.getHandValue() > this.playerHand.getHandValue() && this.houseHand.getHandValue() <= 21) {

            } else if (this.houseHand.getHandValue() < this.playerHand.getHandValue() || this.houseHand.getHandValue() > 21) {
                this.win = true;
                if (this.playerHand.getHandValue() === 21) {
                    this.pot += this.bet;
                    this.pot += this.bet * 1.5;
                    Math.round(this.pot)

                    if (this.pot > this.highScore) {
                        this.highScore = this.pot;
                    }
                } else {
                    this.pot += (this.bet + this.bet);
                    if (this.pot > this.highScore) {
                        this.highScore = this.pot;
                    }
                }
            } else {
                this.pot += this.bet;
            }
        } else {
            if (this.playerHand.getHandValue() <= 21) {
                if (this.houseHand.getHandValue() > this.playerHand.getHandValue() && this.houseHand.getHandValue() <= 21) {

                } else if (this.houseHand.getHandValue() < this.playerHand.getHandValue() || this.houseHand.getHandValue() > 21) {
                    this.win = true;
                    if (this.playerHand.getHandValue() === 21) {
                        this.pot += this.bet;
                        this.pot += this.bet * 1.5;
                        Math.round(this.pot)

                        if (this.pot > this.highScore) {
                            this.highScore = this.pot;
                        }
                    } else {

                        this.pot += (this.bet + this.bet);
                        if (this.pot > this.highScore) {
                            this.highScore = this.pot;
                        }
                    }
                } else {

                    this.pot += this.bet;
                }
            }
            if (this.playerHand2.getHandValue() <= 21) {
                if (this.houseHand.getHandValue() > this.playerHand2.getHandValue() && this.houseHand.getHandValue() <= 21) {

                } else if (this.houseHand.getHandValue() < this.playerHand2.getHandValue() || this.houseHand.getHandValue() > 21) {
                    this.win = true;
                    if (this.playerHand.getHandValue() === 21) {
                        this.pot += this.bet2;
                        this.pot += this.bet2 * 1.5;
                        Math.round(this.pot)

                        if (this.pot > this.highScore) {
                            this.highScore = this.pot;
                        }
                    } else {

                        this.pot += (this.bet2 + this.bet2);
                        if (this.pot > this.highScore) {
                            this.highScore = this.pot;
                        }
                    }
                } else {

                    this.pot += this.bet2;
                }
            }



        }
    }

    checkLose() {

        if (this.playerHand.getHandValue() > 21) {
            this.win = false;
        }
    }

    gameOver() {

        //set Css reveal Modal
        let modal = document.getElementById('lostModal');
        let body = document.getElementById('topContainer');
        body.style.opacity = 0.5;
        modal.style.display = 'block';
        modal.style.opacity = 1;

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
        this.deck.deal(this.playerHand);
        this.deck.deal(this.playerHand);

        this.houseHand.getHand()[0].hidden = true
        this.houseHand.getHand()[0].isFirstHidden = true         //Force hide first house
        this.houseHand.getHand()[1].hidden = true                //
        this.playerHand.getHand()[0].hidden = true               //
        this.playerHand.getHand()[1].hidden = true               //set hide


        this.win = false;
        this.bet = 0;
        this.inPlay = false;
        this.hasBet = false;

        this.playerHand2 = null;
        this.splitMode = false;
        this.inPlay2 = true; //always true if no split
        this.hasSet2 = true;
        this.hasSet1 = false;
        this.bet2 = 0;
    }

    restart() {
        this.deck = new Deck();
        this.deck.shuffle();
        this.deck.shuffle();
        // deck.shuffle();
        let masterDeck = this.deck.deck;
        this.houseHand = new Hand();
        this.playerHand = new Hand();
        this.deck.deal(this.houseHand);
        this.deck.deal(this.houseHand);
        this.deck.deal(this.playerHand);
        this.deck.deal(this.playerHand);

        this.houseHand.getHand()[0].hidden = true
        this.houseHand.getHand()[0].isFirstHidden = true         //Force hide first house
        this.houseHand.getHand()[1].hidden = true                //
        this.playerHand.getHand()[0].hidden = true               //
        this.playerHand.getHand()[1].hidden = true               //set hide


        this.win = false;
        this.bet = 0;
        this.inPlay = false;
        this.hasBet = false;

        this.test = 1000;

        this.test2 = [1, 2, 4, 5];
        this.lowestScore = 2500;
        this.highScore = this.pot;


        this.playerHand2 = null;
        this.splitMode = false;
        this.inPlay2 = true; //always true if no split
        this.hasSet2 = true;
        this.hasSet1 = false;
        this.bet2 = 0;
    }
}