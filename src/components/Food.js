import React from "react";
import {Button, MenuItem, Select} from "@material-ui/core";

function Food() {

    return (
        <div>
            <from>
                <Select >
                    <MenuItem>apple</MenuItem>
                    <MenuItem>rice</MenuItem>
                    <MenuItem>pasta</MenuItem>
                    <MenuItem>chocolate</MenuItem>
                    <MenuItem>pork</MenuItem>
                    <MenuItem>beans</MenuItem>
                </Select>
                <Input name="quantity" type="number" placeholder="quantity (enter number only)"/>
                <Select >
                    <MenuItem>kg</MenuItem>
                    <MenuItem>piece</MenuItem>
                </Select>
                <Button onClick={addFoodToList()}>Add</Button>
            </from>
        </div>
    );
}

export default Food;