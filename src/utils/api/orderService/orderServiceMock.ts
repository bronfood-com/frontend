// import i18n from 'i18next';
// import { mockData } from './MockOrderList';
// import { OrderState } from './orderService';

// type ApiResponse<T> = {
//     data: T | null;
//     error: string | null;
// };

// class OrderServiceMock {
//     /**
//      * remove this func _delayedResponse after testing
//      */
//     _delayedResponse = async (ms: number) => {
//         return new Promise((resolve) => setTimeout(resolve, ms));
//     };

//     _fetchResponse = async <T>(query: () => T | undefined, errorMessageKey: string): Promise<ApiResponse<T>> => {
//         try {
//             const result = query();
//             if (result) {
//                 return { data: result, error: null };
//             }
//             throw new Error(errorMessageKey);
//         } catch (error) {
//             return { data: null, error: i18n.t(errorMessageKey) };
//         }
//     };

//     async fetchOrderIdByUserId(userId: string): Promise<ApiResponse<string>> {
//         await this._delayedResponse(5000);
//         return this._fetchResponse(() => mockData.orders.find((order) => order.userId === userId)?.id, 'components.waitingOrder.orderDoesNotExist');
//     }

//     async fetchOrderedMealByOrderId(id: string): Promise<ApiResponse<OrderState>> {
//         return this._fetchResponse(() => mockData.orders.find((order) => order.id === id), 'components.waitingOrder.errorReceivingOrderData');
//     }

//     async cancelOrder(id: string): Promise<ApiResponse<void>> {
//         await this._delayedResponse(5000);

//         return this._fetchResponse(() => {
//             const orderExists = mockData.orders.some((order) => order.id === id);
//             if (!orderExists) {
//                 return undefined;
//             }
//             return undefined;
//         }, 'components.waitingOrder.errorWhileCancellingTheOrder');
//     }

//     async checkPreparationStatus(userId: string): Promise<ApiResponse<'confirmed' | 'waiting' | 'notConfirmed'>> {
//         return this._fetchResponse(() => {
//             const order = mockData.orders.find((order) => order.userId === userId);
//             return order ? order.preparationStatus : undefined;
//         }, 'components.waitingOrder.orderDoesNotExist');
//     }

//     /**
//      * remove functions _confirmOrderStatus and _notConfirmOrderStatus after testing
//      */
//     _confirmOrderStatus = async (order: OrderState): Promise<ApiResponse<'confirmed' | 'waiting' | 'notConfirmed'>> => {
//         if (order.preparationStatus === 'waiting') {
//             order.preparationStatus = 'confirmed';
//             return { data: 'confirmed', error: null };
//         }
//         return { data: order.preparationStatus, error: null };
//     };

//     _notConfirmOrderStatus = async (order: OrderState): Promise<ApiResponse<'confirmed' | 'waiting' | 'notConfirmed'>> => {
//         if (order.preparationStatus === 'confirmed') {
//             order.preparationStatus = 'notConfirmed';
//             return { data: 'notConfirmed', error: null };
//         }
//         return { data: order.preparationStatus, error: null };
//     };

//     /**
//      * remove functions checkAndConfirmPreparationStatus and checkAndNotConfirmPreparationStatus after testing
//      */
//     async checkAndConfirmPreparationStatus(userId: string): Promise<ApiResponse<'confirmed' | 'waiting' | 'notConfirmed'>> {
//         const order = mockData.orders.find((order) => order.userId === userId);
//         if (order) {
//             return await this._confirmOrderStatus(order);
//         }
//         return Promise.resolve({ data: null, error: 'Order not found' });
//     }

//     async checkAndNotConfirmPreparationStatus(userId: string): Promise<ApiResponse<'confirmed' | 'waiting' | 'notConfirmed'>> {
//         const order = mockData.orders.find((order) => order.userId === userId);
//         if (order) {
//             return await this._notConfirmOrderStatus(order);
//         }
//         return Promise.resolve({ data: null, error: 'Order not found' });
//     }
// }

// export default OrderServiceMock;

import i18n from 'i18next';
import { OrderState } from './orderService';

type ApiResponse<T> = {
    data: T | null;
    error: string | null;
};

