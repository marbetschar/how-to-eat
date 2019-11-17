import React from "react";
import {Button, Input, MenuItem, Select} from "@material-ui/core";

function Food() {

    return (
        <div>
            <from>
                <Input name="foodName" placeholder="food name"/>
                <Input name="quantity" type="number" placeholder="quantity (enter number only)"/>
                <Select >
                    <MenuItem value={10}>kg</MenuItem>
                    <MenuItem value={10}>piece</MenuItem>
                </Select>
                <Button onClick={addFoodToList()}>Add</Button>
            </from>
        </div>
    );
}

export default Food;