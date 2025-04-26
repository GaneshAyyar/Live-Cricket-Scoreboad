class Player {
  constructor(name) {
    this.name = name;
    this.runs = 0;
    this.balls = 0;
    this.fours = 0;
    this.sixes = 0;
    this.out = false;
    this.next = null;
  }
}

class Team {
  constructor() {
    this.head = null;
    this.totalScore = 0;
    this.totalWickets = 0;
    this.totalBalls = 0;
  }

  addPlayer(name) {
    const newPlayer = new Player(name);
    if (!this.head) {
      this.head = newPlayer;
    } else {
      let temp = this.head;
      while (temp.next) temp = temp.next;
      temp.next = newPlayer;
    }
    this.displayScoreboard();
  }

  removePlayer(name) {
    let temp = this.head, prev = null;
    while (temp && temp.name !== name) {
      prev = temp;
      temp = temp.next;
    }
    if (!temp) {
      alert("Player not found!");
      return;
    }
    if (!prev) {
      this.head = temp.next;
    } else {
      prev.next = temp.next;
    }
    this.displayScoreboard();
  }

  updateScore(name, run) {
    let temp = this.head;
    while (temp) {
      if (temp.name === name) {
        if (temp.out) {
          alert("Player is already out!");
          return;
        }
        temp.runs += run;
        temp.balls += 1;
        this.totalScore += run;
        this.totalBalls++;
        if (run === 4) temp.fours++;
        if (run === 6) temp.sixes++;
        this.addCommentary(`${name} hits ${run} runs!`);
        this.displayScoreboard();
        return;
      }
      temp = temp.next;
    }
    alert("Player not found!");
  }

  markOut(name) {
    let temp = this.head;
    while (temp) {
      if (temp.name === name) {
        if (temp.out) {
          alert("Player already out!");
          return;
        }
        temp.out = true;
        this.totalWickets++;
        this.totalBalls++;
        this.addCommentary(`${name} is OUT!`);
        this.displayScoreboard();
        return;
      }
      temp = temp.next;
    }
    alert("Player not found!");
  }

  addCommentary(text) {
    const commentaryList = document.getElementById('commentaryList');
    const li = document.createElement('li');
    li.textContent = text;
    commentaryList.prepend(li);
  }

  displayScoreboard() {
    let temp = this.head;
    const tbody = document.querySelector('#scoreboard tbody');
    tbody.innerHTML = '';

    while (temp) {
      const sr = temp.balls > 0 ? ((temp.runs / temp.balls) * 100).toFixed(2) : 0;
      const row = `
        <tr>
          <td>${temp.name}</td>
          <td>${temp.runs}</td>
          <td>${temp.balls}</td>
          <td>${temp.fours}</td>
          <td>${temp.sixes}</td>
          <td>${sr}</td>
          <td>${temp.out ? "Out" : "Not Out"}</td>
        </tr>
      `;
      tbody.innerHTML += row;
      temp = temp.next;
    }

    const overs = Math.floor(this.totalBalls / 6) + '.' + (this.totalBalls % 6);
    document.getElementById('score').innerText = `Total Score: ${this.totalScore}/${this.totalWickets} (${overs} overs)`;
  }
}

const team = new Team();

function addPlayer() {
  const name = document.getElementById('playerName').value.trim();
  if (name) {
    team.addPlayer(name);
    document.getElementById('playerName').value = '';
  }
}

function removePlayer() {
  const name = document.getElementById('playerName').value.trim();
  if (name) {
    team.removePlayer(name);
    document.getElementById('playerName').value = '';
  }
}

function updateScore() {
  const name = document.getElementById('updatePlayerName').value.trim();
  const runs = parseInt(document.getElementById('runsScored').value);
  if (name && !isNaN(runs)) {
    team.updateScore(name, runs);
    document.getElementById('updatePlayerName').value = '';
    document.getElementById('runsScored').value = '';
  }
}

function scoreFour() {
  const name = document.getElementById('updatePlayerName').value.trim();
  if (name) team.updateScore(name, 4);
}

function scoreSix() {
  const name = document.getElementById('updatePlayerName').value.trim();
  if (name) team.updateScore(name, 6);
}

function markOut() {
  const name = document.getElementById('updatePlayerName').value.trim();
  if (name) team.markOut(name);
}
