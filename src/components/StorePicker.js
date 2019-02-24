import React from "react";

import { getFunName } from "../helpers";

export default class StorePicker extends React.Component {
    render() {
        return(
            <form className="store-selector" onSubmit={ this.goToScore.bind(this) }>
                <h2>Please enter a store</h2>
                <input type="text" required placeholder="Store Name" defaultValue={ getFunName() } 
                ref={ input => this.storeInput = input } />
                <button type="submit">Visit store</button>
            </form>
        );
    }

    goToScore(e) {
        e.preventDefault();
        const storeId = this.storeInput.value;
        this.context.router.transitionTo(`/store/${storeId}`);
    }
}

StorePicker.contextTypes = { 
    router: React.PropTypes.object
};