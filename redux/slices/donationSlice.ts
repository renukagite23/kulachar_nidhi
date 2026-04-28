import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Donation {
  _id: string;
  amount: number;
  donationDate: string;
  transactionId: string;
  reason: string;
  paymentStatus: string;
}

interface DonationState {
  donations: Donation[];
  totalDonations: number;
  loading: boolean;
}

const initialState: DonationState = {
  donations: [],
  totalDonations: 0,
  loading: false,
};

const donationSlice = createSlice({
  name: 'donation',
  initialState,
  reducers: {
    setDonations: (state, action: PayloadAction<Donation[]>) => {
      state.donations = action.payload;
    },
    addDonation: (state, action: PayloadAction<Donation>) => {
      state.donations.unshift(action.payload);
      state.totalDonations += action.payload.amount;
    },
    setTotalDonations: (state, action: PayloadAction<number>) => {
      state.totalDonations = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setDonations, addDonation, setTotalDonations, setLoading } = donationSlice.actions;
export default donationSlice.reducer;
