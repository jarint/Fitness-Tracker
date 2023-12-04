export const calculateBreakdown = (items, values) => {
    const breakdown = {
        calories: 0,
        fats: 0,
        protein: 0,
        sodium: 0,
        potassium: 0,
        cholesterol: 0,
        carbohydrate: 0,
        fiber: 0,
        sugar: 0,
    };

    items.forEach((item) => {
        const amount = parseFloat(item.value) || 0;
        const itemValues = values[item.name] || {};
        breakdown.calories += amount * (itemValues.calories || 0);
        breakdown.fats += amount * (itemValues.fats || 0);
        breakdown.protein += amount * (itemValues.protein || 0);
        breakdown.sodium += amount * (itemValues.sodium || 0);
        breakdown.potassium += amount * (itemValues.potassium || 0);
        breakdown.cholesterol += amount * (itemValues.cholesterol || 0);
        breakdown.carbohydrate += amount * (itemValues.carbohydrate || 0);
        breakdown.fiber += amount * (itemValues.fiber || 0);
        breakdown.sugar += amount * (itemValues.sugar || 0);
    });

    return breakdown;
};