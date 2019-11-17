import React, { useState } from 'react';
import {
    groupedSumByFoodCategory,
    dailyMinimalCaloriesFor,
    groupedSumByFoodCategoryContainsFood,
    planFoodForOneDay
} from './functions';
import './App.css';

import { Button, Select, MenuItem, TextField, Table, TableBody, TableHead, TableRow, TableCell, InputLabel, FormControl } from "@material-ui/core";

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
            name: foodName,
            quantity: quantity,
            unit: unit
        };

        foodList.push(foodObject);
        setFoodCount(foodCount + 1);
        setFoodToAdd(false);
    };

    const handleCalculate = () => {
        console.log(foodList);
        var foodNames = foodList.map((foodItem) => { return foodItem.name });
        console.log('https://how-to-eat.eu-gb.cf.appdomain.cloud/names/' + foodNames.join(","));
        fetch('https://how-to-eat.eu-gb.cf.appdomain.cloud/names/' + foodNames.join(","))
            .then(apiResponse => {
                console.log('foodList:', foodList);
                var groupedSum = groupedSumByFoodCategory(foodList, apiResponse);
                var dailyCalories = dailyMinimalCaloriesFor({ adults: adultCount, children: childCount });

                var menuForDay = [];
                while (groupedSumByFoodCategoryContainsFood(groupedSum)) {
                    menuForDay.push(planFoodForOneDay(groupedSum, dailyCalories));
                }
                console.log(menuForDay);
            })
            .catch((error) => {
                console.error(error);
            })
    };

    const removeItemFromList = (index) => {
        console.log('item', index);
        console.log('size', foodList.length);
        foodList.splice(index, 1);
        console.log('list', foodList);
    };


    return (
        <div className="App col-md-12">
            <div className="header"><h1>How to eat</h1></div>
            <div class="row">
                <div className="people col-md-4">
                    <div className="listPeople">
                        <div class="adult"><p>How many adults?</p>
                            <Button onClick={addAdult}>+</Button>
                            <p>{adultCount}</p>
                            <Button onClick={removeAdult}>-</Button>
                        </div>
                        <div class="child">
                            <p>How man children?</p>
                            <Button onClick={addChild}>+</Button>
                            <p>{childCount}</p>
                            <Button onClick={removeChild}>-</Button>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div className="addFood">
                        <div className="listFood">
                            <p>Food count in list: {foodCount}</p>
                            {foodList.length > 0 &&
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><b>Food name</b></TableCell>
                                            <TableCell><b>Quantity</b></TableCell>
                                            <TableCell><b>Unit</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {foodList.map(foodItem =>
                                            <TableRow>
                                                <TableCell>{foodItem.name}</TableCell>
                                                <TableCell>{foodItem.quantity}</TableCell>
                                                <TableCell>{foodItem.unit}</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            }
                            <div className="addFoodForm">
                                <TextField id="foodName" placeholder="food name" />
                                <TextField id="quantity" type="number" placeholder="quantity" />
                                <FormControl>
                                <InputLabel id="unit">unit</InputLabel>
                                <Select id="unit">
                                    <MenuItem value="gr">grams</MenuItem>
                                    <MenuItem value="piece">pieces</MenuItem>
                                </Select>
                                </FormControl>
                            </div>
                            <Button onClick={handleSubmit}>Add</Button>
                        </div>
                    </div>
                </div>

            </div>
            <div class="result">
                <Button onClick={handleCalculate}>Calculate</Button>
            </div>
        </div>
    );
}

export default App;
