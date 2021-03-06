const { set } = require('mongoose')
const Restaurant = require('../../app/models/restaurant')

//Get Restaurant
function getRestaurants(limit) {
    return Restaurant.aggregate([
        {
            $limit: limit
        }
    ])
}

// Get a restaurant details
function getARestaurant(id) {
    return Restaurant.findOne({_id: id})
}

// check restaurant exist
function checkRestaurantExist(name) {
    return Restaurant.findOne({name}) || null
}

// Create a restaurant
function createRestaurant(restaurant) {
    let res = {
        name: restaurant.Name,
        location: restaurant.Location,
        cuisine: restaurant.cuisine,
        grade: restaurant.grade,
    }
    return Restaurant.insertMany(res)
}

// update restaurant address
function updateRestaurant(id, address) {
    return Restaurant.updateOne({_id: id}, {location: address})
}

//delete a restaurant
function deleteRestaurant(id) {
    return Restaurant.deleteOne({_id: id})
}

//get Restaurant grade
function getrestaurantgrade(id) {
    return Restaurant.findById(id)
}

//get All unique restaurant cuisines
function getrestaurantCuisines() {
    return Restaurant.aggregate([
        {
            $group: {_id: "$cuisine"}
        }
    ])
}

// Get all restaurants under a cuisine
function restaurantsInCuisines(cuisine) {
    return Restaurant.aggregate([
        {
            $match: {cuisine: cuisine}
        },
        {
            $project: {name: 1, _id: 0}
        }
    ])
}


//Export db functions
module.exports = {
    getRestaurants,
    getARestaurant,
    createRestaurant,
    updateRestaurant,
    checkRestaurantExist,
    deleteRestaurant,
    getrestaurantgrade,
    getrestaurantCuisines,
    restaurantsInCuisines
}
