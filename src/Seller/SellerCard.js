import React from 'react';
import {PropertyCard} from '../components';

const SellerCard = (item)=>{
    console.log(item);
    return (
        <PropertyCard key={Math.random} item={item} isBuyer={false} />
    )
}

export default SellerCard;
