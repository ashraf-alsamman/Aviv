import React, { useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { fetchListingPriceHistory } from '../../redux/slices/listingsSlice';

import styles from './price-history-card.module.scss';
const PriceHistoryCard = (id: any) => {
  const dispatch = useDispatch();
  const { priceHistory, priceHistoryLoading } = useSelector(
    (state: any) => state.listings,
  );

  useEffect(() => {
    const iddd = id.id;
    const listing_id = parseInt(iddd);
    console.log(iddd);
    dispatch(fetchListingPriceHistory(listing_id) as any);
    console.log('run first time');
  }, []);

  return (
    <div className={styles['container']}>
      <table className={styles['price-card']}>
        <tbody>
          <tr className={styles['price-card__header']}>
            <th scope="col">Date</th>
            <th scope="col">Price (eur)</th>
          </tr>

          {priceHistoryLoading ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ) : (
            priceHistory.map((item: any, index: number) => (
              <tr key={index}>
                <td>
                  {moment(item.created_date).format('MMMM Do YYYY, h:mm:ss a')}
                </td>
                <td>{item?.price_eur} € </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default PriceHistoryCard;
