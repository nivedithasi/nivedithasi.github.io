// Cricket match simulation
class CricketMatch {
    constructor() {
        console.log('Initializing cricket match...');
        this.runs = 0;
        this.wickets = 0;
        this.overs = 0;
        this.balls = 0;
        this.isRunning = true;
        this.commentaryFeed = document.getElementById('commentary-feed');
        this.scoreDisplay = document.getElementById('current-score');
        this.oversDisplay = document.getElementById('overs');
        
        if (!this.commentaryFeed || !this.scoreDisplay || !this.oversDisplay) {
            console.error('Required DOM elements not found!');
            return;
        }

        // Initialize RNG
        this.rng = new Math.seedrandom('hello');

        // Clear initial loading message
        this.commentaryFeed.innerHTML = '';
        
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
        
        console.log('Starting match...');
        // Start the match immediately
        this.initializeMatch();
    }

    initializeMatch() {
        console.log('Initializing match...');
        this.addCommentary("Welcome to the match! India vs Australia is about to begin!");
        this.addCommentary(`${this.currentBatsman} and ${this.nonStriker} are at the crease. ${this.currentBowler} to bowl.`);
        this.simulateBall();
    }

    updateScore() {
        this.scoreDisplay.textContent = `${this.runs}/${this.wickets}`;
        this.oversDisplay.textContent = `(${this.overs}.${this.balls} ov)`;
    }

    addCommentary(text, type = '') {
        console.log('Adding commentary:', text);
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
        console.log('Simulating ball...');
        // Simulate ball outcome
        
        const random = this.rng();
        console.log('RNG value:', random);
        let runs = 0;
        let isWicket = false;

        if (random < 0.5) { // 40% chance of wicket
            isWicket = true;
            this.wickets++;
            console.log('Wicket! RNG was:', random);
        } else if (random < 0.9) { // 50% chance of 4 runs
            runs = 4;
            console.log('Four runs! RNG was:', random);
        } else { // 10% chance of 6 runs
            runs = 6;
            console.log('Six runs! RNG was:', random);
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

        // Schedule next ball with 20 second delay
        setTimeout(() => this.simulateBall(), 10000);
    }
}

// Start the match immediately when the script loads
console.log('Script loaded, creating match instance...');
const match = new CricketMatch(); 
