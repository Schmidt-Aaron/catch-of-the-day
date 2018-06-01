import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from "./Fish";
import base from '../base';
import PropTypes from 'prop-types'; 

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.object
  }
  
  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentDidUpdate(){
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
  }
  
  addFish = (fish) => {
    console.log('adding a fish')
    const fishes = {...this.state.fishes};
    fishes[`fish${Date.now()}`] = fish;
    this.setState({
      fishes
    })
  };

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish
    this.setState({ fishes });
  }

  deleteFish = key => {
    const fishes = { ...this.state.fishes };
    fishes[key] = null;
    this.setState({ fishes });
  }

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    })  
  };

  addToOrder = (fish) => {
    const order = { ...this.state.order };
    order[fish] = order[fish] + 1 || 1;
    this.setState({ order });
  }

  removeFromOrder = key => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
  }
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(fish => (
            <Fish 
              key={fish} 
              index={fish}
              details={this.state.fishes[fish]} 
              addToOrder={this.addToOrder}
            >{fish}</Fish>
            )
          )}
          </ul>
        </div>  
        <Order 
          fishes={this.state.fishes} 
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}  
        />
        <Inventory 
          addFish={this.addFish}
          updateFish={this.updateFish} 
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes} 
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;