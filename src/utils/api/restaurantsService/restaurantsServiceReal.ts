import { Restaurant, Meal, RestaurantsService } from './restaurantsService';
import { API_URL } from '../../consts';
import i18n from '../../../i18n';

export class RestaurantsServiceReal implements RestaurantsService {
    private _allMealsCache: Meal[] | null = null;
    private _restaurantsCache: Restaurant[] | null = null;
    _getToken() {
        return localStorage.getItem('token');
    }
    async getRestaurants(): Promise<{ status: 'success'; data: Restaurant[] } | { status: 'error'; error_message: string }> {
        const token = this._getToken();
        if (!token) {
            return {
                status: 'error',
                error_message: 'Пройдите авторизацию',
            };
        }
        if (this._restaurantsCache !== null) {
            return {
                status: 'success',
                data: this._restaurantsCache,
            };
        } else {
            const res = await fetch(`${API_URL}/api/restaurant/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                throw new Error(`Failed to fetch restaurants, status: ${res.status}`);
            }
            const responseData = await res.json();
            this._restaurantsCache = responseData.data;
            return responseData;
        }
    }
    async getAllMeals(): Promise<Meal[]> {
        if (this._allMealsCache !== null) {
            return this._allMealsCache;
        }
        const token = this._getToken();
        if (!token) {
            throw new Error(i18n.t('pages.logout.Unauthorized'));
        }
        const res = await fetch(`${API_URL}/api/meals/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch meals, status: ${res.status}`);
        }
        this._allMealsCache = await res.json();
        if (this._allMealsCache === null) {
            throw new Error('Failed to fetch meals');
        }
        return this._allMealsCache;
    }
    async getRestaurantById(id: string): Promise<{ status: 'success'; data: Restaurant & { meals: Meal[] } } | { status: 'error'; error_message: string }> {
        const token = this._getToken();
        if (!token) {
            return {
                status: 'error',
                error_message: i18n.t('pages.logout.Unauthorized'),
            };
        }
        if (this._restaurantsCache !== null) {
            const restaurant = this._restaurantsCache.find((r) => r.id === id);
            if (restaurant) {
                return {
                    status: 'success',
                    data: { ...restaurant, meals: this._allMealsCache || [] },
                };
            }
        }
        const res = await fetch(`${API_URL}/api/restaurant/${id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            return {
                status: 'error',
                error_message: `Failed to fetch restaurant, status: ${res.status}`,
            };
        }
        const restaurant = await res.json();
        if (this._allMealsCache === null) {
            await this.getAllMeals();
        }
        return {
            status: 'success',
            data: { ...restaurant.data, meals: this._allMealsCache },
        };
    }
}
