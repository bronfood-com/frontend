import { OrderState } from './orderService';

export const mockData: { orders: OrderState[] } = {
    orders: [
        {
            clientId: 'clientId1',
            id: 'NHG347',
            totalAmount: 4100,
            confirmationStatus: 'waiting',
            preparationTime: 11,
            paymentStatus: 'paid',
            reviewStatus: 'waiting',
            cancellationTime: 120,
            cancellationStatus: 'none',
            isCancellationRequested: false,
            orderDetails: [
                { id: '1', itemDescription: 'Куриный донер', itemPrice: 1300, quantity: 1 },
                { id: '2', itemDescription: 'Coffee', itemPrice: 500, quantity: 3 },
                { id: '3', itemDescription: 'Салат Цезарь с курицей и сухариками', itemPrice: 2000, quantity: 1 },
                { id: '4', itemDescription: 'Вода негазированная', itemPrice: 300, quantity: 1 },
            ],
        },
        {
            clientId: 'clientId2',
            id: 'NHG348',
            totalAmount: 5800,
            confirmationStatus: 'waiting',
            preparationTime: 5,
            paymentStatus: 'paid',
            reviewStatus: 'waiting',
            cancellationTime: 4,
            cancellationStatus: 'none',
            isCancellationRequested: false,
            orderDetails: [
                { id: '1', itemDescription: 'Куриный донер', itemPrice: 1300, quantity: 1 },
                { id: '2', itemDescription: 'Coffee', itemPrice: 500, quantity: 3 },
                { id: '3', itemDescription: 'Салат Цезарь с курицей и сухариками', itemPrice: 2000, quantity: 1 },
                { id: '4', itemDescription: 'Вода негазированная', itemPrice: 300, quantity: 1 },
            ],
        },
    ],
};
