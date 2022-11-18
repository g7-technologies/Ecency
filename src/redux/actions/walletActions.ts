import { getLatestQuotes } from '../../providers/ecency/ecency';
import { fetchCoinsData } from '../../utils/wallet';
import {
  SET_SELECTED_COINS,
  SET_PRICE_HISTORY,
  SET_COINS_DATA,
  SET_COIN_ACTIVITIES,
  SET_COIN_QUOTES,
  RESET_WALLET_DATA,
} from '../constants/constants';
import { CoinActivitiesCollection, CoinBase, CoinData } from '../reducers/walletReducer';
import { AppDispatch, RootState } from '../store/store';

export const setSelectedCoins = (coins: CoinBase[]) => ({
  payload: coins,
  type: SET_SELECTED_COINS,
});

export const setCoinsData = (
  data: { [key: string]: CoinData },
  vsCurrency: string,
  username: string,
) => ({
  payload: {
    data,
    vsCurrency,
    username,
  },
  type: SET_COINS_DATA,
});

export const setPriceHistory = (coinId: string, vsCurrency: string, data: number[]) => ({
  payload: {
    id: coinId,
    vsCurrency,
    data,
  },
  type: SET_PRICE_HISTORY,
});

export const setCoinActivities = (coinId: string, data: CoinActivitiesCollection) => ({
  payload: {
    id: coinId,
    data,
  },
  type: SET_COIN_ACTIVITIES,
});

export const resetWalletData = () => ({
  type: RESET_WALLET_DATA,
});

export const fetchCoinQuotes = () => (dispatch, getState) => {
  const { currency } = getState().application;
  console.log('fetching quotes for currency', currency);
  getLatestQuotes(currency.currencyRate).then((quotes) => {
    console.log('Fetched quotes', quotes);
    dispatch({
      type: SET_COIN_QUOTES,
      payload: { ...quotes },
    });
  });
};

export const fetchAndSetCoinsData =
  (refresh: boolean = false) =>
  async (dispatch: AppDispatch, getState: RootState) => {
    const coins = getState().wallet.selectedCoins;
    const { quotes } = getState().wallet;
    const { currentAccount } = getState().account;
    const { currency } = getState().application;
    const { globalProps } = getState().account;

    const coinsData = await fetchCoinsData({
      coins,
      currentAccount,
      vsCurrency: currency.currency,
      currencyRate: currency.currencyRate,
      globalProps,
      quotes,
      refresh,
    });

    return dispatch(setCoinsData(coinsData, currency.currency, currentAccount.username));
  };
