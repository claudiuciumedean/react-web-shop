import React from "react";

import { formatPrice } from "../helpers";

export default class Fish extends React.Component {
    render() {
        const { details, index } = this.props;
        const isAvailable = details.status === "available";

        return (
            <li className="menu-fish">
                <img src={details.image} alt={details.name}/>
                <h3 className="fish-name">
                    {details.name}
                    <span className="price">{formatPrice(details.price)}</span>
                </h3>
                <p>{details.description}</p>
                <button disabled={!isAvailable} onClick={() => this.props.addToOrder(index)}>{isAvailable ? "Add To Order" : "Sold Out!"}</button>
            </li>
        );
    }
}

Fish.propTypes = {
    details: React.PropTypes.object.isRequired,
    index: React.PropTypes.string.isRequired,
    addToOrder: React.PropTypes.func.isRequired,
};