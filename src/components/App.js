import React from "react";
import base from "../base";

import sampleFishes from "../sample-fishes"

import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            fishes: {},
            order: {}
        };

        this.updateFish = this.updateFish.bind(this);
        this.addFish = this.addFish.bind(this);
        this.removeFish = this.removeFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.removeFromOrder = this.removeFromOrder.bind(this);
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">                
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="list-of-fishes">
                        {
                        Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
                        }
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder}
                    params={this.props.params}
                />
                <Inventory 
                    addFish={this.addFish} 
                    updateFish={this.updateFish}
                    removeFish={this.removeFish}
                    loadSamples={this.loadSamples} 
                    fishes={this.state.fishes} 
                    storeId={this.props.params.storeId}
                />
            </div>
        );
    }

    componentWillMount() {
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });

        const existingOrder = localStorage.getItem(`oder-${this.props.params.storeId}`);
        if(existingOrder) { this.setState({ order: JSON.parse(existingOrder) }); }
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`oder-${this.props.params.storeId}`, JSON.stringify(nextState.order));
    }

    addFish(fish) {
        const fishes = {...this.state.fishes};
        fishes[`fish-${Date.now()}`] = fish;

        this.setState({ fishes });
    }

    updateFish(key, fish) {
        const fishes = {...this.state.fishes};
        fishes[key] = fish;

        this.setState({ fishes });
    }

    removeFish(key) {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({ fishes })
    }

    loadSamples() {
        this.setState({ fishes: sampleFishes });
    }

    addToOrder(key) {
        const order = {...this.state.order};
        order[key] = order[key] + 1 || 1;
        this.setState({ order });
    }

    removeFromOrder(key) {
        const order = {...this.state.order};
        delete order[key];
        this.setState({ order });
    }
}

App.propTypes = {
    params: React.PropTypes.object.isRequired
};