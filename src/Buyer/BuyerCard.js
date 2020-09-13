import React from 'react';
import {PropertyCard} from '../Components';

const BuyerCard = (item)=>{
    return (
        <PropertyCard item={item} isBuyer={true} />
    )
}

export default BuyerCard;
