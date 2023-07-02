import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addListing } from '../../redux/slices/listingsSlice';

import styles from './listing-form.module.scss';
const ListingForm = () => {
  const dispatch = useDispatch();
  const [selectedCountry, setSelectedCountry] = useState('DE');
  const [selectedCity, setSelectedCity] = useState('Hamburg');
  const handleCountryChange = (event: any) => {
    setSelectedCountry(event.target.value);
  };

  const handleCityChange = (event: any) => {
    setSelectedCity(event.target.value);
  };

  const submit = (event: any) => {
    event.preventDefault();

    const formData = Array.from(event.target.elements).reduce(
      (data: any, element: any) => {
        if (element.name) {
          const name = element.name;
          let value = element.value;

          // Check for the presence of data-custom-attribute
          if (element.dataset.customAttribute === 'number' && !isNaN(value)) {
            value = parseFloat(value);
          }

          // Check if the property name contains a dot (indicating a nested property)
          if (name.includes('.')) {
            const [outerKey, innerKey] = name.split('.');
            if (!data[outerKey]) {
              data[outerKey] = {};
            }
            data[outerKey][innerKey] = value;
          } else {
            data[name] = value;
          }
        }
        return data;
      },
      {},
    );
    dispatch(addListing(formData) as any);
  };

  return (
    <form className={styles['listing-form']} onSubmit={submit}>
      <div className={styles['listing-form__card']}>
        <div className={styles['listing-form__input-group']}>
          <label htmlFor="latest_price_eur">Name:</label>
          <input
            defaultValue="test"
            type="text"
            name="name"
            className={styles['listing-form__input-text']}
          />
        </div>
        <div className={styles['listing-form__input-group']}>
          <label htmlFor="latest_price_eur">description:</label>
          <input
            defaultValue="test"
            type="text"
            name="description"
            className={styles['listing-form__input-text']}
          />
        </div>
        <div className={styles['listing-form__input-group']}>
          <label htmlFor="latest_price_eur">Rooms count:</label>
          <input
            data-custom-attribute="number"
            type="number"
            max="30"
            min="1"
            name="rooms_count"
            defaultValue="2"
            className={styles['listing-form__input-text']}
          />
        </div>
        <div className={styles['listing-form__input-group']}>
          <label htmlFor="latest_price_eur">Bedrooms count:</label>
          <input
            data-custom-attribute="number"
            type="number"
            max="30"
            min="1"
            defaultValue="2"
            name="bedrooms_count"
            className={styles['listing-form__input-text']}
          />
        </div>
        <div className={styles['listing-form__input-group']}>
          <label htmlFor="latest_price_eur">Price:</label>
          <input
            data-custom-attribute="number"
            defaultValue="2200"
            type="number"
            name="latest_price_eur"
            className={styles['listing-form__input-text']}
          />
        </div>

        <div className={styles['listing-form__input-group']}>
          <label htmlFor="surface_area_m2">Area:</label>
          <input
            data-custom-attribute="number"
            defaultValue="75"
            type="number"
            name="surface_area_m2"
            className={styles['listing-form__input-text']}
          />
        </div>
        <div className={styles['listing-form__input-group']}>
          <label htmlFor="postal_address.street_address">Street address:</label>
          <input
            defaultValue="altona"
            type="text"
            name="postal_address.street_address"
            className={styles['listing-form__input-text']}
          />
        </div>
        <div className={styles['listing-form__input-group']}>
          <label htmlFor="postal_address.postal_code">Postal code:</label>
          <input
            defaultValue="28547"
            min="10000"
            max="99999"
            type="number"
            name="postal_address.postal_code"
            className={styles['listing-form__input-text']}
          />
        </div>
        <div className={styles['listing-form__input-group']}>
          <label htmlFor="postal_address.country">Country:</label>
          <br />

          <select
            name="postal_address.country"
            className={styles['listing-form__select']}
            value={selectedCountry}
            onChange={handleCountryChange}
            style={{ width: '100%', margin: '0' }}
          >
            <option value="DE">Germany</option>
            <option value="FR">France</option>
          </select>
        </div>

        <div
          className={styles['listing-form__input-group']}
          style={{ marginTop: '8px' }}
        >
          <label htmlFor="postal_address.city">City:</label>
          <br />

          <select
            name="postal_address.city"
            className={styles['listing-form__select']}
            value={selectedCity}
            onChange={handleCityChange}
            style={{ width: '100%', margin: '0' }}
          >
            {/* Options will be dynamically added based on the selected country */}
            {selectedCountry === 'DE' ? (
              <>
                <option value="Hamburg">Hamburg</option>
                <option value="Berlin">Berlin</option>
              </>
            ) : selectedCountry === 'FR' ? (
              <>
                <option value="Paris">Paris</option>
                <option value="Marseille">Marseille</option>
              </>
            ) : null}
          </select>
        </div>

        <div
          className={styles['listing-form__input-group']}
          style={{ marginTop: '8px' }}
        >
          {' '}
          <label htmlFor="building_type">Building type:</label>
          <br />
          <select
            name="building_type"
            className={styles['listing-form__select']}
            style={{ width: '100%', margin: '0' }}
          >
            <option value="STUDIO">Studio</option>
            <option value="APARTMENT">Apartment</option>
            <option value="HOUSE">House</option>
          </select>
        </div>
        <button
          type="submit"
          className={styles['listing-form__button--submit']}
          style={{ marginTop: '20px' }}
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default ListingForm;
