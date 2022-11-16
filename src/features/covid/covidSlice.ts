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
