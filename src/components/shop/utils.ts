export const convertedPrice = (price: number, currencyRate: number) => {
    const converted = price * currencyRate;
    return Number(converted.toFixed(2));
};

export const discountedPrice = (price: number, verified: boolean) => {
    const converted = verified ? price - price * 0.01 : price;
    return Number(converted.toFixed(2));
};

export const calculateAge = (birthdate: string) => {
    const birthDate = new Date(birthdate);
    const currentDate = new Date();

    const ageDifference = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    const dayDifference = currentDate.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        return ageDifference - 1 > 15 ? 'adults' : 'kids';
    }

    return ageDifference > 15 ? 'adults' : 'kids';
};

export const products = [
    { id: 1, name: 'Unisex Hoodie', price: 34, imageUrl: 'Unisex Hoodie.png', quantity: 1, description: 'Unisex hoodie description', gender: 'Unisex', age: 'adults' },
    { id: 2, name: 'Men Stackup Shirt', price: 20, imageUrl: 'Men Stackup Shirt.png', quantity: 1, description: 'Men stackup shirt description', gender: 'Men', age: 'adults' },
    { id: 5, name: 'Men White Shirt', price: 30.5, imageUrl: 'Men White Shirt.png', quantity: 1, description: 'Men\'s white shirt description', gender: 'Men', age: 'adults' },
    { id: 6, name: 'Men Red Shirt', price: 31, imageUrl: 'Men Red Shirt.png', quantity: 1, description: 'Men\'s red shirt description', gender: 'Men', age: 'adults' },
    { id: 7, name: 'Men Maroon Shirt', price: 32, imageUrl: 'Men Maroon Shirt.png', quantity: 1, description: 'Men\'s maroon shirt description', gender: 'Men', age: 'adults' },
    { id: 8, name: 'Men Green Shirt', price: 30, imageUrl: 'Men Green Shirt.png', quantity: 1, description: 'Men\'s green shirt description', gender: 'Men', age: 'adults' },
    { id: 9, name: 'Men Black Shirt', price: 33, imageUrl: 'Men Black Shirt.png', quantity: 1, description: 'Men\'s black shirt description', gender: 'Men', age: 'adults' },
    { id: 10, name: 'Kid sky Shirt', price: 22.5, imageUrl: 'Kid sky Shirt.png', quantity: 1, description: 'Kids sky shirt description', gender: 'Men', age: 'kids' },
    { id: 11, name: 'Kid Red Shirt', price: 23, imageUrl: 'Kid Red Shirt.png', quantity: 1, description: 'Kids red shirt description', gender: 'Men', age: 'kids' },
    { id: 12, name: 'Kid Blue Shirt', price: 24, imageUrl: 'Kid Blue Shirt.png', quantity: 1, description: 'Kids blue shirt description', gender: 'Men', age: 'kids' },
    { id: 13, name: 'Unisex Climbing Boots', price: 30, imageUrl: 'Unisex Climbing Boots.png', quantity: 1, description: 'Unisex Climbing Boots.png', gender: 'Unisex', age: 'adults' },
    { id: 14, name: 'Men Wallet', price: 15, imageUrl: 'Men Wallet.png', quantity: 1, description: 'Men Wallet description', gender: 'Men', age: 'adults' },
    { id: 15, name: 'Women Purse and Bag', price: 45, imageUrl: 'Women Purse and Bag.png', quantity: 1, description: 'Women Purse and Bag description', gender: 'Women', age: 'adults' },
    { id: 16, name: 'Women Purse', price: 30, imageUrl: 'Women Purse.png', quantity: 1, description: 'Women Purse description', gender: 'Women', age: 'adults' },
    { id: 17, name: 'Women Winter Boots', price: 28, imageUrl: 'Women Winter Boots.png', quantity: 1, description: 'Women Winter Boots description', gender: 'Women', age: 'adults' },
    { id: 18, name: 'Kid Sneakers', price: 20, imageUrl: 'Kid Sneakers.png', quantity: 1, description: 'Kid Sneakers description', gender: 'Women', age: 'kids' },
    { id: 19, name: 'Kid Bracelet', price: 21, imageUrl: 'Kid Bracelet.png', quantity: 1, description: 'Kid Bracelet description', gender: 'Women', age: 'kids' },
    { id: 20, name: 'Women Hat and Scarf', price: 40, imageUrl: 'Women Hat and Scarf.png', quantity: 1, description: 'Women Hat and Scarf description', gender: 'Women', age: 'adults' },
];

export const categories = ['Men', 'Women', 'All'];