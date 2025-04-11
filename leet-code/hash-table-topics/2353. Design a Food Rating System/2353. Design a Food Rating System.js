/**
 * @param {string[]} foods
 * @param {string[]} cuisines
 * @param {number[]} ratings
 */
var FoodRatings = function(foods, cuisines, ratings) {
  this.foodsByCuisine = {
    // cuisine => {
    //   foods: [{food, rating, cuisine}, {food, rating, cuisine}]
    //   highestRating: number
    //   highestRatedFood: string
    // }
  };
  this.ratingsByFood = {
    // food => {food, rating, cuisine}
    // food => {food, rating, cuisine}
  };
  for (let i = 0; i < foods.length; i++) {
    const cuisine = cuisines[i];
    const food = foods[i];
    const rating = ratings[i];
    const foodObject = {
      food,
      rating,
      cuisine
    };

    if (this.foodsByCuisine[cuisine]) {
      this.foodsByCuisine[cuisine].foods.push(foodObject)
    } else {
      this.foodsByCuisine[cuisine] = {
        foods: [foodObject],
        highestRating: rating,
        highestRatedFood: food
      };
    }

    if (rating > this.foodsByCuisine[cuisine].highestRating) {
      this.foodsByCuisine[cuisine].highestRating = rating;
      this.foodsByCuisine[cuisine].highestRatedFood = food;
    };
    
    this.ratingsByFood[food] = foodObject;
    foodObject.highestRating = rating;
  }
};

/**
 * @param {string} food
 * @param {number} newRating
 * @return {void}
 */
FoodRatings.prototype.changeRating = function(food, newRating) {
  const ratedFood = this.ratingsByFood[food];
  const oldRating = this.foodsByCuisine[ratedFood.cuisine].highestRating;
  ratedFood.rating = newRating;
  if(newRating > oldRating) {
    // Set new highest rating
    this.foodsByCuisine[ratedFood.cuisine].highestRating = newRating;
    this.foodsByCuisine[ratedFood.cuisine].highestRatedFood = food;
  } else if (newRating === oldRating) {
    // Prioritze food alphabetically
    if (this.foodsByCuisine[ratedFood.cuisine].highestRatedFood > food) {
      this.foodsByCuisine[ratedFood.cuisine].highestRatedFood = food;
    }
  } else {
    // The only place where we cannot avoid looping through all foods,
    // since we might be lowering the highest rating
    // we might have new highest rated food now

    let highestRating = 0;
    let hishestRatedFood = null;
    const ratedFoods = this.foodsByCuisine[ratedFood.cuisine].foods;
    for (let i = 0; i < ratedFoods.length; i++) {
      const ratedFood = ratedFoods[i];
      if (ratedFood.rating >= highestRating) {
        if (highestRating === ratedFood.rating) {
          if (hishestRatedFood > ratedFood.food) {
            hishestRatedFood = ratedFood.food;
          }
        } else {
          highestRating = ratedFood.rating;
          hishestRatedFood = ratedFood.food;
        }
      }
    }
    this.foodsByCuisine[ratedFood.cuisine].highestRating = highestRating;
    this.foodsByCuisine[ratedFood.cuisine].highestRatedFood = hishestRatedFood;
  }
};

/**
 * @param {string} cuisine
 * @return {string}
 */
FoodRatings.prototype.highestRated = function(cuisine) {

  return this.foodsByCuisine[cuisine].highestRatedFood;
};

/**
 * Your FoodRatings object will be instantiated and called as such:
 * var obj = new FoodRatings(foods, cuisines, ratings)
 * obj.changeRating(food,newRating)
 * var param_2 = obj.highestRated(cuisine)
 */


// Time and space complexity : O(N)