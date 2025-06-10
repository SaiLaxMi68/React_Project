export const fetchTransactionData = async()=> {
    try {
        const response = await fetch('/data/transactionData.json');
        if(!response.ok) throw new Error('Api error');
        const data = await response.json();
        return data;
    } catch(error) {
        throw error;
    }
};