const API_BASE_URL = 'http://localhost:3000';

class OrderServiceMock {
    /**
     * remove this func _delayedResponse after testing
     */
    _delayedResponse = async (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    _fetchResponse = async <T>(url: string, errorMessageKey: string): Promise<ApiResponse<T>> => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(errorMessageKey);
            }
            const data = await response.json();
            return { data, error: null };
        } catch (error) {
            return { data: null, error: i18n.t(errorMessageKey) };
        }
    };

    async fetchOrderIdByUserId(userId: string): Promise<ApiResponse<string>> {
        await this._delayedResponse(5000);
        const url = `${API_BASE_URL}/orders?userId=${userId}`;
        const response = await this._fetchResponse<OrderState[]>(url, 'components.waitingOrder.orderDoesNotExist');
        const order = response.data ? response.data[0] : null;
        return order ? { data: order.id, error: null } : { data: null, error: 'Order not found' };
    }

    async fetchOrderedMealByOrderId(id: string): Promise<ApiResponse<OrderState>> {
        const url = `${API_BASE_URL}/orders/${id}`;
        return this._fetchResponse<OrderState>(url, 'components.waitingOrder.errorReceivingOrderData');
    }

    async cancelOrder(id: string): Promise<ApiResponse<void>> {
        await this._delayedResponse(5000);
        const url = `${API_BASE_URL}/orders/${id}`;
        const options = {
            method: 'DELETE'
        };
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('components.waitingOrder.errorWhileCancellingTheOrder');
            }
            return { data: null, error: null };
        } catch (error) {
            return { data: null, error: i18n.t('components.waitingOrder.errorWhileCancellingTheOrder') };
        }
    }

    async checkPreparationStatus(userId: string): Promise<ApiResponse<'confirmed' | 'waiting' | 'notConfirmed'>> {
        const url = `${API_BASE_URL}/orders?userId=${userId}`;
        const response = await this._fetchResponse<OrderState[]>(url, 'components.waitingOrder.orderDoesNotExist');
        const order = response.data ? response.data[0] : null;
        return order ? { data: order.preparationStatus, error: null } : { data: null, error: 'Order not found' };
    }

    /**
     * remove functions _confirmOrderStatus and _notConfirmOrderStatus after testing
     */
    _confirmOrderStatus = async (order: OrderState): Promise<ApiResponse<'confirmed' | 'waiting' | 'notConfirmed'>> => {
        if (order.preparationStatus === 'waiting') {
            order.preparationStatus = 'confirmed';
            return { data: 'confirmed', error: null };
        }
        return { data: order.preparationStatus, error: null };
    };

    _notConfirmOrderStatus = async (order: OrderState): Promise<ApiResponse<'confirmed' | 'waiting' | 'notConfirmed'>> => {
        if (order.preparationStatus === 'confirmed') {
            order.preparationStatus = 'notConfirmed';
            return { data: 'notConfirmed', error: null };
        }
        return { data: order.preparationStatus, error: null };
    };

    /**
     * remove functions checkAndConfirmPreparationStatus and checkAndNotConfirmPreparationStatus after testing
     */
    async checkAndConfirmPreparationStatus(userId: string): Promise<ApiResponse<'confirmed' | 'waiting' | 'notConfirmed'>> {
        const url = `${API_BASE_URL}/orders?userId=${userId}`;
        const response = await this._fetchResponse<OrderState[]>(url, 'components.waitingOrder.orderDoesNotExist');
        const order = response.data ? response.data[0] : null;
        if (order) {
            return await this._confirmOrderStatus(order);
        }
        return Promise.resolve({ data: null, error: 'Order not found' });
    }

    async checkAndNotConfirmPreparationStatus(userId: string): Promise<ApiResponse<'confirmed' | 'waiting' | 'notConfirmed'>> {
        const url = `${API_BASE_URL}/orders?userId=${userId}`;
        const response = await this._fetchResponse<OrderState[]>(url, 'components.waitingOrder.orderDoesNotExist');
        const order = response.data ? response.data[0] : null;
        if (order) {
            return await this._notConfirmOrderStatus(order);
        }
        return Promise.resolve({ data: null, error: 'Order not found' });
    }
}

export default OrderServiceMock;
