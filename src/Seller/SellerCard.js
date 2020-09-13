import React from 'react';
import {PropertyCard} from '../Components';

const SellerCard = (item)=>{
    console.log(item);
    return (
        <PropertyCard item={item} isBuyer={false} />
    )
}

export default SellerCard;
