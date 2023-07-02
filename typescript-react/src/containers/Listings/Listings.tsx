import { useEffect } from 'react';
import ListingCard from '@components/ListingCard';
import ListingForm from '@components/ListingForm';
import { useDispatch, useSelector } from 'react-redux';

import { fetchListings } from '../../redux/slices/listingsSlice';

import styles from './listings.module.scss';

const Listings = () => {
  const dispatch = useDispatch();
  const { listings, loading } = useSelector((state: any) => state.listings);

  useEffect(() => {
    dispatch(fetchListings() as any);
  }, []);

  return (
    <main className={styles['listings']}>
      <h1 className={styles['listings__title']}>Main Listings page</h1>
      <div className={styles['listings__wrapper']}>
        <aside className={styles['listings__aside']}>
          <h2 className={styles['listings__sub-title']}>Add a listing</h2>
          <ListingForm />
        </aside>
        <section className={styles['listings__section']}>
          <h2 className={styles['listings__sub-title']}>Listings</h2>
          {!loading &&
            listings.map((listing: any, i: number) => (
              <ListingCard listing={listing} key={i} />
            ))}
        </section>
      </div>
    </main>
  );
};

export default Listings;
