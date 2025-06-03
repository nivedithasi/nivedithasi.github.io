// Cricket match simulation
class CricketMatch {
    constructor() {
        this.runs = 0;
        this.wickets = 0;
        this.overs = 0;
        this.balls = 0;
        this.isRunning = false;
        this.commentaryFeed = document.getElementById('commentary-feed');
        this.scoreDisplay = document.getElementById('current-score');
        this.oversDisplay = document.getElementById('overs');
        this.startButton = document.getElementById('start-match');
        this.pauseButton = document.getElementById('pause-match');
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.startButton.addEventListener('click', () => this.startMatch());
        this.pauseButton.addEventListener('click', () => this.pauseMatch());
    }

    startMatch() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startButton.disabled = true;
            this.pauseButton.disabled = false;
            this.simulateBall();
        }
    }

    pauseMatch() {
        this.isRunning = false;
        this.startButton.disabled = false;
        this.pauseButton.disabled = true;
    }

    updateScore() {
        this.scoreDisplay.textContent = `${this.runs}/${this.wickets}`;
        this.oversDisplay.textContent = `(${this.overs}.${this.balls} ov)`;
    }

    addCommentary(text, type = '') {
        const commentaryItem = document.createElement('div');
        commentaryItem.className = `commentary-item ${type}`;
        commentaryItem.textContent = text;
        this.commentaryFeed.insertBefore(commentaryItem, this.commentaryFeed.firstChild);
    }

    generateCommentary(runs, isWicket) {
        const shotTypes = ['drives', 'cuts', 'pulls', 'sweeps', 'defends', 'lofts'];
        const shotType = shotTypes[Math.floor(Math.random() * shotTypes.length)];
        
        if (isWicket) {
            const wicketTypes = [
                'caught behind!',
                'bowled!',
                'LBW!',
                'caught in the deep!',
                'stumped!',
                'run out!'
            ];
            const wicketType = wicketTypes[Math.floor(Math.random() * wicketTypes.length)];
            return `WICKET! ${wicketType}`;
        }

        if (runs === 0) {
            return `Good delivery, batsman ${shotType} but can't get it away.`;
        } else if (runs === 4) {
            return `FOUR! Beautiful ${shotType} through the covers!`;
        } else if (runs === 6) {
            return `SIX! Massive ${shotType} over the boundary!`;
        } else {
            return `${runs} runs, batsman ${shotType} and takes ${runs} run${runs > 1 ? 's' : ''}.`;
        }
    }

    simulateBall() {
        if (!this.isRunning) return;

        // Simulate ball outcome
        const random = Math.random();
        let runs = 0;
        let isWicket = false;

        if (random < 0.1) { // 10% chance of wicket
            isWicket = true;
            this.wickets++;
        } else if (random < 0.3) { // 20% chance of 0 runs
            runs = 0;
        } else if (random < 0.6) { // 30% chance of 1-3 runs
            runs = Math.floor(Math.random() * 3) + 1;
        } else if (random < 0.85) { // 25% chance of 4 runs
            runs = 4;
        } else { // 15% chance of 6 runs
            runs = 6;
        }

        // Update score
        this.runs += runs;
        this.balls++;

        // Update overs
        if (this.balls === 6) {
            this.overs++;
            this.balls = 0;
        }

        // Generate and add commentary
        const commentary = this.generateCommentary(runs, isWicket);
        this.addCommentary(commentary, isWicket ? 'wicket' : runs >= 4 ? 'boundary' : '');

        // Update score display
        this.updateScore();

        // Schedule next ball
        setTimeout(() => this.simulateBall(), 3000);
    }
}

// Initialize the match when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const match = new CricketMatch();
}); 