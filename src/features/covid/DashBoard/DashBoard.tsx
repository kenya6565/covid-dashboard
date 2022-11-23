import React, { useEffect } from "react";
import styles from "./DashBoard.module.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../app/hooks";
import { fetchAsyncGet, fetchAsyncGetDaily, selectData } from "../covidSlice";
import { AppDispatch } from "../../../app/store";
import SwitchCountry from "../SwitchCountry/SwitchCountry";
import Chart from "../Chart/Chart";
import PieChart from "../PieChart/PieChart";
import Cards from "../Cards/Cards";

// useStylesを使ってmaterialuiを装飾する3ステップ
// ①constでuseStyles定義
const useStyles = makeStyles((theme) => ({
  title: {
    // コンポーネントの横の比率
    // titleの横幅が100%になる
    flexGrow: 1,
  },
  content: {
    marginTop: 85,
  },
}));

const DashBoard: React.FC = () => {
  //   ②classesとしてuseStylesを代入
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const data = useSelector(selectData);

  useEffect(() => {
    // 非同期でAPIにアクセスしてコロナ情報を取得する関数
    // useEffectに追加することでボタンを押したりしなくても
    // ページを開いた瞬間に自動的にapiからデータを取得してstateを更新してくれるようになる
    dispatch(fetchAsyncGet());
    dispatch(fetchAsyncGetDaily());
    // dispatchを指定することになっている
  }, [dispatch]);

  return (
    <div>
      <AppBar position="absolute">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Covid 19 Live Dashboard
          </Typography>
          {data && (
            <Typography variant="body1">
              {new Date(data.lastUpdate).toDateString()}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Container className={classes.content}>
        <div className={styles.container}>
          <SwitchCountry />
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Chart />
          </Grid>

          <Grid item xs={12} md={5}>
            <PieChart />
          </Grid>

          <Grid item xs={12} md={12}>
            <Cards />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default DashBoard;
