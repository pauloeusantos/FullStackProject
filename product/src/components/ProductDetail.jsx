import PropTypes from 'prop-types';
import { Card } from 'flowbite-react';

const ProductDetail = ({ product }) => {
    return (
        <Card>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                {product.name}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 mb-4">
                {product.description}
            </p>
            <p className="font-bold text-lg text-green-600">
                Preço: R$ {product.price.toFixed(2)}
            </p>
        </Card>
    );
};

ProductDetail.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    }).isRequired
};

export default ProductDetail;
