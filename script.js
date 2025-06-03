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
        
        // Team definitions
        this.indiaTeam = [
            'Rohit Sharma (Captain)',
            'Shubman Gill (Vice-Captain)',
            'Virat Kohli',
            'KL Rahul (Wicketkeeper)',
            'Rishabh Pant (Wicketkeeper)',
            'Hardik Pandya',
            'Axar Patel',
            'Ravindra Jadeja',
            'Washington Sundar',
            'Kuldeep Yadav',
            'Mohammed Shami',
            'Arshdeep Singh',
            'Harshit Rana',
            'Varun Chakravarthy'
        ];

        this.australiaTeam = [
            'Steve Smith (Captain)',
            'Travis Head',
            'Marnus Labuschagne',
            'Glenn Maxwell',
            'Josh Inglis (Wicketkeeper)',
            'Alex Carey (Wicketkeeper)',
            'Jake Fraser-McGurk',
            'Matthew Short',
            'Aaron Hardie',
            'Ben Dwarshuis',
            'Sean Abbott',
            'Nathan Ellis',
            'Spencer Johnson',
            'Tanveer Sangha',
            'Adam Zampa'
        ];

        // Current players
        this.currentBatsman = this.indiaTeam[0];
        this.nonStriker = this.indiaTeam[1];
        this.currentBowler = this.australiaTeam[10]; // Starting with Sean Abbott
        this.nextBatsmanIndex = 2;
        
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
            this.addCommentary("Welcome to the match! India vs Australia is about to begin!");
            this.addCommentary(`${this.currentBatsman} and ${this.nonStriker} are at the crease. ${this.currentBowler} to bowl.`);
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

    getRandomPlayer(team) {
        return team[Math.floor(Math.random() * team.length)];
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
            
            // Get the new batsman first
            const newBatsman = this.indiaTeam[this.nextBatsmanIndex];
            // Create the commentary with the current batsman (who got out)
            const commentary = `WICKET! ${this.currentBatsman} ${wicketType} ${this.currentBowler} strikes! ${newBatsman} comes to the crease.`;
            
            // Update the next batsman index
            this.nextBatsmanIndex = (this.nextBatsmanIndex + 1) % this.indiaTeam.length;
            // Update current batsman after creating the commentary
            this.currentBatsman = newBatsman;
            
            return commentary;
        }

        if (runs === 0) {
            return `${this.currentBatsman} ${shotType} but can't get it away. Good delivery from ${this.currentBowler}.`;
        } else if (runs === 4) {
            return `FOUR! ${this.currentBatsman} with a beautiful ${shotType} through the covers! ${this.currentBowler} looks frustrated.`;
        } else if (runs === 6) {
            return `SIX! ${this.currentBatsman} with a massive ${shotType} over the boundary! ${this.currentBowler} under pressure.`;
        } else {
            return `${runs} runs, ${this.currentBatsman} ${shotType} and takes ${runs} run${runs > 1 ? 's' : ''}.`;
        }
    }

    simulateBall() {
        if (!this.isRunning) return;

        // Simulate ball outcome
        const random = Math.random();
        let runs = 0;
        let isWicket = false;

        if (random < 0.2) { // 20% chance of wicket (increased from 10%)
            isWicket = true;
            this.wickets++;
        } else if (random < 0.4) { // 20% chance of 0 runs
            runs = 0;
        } else if (random < 0.7) { // 30% chance of 1-3 runs
            runs = Math.floor(Math.random() * 3) + 1;
        } else if (random < 0.9) { // 20% chance of 4 runs
            runs = 4;
        } else { // 10% chance of 6 runs
            runs = 6;
        }

        // Update score
        this.runs += runs;
        this.balls++;

        // Update overs
        if (this.balls === 6) {
            this.overs++;
            this.balls = 0;
            // Change bowler after every over
            this.currentBowler = this.getRandomPlayer(this.australiaTeam);
            this.addCommentary(`End of the over. ${this.currentBowler} will bowl the next over.`);
        }

        // Generate and add commentary
        const commentary = this.generateCommentary(runs, isWicket);
        this.addCommentary(commentary, isWicket ? 'wicket' : runs >= 4 ? 'boundary' : '');

        // Update score display
        this.updateScore();

        // Schedule next ball with increased delay (8 seconds instead of 5)
        setTimeout(() => this.simulateBall(), 8000);
    }
}

// Initialize the match when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const match = new CricketMatch();
}); 