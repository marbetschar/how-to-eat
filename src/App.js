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
        const unit = document.getElementById('unitSelect').textContent;

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
        console.log('https://how-to-eat.eu-gb.cf.appdomain.cloud/names/' + foodNames.join(","));
        fetch('https://how-to-eat.eu-gb.cf.appdomain.cloud/names/' + foodNames.join(","))
            .then(raw => {
                return raw.json();
            }).then(apiResponse => {
                var response = {};
                for( var i = 0; i < apiResponse.length; i++){
                    response[apiResponse[i].foodname] = apiResponse[i];
                }
                var groupedSum = groupedSumByFoodCategory(foodList, response);
                var dailyCalories = dailyMinimalCaloriesFor({ adults: adultCount, children: childCount });

                var menuForDay = [];
                while (groupedSumByFoodCategoryContainsFood(groupedSum)) {
                    menuForDay.push(planFoodForOneDay(groupedSum, dailyCalories));
                }

                setResult(menuForDay);
                var maxIndex = 0;

                menuForDay.forEach(element => {
                    if (maxIndex < (Object.keys(element).length)) {
                        maxIndex = (Object.keys(element).length);
                    }
                });
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
                            <p>How many children?</p>
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
                                <Select id="foodName" defaultValue="rice">
                                    <MenuItem value="rice">rice</MenuItem>
                                    <MenuItem value="pasta">pasta</MenuItem>
                                    <MenuItem value="chocolate">chocolate</MenuItem>
                                    <MenuItem value="pork">pork</MenuItem>
                                    <MenuItem value="beans">beans</MenuItem>
                                </Select>
                                <TextField id="quantity" type="number" placeholder="quantity" />
                                <FormControl>
                                <Select id="unitSelect" defaultValue="gr">
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
                                                var cals = element.totalCalories / element.calories;
                                                if(element.ratio){
                                                    cals = cals / element.ratio;
                                                } else {
                                                    cals = cals * 100;
                                                }
                                                return (<TableCell>{Math.round(cals * 100) / 100 } {element.unit} {element.name}  </TableCell>)
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
