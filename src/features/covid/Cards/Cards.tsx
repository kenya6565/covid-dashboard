import React from "react";
import styles from "./Cards.module.css";
import CountUp from "react-countup";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";

import { GiHastyGrave } from "react-icons/gi";
import { MdLocalHospital } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";

import { useSelector } from "react-redux";
import { selectData } from "../covidSlice";

const Cards: React.FC = () => {
  //   useSelectorでstore内のdata属性にアクセスして取得
  const data = useSelector(selectData);
  return (
    <div className={styles.container}>
      <Grid container spacing={1} justify="center">
        <Grid item xs={12} md={3} component={Card} className={styles.infected}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              <MdLocalHospital />
              Infected Persons
            </Typography>
            <Typography variant="h5">
              <CountUp
            //   1.5秒かけてスタートからendまで数字が上がっていくよ
                start={0}
                end={data.confirmed.value}
                duration={1.5}
                // 3桁ごとにカンマを入れてくれる
                separator=","
              />
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cards;
