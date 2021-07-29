import React, { Component }  from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link } from "react-router-dom";



var leftPlayer = []
var rightPlayer = []
var players = []

export default class Vote extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.state = { records: [] };
  }

  async getRecords(){
    await axios
      .get("http://localhost:3000/record/")
      .then((response) => {
        this.setState({ records: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will get the data from the database.
  componentDidMount() {
    axios
      .get("http://localhost:3000/record/")
      .then((response) => {
        this.setState({ records: response.data });
        players = this.state.records;
        var left = Math.floor(Math.random() * (this.state.records.length + 1));
        var right = Math.floor(Math.random() * (this.state.records.length + 1));
        while(right == left){
            right = Math.floor(Math.random() * (this.state.records.length + 1));
        }
        leftPlayer=this.state.records[left];
        rightPlayer=this.state.records[right];
        document.getElementById("left").innerHTML = leftPlayer.playerName;
        document.getElementById("right").innerHTML = rightPlayer.playerName;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  


   leftClick(){
        var lChance = 1 / (1 + Math.pow(10, (rightPlayer.Elo - leftPlayer.Elo)/400));
        lChance = lChance.toFixed(4);

        var lElo = leftPlayer.Elo + (30*(2-lChance));
        lElo = parseInt(lElo);
        

        var rElo = rightPlayer.Elo - (30*(2-lChance));
        rElo = parseInt(rElo);


        leftPlayer.Elo = lElo;
        rightPlayer.Elo = rElo;
            axios({
                method: 'post',
                url: 'http://localhost:3000/update',
                data: {
                  '_id': String(rightPlayer._id),
                  'playerName': rightPlayer.playerName,
                  'Elo': (parseInt(rightPlayer.Elo))
                }
              }).then((response) => {
              });
              axios({
                method: 'post',
                url: 'http://localhost:3000/update',
                data: {
                  '_id': String(leftPlayer._id),
                  'playerName': leftPlayer.playerName,
                  'Elo': (parseInt(leftPlayer.Elo))
                }
              }).then((response) => {
              });
        var left = Math.floor(Math.random() * (players.length));
        var right = Math.floor(Math.random() * (players.length));
        while(right === left){
            right = Math.floor(Math.random() * (players.length));
        }
        leftPlayer= players[left];
        rightPlayer= players[right];
        document.getElementById("left").innerHTML = leftPlayer.playerName;
        document.getElementById("right").innerHTML = rightPlayer.playerName;
    }

    rightClick(){
        var rChance = 1 / (1 + Math.pow(10, (leftPlayer.Elo - rightPlayer.Elo)/400));
        rChance = rChance.toFixed(4);

        var rElo = rightPlayer.Elo + (30*(2-rChance));
        rElo = parseInt(rElo);
 
        var lElo = leftPlayer.Elo - (30*(2-rChance));
        lElo = parseInt(lElo);


        leftPlayer.Elo = lElo;
        rightPlayer.Elo = rElo;
        
        axios({
                method: 'post',
                url: 'http://localhost:3000/update',
                data: {
                  '_id': String(rightPlayer._id),
                  'playerName': rightPlayer.playerName,
                  'Elo': (parseInt(rightPlayer.Elo))
                }
              }).then((response) => {
              });
              axios({
                method: 'post',
                url: 'http://localhost:3000/update',
                data: {
                  '_id': String(leftPlayer._id),
                  'playerName': leftPlayer.playerName,
                  'Elo': (parseInt(leftPlayer.Elo))
                }
              }).then((response) => {
              });

          var left = Math.floor(Math.random() * (players.length));
        var right = Math.floor(Math.random() * (players.length));
        while(right === left){
            right = Math.floor(Math.random() * (players.length));
        }
        leftPlayer= players[left];
        rightPlayer= players[right];

        document.getElementById("left").innerHTML = leftPlayer.playerName;
        document.getElementById("right").innerHTML = rightPlayer.playerName;
    }

    Undecided(){
        var left = Math.floor(Math.random() * (players.length));
        var right = Math.floor(Math.random() * (players.length));
        while(right === left){
            right = Math.floor(Math.random() * (players.length));
        }
        leftPlayer = players[left];
        rightPlayer = players[right];
        document.getElementById("left").innerHTML = leftPlayer.playerName;
        document.getElementById("right").innerHTML = rightPlayer.playerName;
      
    }

    

    


  // This following section will display the table with the records of individuals.
  render() {
    const container = {
        "height": "200px",
        "position": "relative",
      };

      const vertical = {
        'display': "flex",
        'align-items': "center",
        'justify-content': "center"
      }
      const style = {
        "font-size": "2em",
        "height": "5em",
        "width": "10em",
        "margin": "40px 20px",
      }
    return (
        
        
      <div style={container}>

          <div style = {vertical}>
              
        <button style = {style} id="left" class="btn btn-primary" onClick={this.leftClick}>
        
        </button>
        
        <button style = {style} id="right" class="btn btn-primary" onClick={this.rightClick}>
          
        </button>
        </div>
        <br/>
        <div style = {vertical}>
        <button  class="btn btn-secondary" onClick={this.Undecided}>
          Not Sure
        </button>
        </div>
        
      </div>
    );
  }
}