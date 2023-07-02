import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import API_BASE_URL from '../../config/config';

export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async () => {
    try {
      const response = await axios.get(API_BASE_URL + 'listings');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch listings');
    }
  },
);

export const fetchListingPriceHistory = createAsyncThunk(
  'listings/fetchListingPriceHistory',
  async (listingId: number) => {
    try {
      const response = await axios.get(
        API_BASE_URL + `listings/${listingId}/prices`,
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch listing price history');
    }
  },
);

export const addListing = createAsyncThunk(
  'listings/addListing',
  async (listing: any) => {
    try {
      const response = await axios.post(API_BASE_URL + 'listings', listing);
      return response;
    } catch (error) {
      throw new Error('Failed to add listing');
    }
  },
);
interface ListingState {
  listings: any[];
  priceHistory: any[];
  loading: boolean;
  priceHistoryLoading: boolean;
  error: string | null;
}

const initialState: ListingState = {
  listings: [],
  priceHistory: [],
  loading: false,
  priceHistoryLoading: false,
  error: '',
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch listings';
      })
      .addCase(fetchListingPriceHistory.pending, (state) => {
        state.priceHistoryLoading = true;
        state.error = null;
      })
      .addCase(fetchListingPriceHistory.fulfilled, (state, action: any) => {
        state.priceHistoryLoading = false;
        state.priceHistory = action.payload;
      })
      .addCase(fetchListingPriceHistory.rejected, (state, action) => {
        state.priceHistoryLoading = false;
        state.error =
          action.error.message || 'Failed to fetch listing price history';
      })
      .addCase(addListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addListing.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.listings.unshift(action.payload.data);
      })
      .addCase(addListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add listing';
      });
  },
});

export default listingsSlice.reducer;
