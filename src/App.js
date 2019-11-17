import React, {useState} from 'react';
import './App.css';

import {Button, Select, MenuItem, TextField} from "@material-ui/core";

function App() {

    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    const [foodCount, setFoodCount] = useState(0);
    const [foodToAdd, setFoodToAdd] = useState(false);
    const [foodList, setFoodList] = useState([]);

    const addAdult = () => {
        setAdultCount(adultCount + 1);
    };

    const addChild = () => {
        setChildCount(childCount + 1);
    };

    const removeAdult = () => {
        if (adultCount > 0) {
            setAdultCount(adultCount - 1);
        }
    };

    const removeChild = () => {
        if (childCount > 0) {
            setChildCount(childCount - 1);
        }
    };

    const addFood = () => {
        setFoodToAdd(true);
    };

    const handleSubmit = () => {
        const foodName = document.getElementById('foodName').value;
        const quantity = document.getElementById('quantity').value;
        const unit = document.getElementById('unit').textContent;

        const foodObject = {
            foodName: foodName,
            quantity: quantity,
            unit: unit
        };

        foodList.push(foodObject);
        setFoodCount(foodCount + 1);
        setFoodToAdd(false);
    };

    return (
    <div className="App">
        <div>
            <Button onClick={addAdult}>Add an adult</Button>
            <Button onClick={addChild}>Add a child</Button>
            <p>adultCount {adultCount} <Button onClick={removeAdult}>-</Button></p>
            <p>childCount {childCount} <Button onClick={removeChild}>-</Button></p>
        </div>
        <div>
            <Button onClick={addFood}>Add food</Button>
            <p>food count {foodCount}</p>
            {foodToAdd &&
                <div>
                    <from>
                        <TextField id="foodName" placeholder="food name" />
                        <TextField id="quantity" type="number" placeholder="quantity (enter number only)" />
                        <Select id="unit">
                            <MenuItem value="kg">kg</MenuItem>
                            <MenuItem value="piece">piece</MenuItem>
                        </Select>
                        <Button onClick={handleSubmit}>Add</Button>
                    </from>
                </div>
            }

        </div>
    </div>
  );
}

export default App;
