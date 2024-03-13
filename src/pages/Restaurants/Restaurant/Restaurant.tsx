import { useNavigate, useParams } from 'react-router-dom';
import RestaurantPopup from './RestaurantPopup/RestaurantPopup';
import { useRestaurants } from '../../../utils/hooks/useRestaurants/useRestaurants';
import RestaurantImage from './RestaurantImage/RestaurantImage';
import RestaurantDescription from './RestaurantDescription/RestaurantDescription';
import { Restaurant as RestaurantProps } from '../../../utils/api/restaurantsService/restaurantsService';
import MealsFilter from './MealsFilter/MealsFilter';
import { useState } from 'react';
import { MealType } from '../../../utils/api/restaurantsService/restaurantsService';

function Restaurant() {
    const [selectedMealTypes, setSelectedMealTypes] = useState<MealType[]>([]);
    const navigate = useNavigate();
    const params = useParams();
    const { restaurantsFiltered } = useRestaurants();
    const restaurant: RestaurantProps | undefined = restaurantsFiltered.find((restaurant) => restaurant.id === params.restaurantId);
    const close = () => {
        navigate('/restaurants');
    };
    const addToFavourites = () => {
        // add to favourites logic
    };
    const addMealType = (mealType: MealType) => {
        setSelectedMealTypes([...selectedMealTypes, mealType]);
    };
    const deleteMealType = (mealType: MealType) => {
        setSelectedMealTypes(selectedMealTypes.filter((type: MealType) => type !== mealType));
    };
    if (restaurant) {
        const types = restaurant.meals.map(({ type }) => type).filter((type, i, ar) => ar.indexOf(type) === i);
        return (
            <RestaurantPopup close={close} onClick={addToFavourites}>
                <RestaurantImage image={restaurant.photo} />
                <RestaurantDescription name={restaurant.name} address={restaurant.address} workingTime={restaurant.workingTime} rating={restaurant.rating} reviews="(123+)" />
                <MealsFilter types={types} selectedTypes={selectedMealTypes} addType={addMealType} deleteType={deleteMealType} />
            </RestaurantPopup>
        );
    }
}

export default Restaurant;
