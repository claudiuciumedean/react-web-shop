import React from "react";

export default class FishForm extends React.Component {
    render() {
        return (
            <form ref={input => this.fishForm = input} className="fish-edit" onSubmit={this.createFish.bind(this)}>
                <input ref={input => this.name = input} type="text" placeholder="Fish Name" />
                <input ref={input => this.price = input} type="text" placeholder="Fish Price" />
                <select ref={input => this.status = input}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea ref={input => this.description= input} placeholder="Fish Desc" ></textarea>
                <input ref={input => this.image = input} type="text" placeholder="Fish Image" />
                <button type="submit">+ Add Item</button>
            </form>
        );
    }

    createFish(e) {
        e.preventDefault();
        this.props.addFish({
            name: this.name.value,
            price: this.price.value,
            status: this.status.value,
            description: this.description.value,
            image: this.image.value
        });

        this.fishForm.reset();
    }
}

FishForm.propTypes = {
    addFish: React.PropTypes.func.isRequired
};