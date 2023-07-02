import React, { useState } from 'react';
import moment from 'moment';

import PriceHistoryCard from '../PriceHistoryCard/PriceHistoryCard';

import styles from './listing-card.module.scss';

const ListingCard = (listing: any) => {
  const [showPriceHistory, setShowPriceHistory] = useState(false);

  const handleClick = () => {
    setShowPriceHistory(!showPriceHistory);
  };

  return (
    <article className={styles['listing-card']}>
      <span className={styles['listing-card__price']}>
        {listing.listing.latest_price_eur} &euro;
      </span>
      <ul className={styles['listing-card__properties']}>
        <li className={styles['listing-card__properties-item']}>
          {listing.listing.building_type}
        </li>
        <li className={styles['listing-card__properties-item']}>
          {listing.listing.surface_area_m2}m<sup>2</sup>
        </li>
        <li className={styles['listing-card__properties-item']}>
          {' '}
          {listing.listing.rooms_count} rooms
        </li>
      </ul>
      <section className={styles['listing-card__address']}>
        <address>
          {listing.listing.postal_address.street_address}
          {listing.listing.postal_address.postal_code},
          {listing.listing.postal_address.city}
          {listing.listing.postal_address.country}
        </address>
      </section>
      <section className={styles['listing-card__description']}>
        <h3>Property description: </h3>
        <p>
          {listing.listing.description
            ? listing.listing.description
            : 'Data does not exist'}
        </p>
      </section>
      <div className={styles['listing-card__footer']}>
        <p className={styles['listing-card__reference']}>
          Ref: {listing.listing.id} <br />
          Last update:
          <br />
          {moment(listing.listing.updated_date).format(
            'MMMM Do YYYY, h:mm:ss a',
          )}
        </p>
        {listing.listing.price_history ? (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <button
            className={styles['listing-card__link']}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
          >
            {showPriceHistory ? 'Hide history' : 'See history'} &rarr;
          </button>
        ) : (
          <span className={styles['listing-card__link']}>
            No prices history exist
          </span>
        )}
      </div>

      {showPriceHistory && (
        <PriceHistoryCard id={listing.listing.id} key={listing.listing.id} />
      )}
    </article>
  );
};

export default ListingCard;
