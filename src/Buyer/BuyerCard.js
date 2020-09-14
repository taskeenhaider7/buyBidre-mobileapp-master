import React from 'react';
import {PropertyCard} from '../components';

const BuyerCard = (item)=>{
    return (
        <PropertyCard item={item} isBuyer={true} />
    )
}

export default BuyerCard;
