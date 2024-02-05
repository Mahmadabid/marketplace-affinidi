export const convertedPrice = (price: number, currencyRate: number) => {
    const converted = price * currencyRate;
    return Number(converted.toFixed(2));
};

export const discountedPrice = (price: number, verified: boolean) => {
    const converted = verified ? price - price * 0.01 : price;
    return Number(converted.toFixed(2));
};


export const products = [
    { id: 1, name: 'Hoodie', price: 4, imageUrl: 'hoodie.png', quantity: 1, description: 'hkjasdf jfhkjashf kashdfjshdf sjhkjh', gender: 'Women' },
    { id: 2, name: 'T-Shird', price: 15, imageUrl: 'tee.png', quantity: 1, description: 'hkjasdf jfhkjas', gender: 'Men' },
    { id: 3, name: 'Hoodie123', price: 10, imageUrl: 'hoodie.png', quantity: 1, description: 'hkjasdf jfhkjashf kashdfjshdf sjhkjh', gender: 'Women' },
    { id: 4, name: 'T-Shirt', price: 30, imageUrl: 'tee.png', quantity: 1, description: 'hkjasdf jfhkjas', gender: 'Men' },
    { id: 5, name: 'Sweater', price: 20, imageUrl: 'https://d2z0lqci37nukm.cloudfront.net/media/catalog/product/cache/5a319794f6868ce12b948b8c65d98dde/m/-/m-sw06-m112-ebony201_rbpoybyydv2tloxh.webp', quantity: 1, description: 'Some description', gender: 'Women' },
    { id: 6, name: 'Men\'s Shirt', price: 25, imageUrl: 'https://example.com/mens-shirt.jpg', quantity: 1, description: 'Men\'s shirt description', gender: 'Men' },
    { id: 7, name: 'Men\'s Jeans', price: 35, imageUrl: 'https://example.com/mens-jeans.jpg', quantity: 1, description: 'Men\'s jeans description', gender: 'Men' },
    { id: 8, name: 'Men\'s Sneakers', price: 30, imageUrl: 'https://example.com/mens-sneakers.jpg', quantity: 1, description: 'Men\'s sneakers description', gender: 'Men' },
    { id: 9, name: 'Men\'s Watch', price: 50, imageUrl: 'https://example.com/mens-watch.jpg', quantity: 1, description: 'Men\'s watch description', gender: 'Men' },
    { id: 10, name: 'Men\'s Backpack', price: 40, imageUrl: 'https://example.com/mens-backpack.jpg', quantity: 1, description: 'Men\'s backpack description', gender: 'Men' },
    { id: 11, name: 'Women\'s Dress', price: 40, imageUrl: 'https://example.com/womens-dress.jpg', quantity: 1, description: 'Women\'s dress description', gender: 'Women' },
    { id: 12, name: 'Women\'s Shoes', price: 30, imageUrl: 'https://example.com/womens-shoes.jpg', quantity: 1, description: 'Women\'s shoes description', gender: 'Women' },
    { id: 13, name: 'Women\'s Handbag', price: 35, imageUrl: 'https://example.com/womens-handbag.jpg', quantity: 1, description: 'Women\'s handbag description', gender: 'Women' },
    { id: 14, name: 'Women\'s Earrings', price: 20, imageUrl: 'https://example.com/womens-earrings.jpg', quantity: 1, description: 'Women\'s earrings description', gender: 'Women' },
    { id: 15, name: 'Women\'s Sunglasses', price: 25, imageUrl: 'https://example.com/womens-sunglasses.jpg', quantity: 1, description: 'Women\'s sunglasses description', gender: 'Women' },
  ];

export const categories = ['Men', 'Women', 'All'];