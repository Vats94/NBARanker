import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link } from "react-router-dom";

const Record = (props) => (
  <tr>
    <td>{props.record.rank}</td>
    <td>{props.record.playerName}</td>
  </tr>
);


export default class RecordList extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.state = { records: [], loading: false, error: false };
  }

  async getRecords(){
    this.setState({loading: true});
    await axios
      .get("http://localhost:3000/record/")
      .then((response) => {
        this.setState({ records: response.data });
          this.setState({loading: false});
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will get the data from the database.
  componentDidMount() {
    
    this.getRecords();
    /*
    axios
      .get("http://localhost:3000/record/")
      .then((response) => {
        this.setState({ records: response.data });
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
      */
  }

  // This method will map out the users on the table
  recordList() {
    let sortedElos = this.state.records.sort(function(a, b) {
      return parseFloat(b.Elo) - parseFloat(a.Elo);
    });
    var rankedElos = []
    for(var i = 0; i < sortedElos.length; i++){
      rankedElos[i] = {
                        'id': sortedElos[i]['id'],
                        'playerName':sortedElos[i].playerName,
                        'Elo': sortedElos[i].Elo,
                        'rank': i+1
                        }
    }
    return rankedElos.map((currentrecord) => {
      return (
        <Record
          record={currentrecord}
          key={currentrecord._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  render() {
    const{error,loading} = this.state;
    if(loading){
      return <h1 className="spinner">Loading</h1>; // add a spinner or something until the posts are loaded
    }
    if(error){
      return <h1 className="spinner">Error</h1>; // add a spinner or something until the posts are loaded
    }
    return (
      <div>
        <h3>Top 50 Current NBA Players</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player Name</th>
            </tr>
          </thead>
          <tbody>{this.recordList()}</tbody>
        </table>
      </div>
    );
  }
}