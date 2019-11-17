export const DailyMinimalCalories = {
    ADULT: 2000,
    CHILD: 500
};

export const FoodCategory = {
    CARBO_HYDRATES: 'cbhd',
    VEGETABLES_FRUITS: 'vefr',
    FISH_MEET_DIARY: 'fnda',
    SWEETS: 'swet'
};

export const HealthyMealRatio = {};
HealthyMealRatio[FoodCategory.CARBO_HYDRATES] = 0.35;
HealthyMealRatio[FoodCategory.VEGETABLES_FRUITS] = 0.4;
HealthyMealRatio[FoodCategory.FISH_MEET_DIARY] = 0.1;
HealthyMealRatio[FoodCategory.SWEETS] = 0.05;

export const ShelfLifeRatio = {};
ShelfLifeRatio[FoodCategory.CARBO_HYDRATES] = 0.15;
ShelfLifeRatio[FoodCategory.VEGETABLES_FRUITS] = 0.25;
ShelfLifeRatio[FoodCategory.FISH_MEET_DIARY] = 0.55;
ShelfLifeRatio[FoodCategory.SWEETS] = 0.05;

export const FoodCategoryPriority = {};
FoodCategoryPriority[FoodCategory.CARBO_HYDRATES] = HealthyMealRatio[FoodCategory.CARBO_HYDRATES] * ShelfLifeRatio[FoodCategory.CARBO_HYDRATES];
FoodCategoryPriority[FoodCategory.VEGETABLES_FRUITS] = HealthyMealRatio[FoodCategory.VEGETABLES_FRUITS] * ShelfLifeRatio[FoodCategory.VEGETABLES_FRUITS];
FoodCategoryPriority[FoodCategory.FISH_MEET_DIARY] = HealthyMealRatio[FoodCategory.FISH_MEET_DIARY] * ShelfLifeRatio[FoodCategory.FISH_MEET_DIARY];
FoodCategoryPriority[FoodCategory.SWEETS] = HealthyMealRatio[FoodCategory.SWEETS] * ShelfLifeRatio[FoodCategory.SWEETS];

export const FoodCategoryPrioritySum = 0;
for (var key of Object.keys(FoodCategoryPriority)) {
    FoodCategoryPrioritySum += FoodCategoryPriority[key];
}

export const FoodCategoryPriorityPercentage = {};
FoodCategoryPriorityPercentage[FoodCategory.CARBO_HYDRATES] = FoodCategoryPriority[FoodCategory.CARBO_HYDRATES] / FoodCategoryPrioritySum;
FoodCategoryPriorityPercentage[FoodCategory.VEGETABLES_FRUITS] = FoodCategoryPriority[FoodCategory.VEGETABLES_FRUITS] / FoodCategoryPrioritySum;
FoodCategoryPriorityPercentage[FoodCategory.FISH_MEET_DIARY] = FoodCategoryPriority[FoodCategory.FISH_MEET_DIARY] / FoodCategoryPrioritySum;
FoodCategoryPriorityPercentage[FoodCategory.SWEETS] = FoodCategoryPriority[FoodCategory.SWEETS] / FoodCategoryPrioritySum;