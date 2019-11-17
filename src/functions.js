import {
    FoodCategory,
    FoodCategoryPriorityPercentage
} from './constants';

export function groupedSumByFoodCategory(availableFood){
    var groupedSum = {};

    for( var i = 0; i < availableFood.length; i++ ){
        var food = availableFood[i];
        var response = responses[food.name];

        if( response.ratio ){
            food.calories = parseInt(response.calories) * parseFloat(response.ratio);
            food.totalCalories = food.quantity * food.calories;
        } else {
            food.calories = parseInt(response.calories);
            food.totalCalories = food.quantity * food.calories / 100;
        }
        
        food.category = response.foodcategory;
        if( food.name == 'apple'){
            console.log('apple:', food, 'ratio:', response.ratio, 'calories:', food.calories, food.totalCalories);
        }
        if( !groupedSum[response.foodcategory] ){
            groupedSum[response.foodcategory] = {
                totalCalories: 0,
                food: []
            };
        }

        groupedSum[response.foodcategory].food.push(food);
        groupedSum[response.foodcategory].totalCalories += food.totalCalories;
    }
    
    return groupedSum;
}

export function dailyMinimalCaloriesFor(args){
    args.adults = args.adults ? args.adults : 0;
    args.children = args.children ? args.children : 0;
    return DailyMinimalCalories.ADULT * args.adults + DailyMinimalCalories.CHILD * args.children;
}

export function groupedSumByFoodCategoryContainsFood(groupedSum){
    for (var key of Object.keys(groupedSum)) {
        var calories = groupedSum[key].totalCalories;
        if( calories && calories > 0 ){
            return true;
        }
    }
    return false;
}


export function planFoodForOneDay(groupedSum, overallCaloriesNeeded){
    var allPlannedFood = {};

    var overallCaloriesMissing = 0;
    for (var foodCategory of [FoodCategory.SWEETS, FoodCategory.FISH_MEET_DIARY, FoodCategory.VEGETABLES_FRUITS, FoodCategory.CARBO_HYDRATES]) {
        var available = groupedSum[foodCategory];
        var priorityPercentage = FoodCategoryPriorityPercentage[foodCategory];
        var caloriesNeeded = overallCaloriesNeeded * priorityPercentage + overallCaloriesMissing;

        if( available && available.totalCalories ){
            while( available.totalCalories > 0 && caloriesNeeded > 0 ){
                var food = available.food[Math.floor(Math.random() * available.food.length)];
                
                if( food.totalCalories >= caloriesNeeded ){
                    plannedFood = {
                        name: food.name,
                        unit: food.unit,
                        calories: food.calories,
                        totalCalories: caloriesNeeded,
                        category: food.category
                    };
                    available.totalCalories -= caloriesNeeded;
                    food.totalCalories -= caloriesNeeded;
                    caloriesNeeded = 0;
                    overallCaloriesMissing = 0;

                    if(!allPlannedFood[plannedFood.name]){
                        allPlannedFood[plannedFood.name] = plannedFood;
                    } else {
                        //allPlannedFood[plannedFood.name].totalCalories += plannedFood.totalCalories;
                        console.log('1.invalid');
                    }

                } else if( food.totalCalories > 0 ){
                    plannedFood = {
                        name: food.name,
                        unit: food.unit,
                        calories: food.calories,
                        totalCalories: food.totalCalories,
                        category: food.category
                    };
                    available.totalCalories -= food.totalCalories;
                    caloriesNeeded -= food.totalCalories;
                    overallCaloriesMissing -= food.totalCalories;
                    if( overallCaloriesMissing < 0 ){
                        overallCaloriesMissing = 0;
                    }
                    food.totalCalories = 0;

                    if(!allPlannedFood[plannedFood.name]){
                        allPlannedFood[plannedFood.name] = plannedFood;
                    } else {
                        //allPlannedFood[plannedFood.name].totalCalories += plannedFood.totalCalories;
                        console.log('2.invalid');
                    }
                }
            }

        } else {
            overallCaloriesMissing += caloriesNeeded;
        }
    }
    return allPlannedFood;
}