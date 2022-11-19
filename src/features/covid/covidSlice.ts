// createAsyncThunkは非同期の関数を作るもの
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import dataJson from "./data.json";
import dataJsonDaily from "./dataDaily.json";

const apiUrl = "https://covid19.mathdro.id/api";

// typeofでdata.jsonの型データを自動的に読み込ませることができる
type APIDATA = typeof dataJson;
type APIDATADAILY = typeof dataJsonDaily;

type covidState = {
  data: APIDATA;
  country: string;
  dailyData: APIDATADAILY;
};

// このstateはstoreに保持されているcomponentのstateとは別のstate
const initialState: covidState = {
  data: {
    confirmed: {
      value: 635966929,
      detail: "https://covid19.mathdro.id/api/confirmed",
    },
    recovered: {
      value: 0,
      detail: "https://covid19.mathdro.id/api/recovered",
    },
    deaths: {
      value: 6613139,
      detail: "https://covid19.mathdro.id/api/deaths",
    },
    dailySummary: "https://covid19.mathdro.id/api/daily",
    dailyTimeSeries: {
      pattern: "https://covid19.mathdro.id/api/daily/[dateString]",
      example: "https://covid19.mathdro.id/api/daily/2-14-2020",
    },
    image: "https://covid19.mathdro.id/api/og",
    source: "https://github.com/mathdroid/covid19",
    countries: "https://covid19.mathdro.id/api/countries",
    countryDetail: {
      pattern: "https://covid19.mathdro.id/api/countries/[country]",
      example: "https://covid19.mathdro.id/api/countries/USA",
    },
    lastUpdate: "2022-11-16T13:21:13.000Z",
  },
  country: "",
  dailyData: [
    {
      totalConfirmed: 557,
      mainlandChina: 548,
      otherLocations: 9,
      deltaConfirmed: 0,
      totalRecovered: 0,
      confirmed: {
        total: 557,
        china: 548,
        outsideChina: 9,
      },
      deltaConfirmedDetail: {
        total: 0,
        china: 0,
        outsideChina: 0,
      },
      deaths: {
        total: 17,
        china: 17,
        outsideChina: 0,
      },
      recovered: {
        total: 0,
        china: 0,
        outsideChina: 0,
      },
      active: 0,
      deltaRecovered: 0,
      incidentRate: 0.4510818002025252,
      peopleTested: 0,
      reportDate: "2020-01-22",
    },
  ],
};

// createAsyncThunkは非同期の関数を作るもの
// 第一引数にアクション名、第二引数に非同期の関数
export const fetchAsyncGet = createAsyncThunk("covid/get", async () => {
  // axiosはfetchAPIみたいなやつ
  //   axiosを通じてurlにアクセスしてデータをゲット;
  const { data } = await axios.get<APIDATA>(apiUrl);
  return data;
});

// こっちは日時別を取得する関数
export const fetchAsyncGetDaily = createAsyncThunk(
  "covid/getDaily",
  async () => {
    const { data } = await axios.get<APIDATADAILY>(`${apiUrl}/daily`);
    return data;
  }
);

// ある国の感染者数の取得関数
export const fetchAsyncGetCountry = createAsyncThunk(
  "covid/getCountry",
  //countryを受け取ってその国に応じたurlにアクセスする
  async (country: string) => {
    // countryがない場合はurlはそのまま
    let dynamicUrl = apiUrl;
    // countryがない場合もある
    if (country) {
      dynamicUrl = `${apiUrl}/countries/${country}`;
    }
    const { data } = await axios.get<APIDATA>(dynamicUrl);
    return { data: data, country: country };
  }
);

const covidSlice = createSlice({
  name: "covid",
  initialState: initialState,
  reducers: {},
  //   ここから非同期処理の後処理
  extraReducers: (builder) => {
    // fulfilled =　通常終了した
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        // ここでstateに対してdataをセットする
        // ..stateでstateの中のdataとcountryとdailyDataを展開して、
        // その後展開したdataにaction.payloadの値を設定し、stateの中身を全て返す
        ...state,
        // action.payloadでapiUrlから取得したdataを取得できる。
        data: action.payload,
      };
    });
    builder.addCase(fetchAsyncGetDaily.fulfilled, (state, action) => {
      return {
        ...state,
        dailyData: action.payload,
      };
    });
    builder.addCase(fetchAsyncGetCountry.fulfilled, (state, action) => {
      return {
        ...state,
        // fetchAsyncGetCountryの戻り値は{}なので.dataと.country必要
        data: action.payload.data,
        country: action.payload.country,
      };
    });
  },
});

// react componentからstoreのstateを呼び出せるように設定
// store内のstateにアクセスして返す関数を定義してexportしている
export const selectData = (state: RootState) => state.covid.dailyData;
export const selectDailyData = (state: RootState) => state.covid.dailyData;
export const selectCountry = (state: RootState) => state.covid.country;
export default covidSlice.reducer;
