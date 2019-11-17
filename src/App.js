import React, { useState } from 'react';
import {
    groupedSumByFoodCategory,
    dailyMinimalCaloriesFor,
    groupedSumByFoodCategoryContainsFood,
    planFoodForOneDay
} from './functions';
import './App.css';

import { Button, Select, MenuItem, TextField, Table, TableBody, TableHead, TableRow, TableCell } from "@material-ui/core";

function App() {

    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    const [foodCount, setFoodCount] = useState(0);
    const [foodToAdd, setFoodToAdd] = useState(false);
    const [foodList, setFoodList] = useState([]);
    const [result, setResult] = useState([]);
    const [maxResultIndex, setMaxResultIndex] = useState(0);

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
        const foodName = document.getElementById('foodName').textContent;
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
        var foodNames = foodList.map((foodItem) => { return foodItem.name });
        fetch('https://how-to-eat.eu-gb.cf.appdomain.cloud/names/' + foodNames.join(",").toLowerCase())
            .then(raw => {
                return raw.json();
            }).then(apiResponse => {
                var response = {};
                for (var i = 0; i < apiResponse.length; i++) {
                    var item = apiResponse[i];
                    response[item.foodname] = item;
                }

                var groupedSum = groupedSumByFoodCategory(foodList, response);
                var dailyCalories = dailyMinimalCaloriesFor({ adults: adultCount, children: childCount });

                var menuForDay = [];
                while (groupedSumByFoodCategoryContainsFood(groupedSum)) {
                    menuForDay.push(planFoodForOneDay(groupedSum, dailyCalories));
                }

                console.log(menuForDay);
                setResult(menuForDay);
                var maxIndex = 0;

                console.log('menForDay:', menuForDay);
                menuForDay.forEach(element => {
                    console.log('element:', element, 'keys:', Object.keys(element));
                    if (maxIndex < (Object.keys(element).length)) {
                        maxIndex = (Object.keys(element).length);
                    }
                });
                console.log(maxIndex);
                setMaxResultIndex(maxIndex);
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
        <div className="App">
            <div className="header"><h1>How to eat</h1></div>
            <div className="people">
                <div className="addPeopleButtonsContainer">
                    <Button onClick={addAdult}>Add an adult</Button>
                    <Button onClick={addChild}>Add a child</Button>
                </div>
                <div className="listPeople">
                    <p>Adults: {adultCount} <Button onClick={removeAdult}>-</Button></p><br />
                    <p>Children: {childCount} <Button onClick={removeChild}>-</Button></p>
                </div>
            </div>
            <div className="addFood">
                <Button onClick={addFood}>Add food</Button>
                <p>Food count in list: {foodCount}</p>
                {foodToAdd &&
                    <div className="addFoodForm">
                        <Select id="foodName" defaultValue="apple">
                            <MenuItem value="apple">apple</MenuItem>
                            <MenuItem value="rice">rice</MenuItem>
                            <MenuItem value="pasta">pasta</MenuItem>
                            <MenuItem value="chocolate">chocolate</MenuItem>
                            <MenuItem value="pork">pork</MenuItem>
                            <MenuItem value="beans">beans</MenuItem>
                        </Select>
                        <TextField id="quantity" type="number" placeholder="quantity" />
                        <Select id="unit" defaultValue="gr">
                            <MenuItem value="gr">grams</MenuItem>
                            <MenuItem value="piece">pieces</MenuItem>
                        </Select>
                        <Button onClick={handleSubmit}>Add</Button>
                    </div>
                }
            </div>
            <div className="listFood">
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
            </div>
            <Button onClick={handleCalculate}>Calculate</Button>
            <div>
                {result.length > 0 &&
                    <Table>
                        <TableHead>
                            <TableRow>
                                {result.map(resultItem =>
                                    <TableCell>Day {result.indexOf(resultItem) + 1}</TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.apply(null, Array(maxResultIndex)).map((value, i) => {
                                    return (<TableRow>
                                        {result.map(resultItem => {
                                            var element = resultItem[Object.keys(resultItem)[i]];
                                            console.log(element);
                                            if (element) {
                                                return (<TableCell>{Math.round(element.totalCalories / element.calories)} {element.unit} {element.name}  </TableCell>)
                                            } else {
                                                return (<TableCell> </TableCell>);
                                            }
                                        })}
                                    </TableRow>);
                            })}
                        </TableBody>
                    </Table>
                }
            </div>
        </div>
    );
}

export default App;
