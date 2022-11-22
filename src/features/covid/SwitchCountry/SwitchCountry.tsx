import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NativeSelect, FormControl } from "@material-ui/core";
import { useAppDispatch } from "../../../app/hooks";
import { fetchAsyncGetCountry } from "../covidSlice";

// makeStylesを使ってmaterialuiを装飾する
const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(3),
    minWidth: 320,
  },
}));
const SwitchCountry: React.FC = () => {
  const classes = useStyles();

  //   dispatchの実態を作る
  const dispatch = useAppDispatch();

  const countries = [
    "japan",
    "china",
    "us",
    "france",
    "italy",
    "spain",
    "united kingdom",
    "germany",
    "russia",
    "brazil",
    "taiwan",
    "thailand",
    "new zealand",
    "sweden",
    "india",
  ];
  return (
    <FormControl className={classes.formControl}>
      {/* 国が表示されるリスト */}
      {/* 選んだ国をdispatchを通じてsliceに渡す？ */}
      <NativeSelect
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          dispatch(fetchAsyncGetCountry(e.target.value))
        }
      >
        {/* htmlのoption */}
        <option value="">Worldwide</option>
        {countries.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default SwitchCountry;
