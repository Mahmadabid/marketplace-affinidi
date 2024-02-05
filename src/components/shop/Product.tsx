import { ItemProps, useCartContext } from "@/utils/CartContext";
import { CountryContext } from "@/utils/CountryContext";
import { UserContext } from "@/utils/UserContext";
import { useContext } from "react";
import { convertedPrice, discountedPrice } from "./utils";

interface ProductProps {
    product: ItemProps;
    openModal: () => void;
}

const Product: React.FC<ProductProps> = ({product, openModal}) => {

    const [User] = useContext(UserContext);
    const [country] = useContext(CountryContext);
    const { addToCart } = useCartContext();

    return (
        <div className="border-2 border-gray-300 p-4 text-center flex-1 max-w-60 min-w-60 bg-white mx-6 rounded-lg overflow-hidden mb-6">
            <img src={product.imageUrl} alt={product.name} className="max-h-40 max-w-40 mx-auto mb-4" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600 font-medium">
                {User.user.verified && <span className='line-through text-red-500'>
                    {country.currencySymbol}{convertedPrice(product.price, country.currencyRate)}
                </span>}&nbsp;
                {country.currencySymbol}{discountedPrice(convertedPrice(product.price, country.currencyRate), User.user.verified || false)}
            </p>
            <button
                onClick={() => addToCart({ ...product, price: User.user.verified ? discountedPrice(product.price, User.user.verified) : product.price }, openModal)}
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
            >
                Add to Cart
            </button>
        </div>
    )
}

export default Product