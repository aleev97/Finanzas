import { useQuery } from '@tanstack/react-query';
import { api } from '../api/axiosClient';

export const useTransactions = () => {
    return useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            const { data } = await api.get('/transactions');
            return data;
        },
    });
};