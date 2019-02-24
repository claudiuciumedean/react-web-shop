import React from "react";
import base from "../base";

import FishForm from "./FishForm";

export default class Inventory extends React.Component {
    constructor() {
        super();
        this.state = {
            userId: null,
            owner: null
        } 

        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.logout = this.logout.bind(this);
    }

    render() {
        const logutBtn = <button onClick={this.logout}>Log out!</button>

        if(!this.state.userId) {
            return this.renderLogin();
        }

        if(this.state.userId !== this.state.owner) {
            return (
                <div>                    
                    <p>Sorry you are not the owner of this store!</p>
                    {logutBtn}
                </div>
            );
        }

        return(
            <div>
                <h2>Inventory</h2>
                {logutBtn}
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <FishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSamples}>Load Sample FIshes</button>
            </div>
        );
    }

    componentDidMount() {
        base.onAuth(user => {
            if(user) { this.authHandler(null, { user }); }
        });
    }

    renderInventory(key) {
        const fish = this.props.fishes[key];

        return (
            <div className="fish-edit" key={key}>
                <input type="text" name="name" placeholder="Fish Name" value={fish.name} onChange={e => this.handleChange(e, key, fish)}/>
                <input type="text" name="price" placeholder="Fish Price" value={fish.price} onChange={e => this.handleChange(e, key, fish)}/>
                <select type="text" name="status" placeholder="Fish Status" value={fish.status} onChange={e => this.handleChange(e, key, fish)}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea type="text" name="description" placeholder="Fish Description" value={fish.description} onChange={e => this.handleChange(e, key, fish)}></textarea>
                <input type="text" name="image" placeholder="Fish Image" value={fish.image} onChange={e => this.handleChange(e, key, fish)}/>
                <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
            </div>
        );
    }

    handleChange(e, key, fish) {
        const elem = e.target;
        this.props.updateFish(key, {
            ...fish,
            [elem.name]: elem.value
        });
    }

    renderLogin() {
        return (
            <nav>
                <h2>Inventory</h2>
                <p>Sign in to manage your store's inventory</p>
                <button className="github" onClick={this.authenticate}>Log in with GitHub</button>
            </nav>
        );
    }

    authenticate() {
        base.authWithOAuthPopup("github", this.authHandler);
    }

    logout() {
        base.unauth();
        this.setState({ userId: null });
    }

    authHandler(err, authData) {
        if(err) { throw err; }

        const storeRef = base.database().ref(this.props.storeId);
        storeRef.once("value", snapshot => {
            const data = snapshot.val() || {};
            const userId = authData.user.uid;

            if(!data.owner) {
                storeRef.set({ owner: userId });
            }

            this.setState({
                userId,
                owner: data.owner ||  userId
            });
        });
    }
}

Inventory.propTypes = {
    fishes: React.PropTypes.object.isRequired,
    addFish: React.PropTypes.func.isRequired,
    removeFish: React.PropTypes.func.isRequired,
    updateFish: React.PropTypes.func.isRequired,
    loadSamples: React.PropTypes.func.isRequired,
    storeId: React.PropTypes.string.isRequired,
};