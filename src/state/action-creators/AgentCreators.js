import {
  FETCH_AGENTS,
  FETCH_AGENTS_SUCCESS,
  FETCH_AGENTS_FAILED,
  FETCH_FIREBASE_AGENTS,
  FETCH_FIREBASE_AGENTS_SUCCESS,
  FETCH_FIREBASE_AGENTS_FAILED,
  UPLOAD_AGENT_REQUEST,
  UPLOAD_AGENT_SUCCESS,
  UPLOAD_AGENT_FAILED,
} from "../constants";

import axios from "axios";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { Platform } from "react-native";
import SQLite from "react-native-sqlite-2";
import Toast from "react-native-toast-message";
import NetInfo from "@react-native-community/netinfo";
//helper
import * as RootNavigation from "../../../RootNavigation";

//SQlite db
const db = SQLite.openDatabase("DraftedAgents.db", "1.0", "Local Agents", 1);

export const fetchDraftedAgents = () => (dispatch) => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Agents(user_id INTEGER PRIMARY KEY NOT NULL AUTO INCREMENT, first_name VARCHAR(30),last_name VARCHAR(30),gender VARCHAR(30),email VARCHAR(30),photo VARCHAR(100))"
    );
    tx.executeSql("SELECT * FROM `Agents`", [], (tx, res) => {
      console.log(res);
    });
  });
};

export const saveAgentToDraft = () => (dispatch) => {
  const firstname = "Griffin";
  const lastname = "Steward";
  const gender = "male";
  const email = "griffin@test.com";
  const photo = "https://image.google.com/";
  console.log("pressed");
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Agents(user_id INTEGER PRIMARY KEY NOT NULL AUTO INCREMENT, first_name VARCHAR(30),last_name VARCHAR(30),gender VARCHAR(30),email VARCHAR(30),photo VARCHAR(100))"
    );
    tx.executeSql(
      `INSERT INTO Agents (first_name,last_name,gender,email,photo) VALUES (?,?,?,?,?)`,
      [firstname, lastname, gender, email, photo],
      (tx, res) => {
        console.log(res.rowsAffected);
      },
      (err) => {
        console.log(err);
      }
    );
    tx.executeSql("SELECT * FROM `Agents`", [], (tx, res) => {
      console.log(res);
    });
  });
};

export const fetchAgents = (token) => (dispatch) => {
  dispatch({ type: FETCH_AGENTS });
  axios
    .get(
      `https://devel-7.tonjoostudio.com/recruitment-api/contacts?token=${token}`,
      {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    )
    .then((res) => {
      dispatch({ type: FETCH_AGENTS_SUCCESS, payload: res.data.data });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({ type: FETCH_AGENTS_FAILED, payload: err.response });
    });
};

export const uploadAgentToDatabase = (data) => async (dispatch) => {
  dispatch({ type: UPLOAD_AGENT_REQUEST });

  const { firstName, lastName, displayValue, email, photo } = data;
  const uri = photo.assets[0].uri;
  const filename = uri.substring(uri.lastIndexOf("/") + 1);
  const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
  const imageRef = storage().ref(filename);
  try {
    await imageRef.putFile(uploadUri).catch((err) => {
      throw err;
    });
    const imgUrl = await imageRef.getDownloadURL().catch((err) => {
      throw err;
    });

    firestore()
      .collection("Agents")
      .add({
        first_name: firstName,
        last_name: lastName,
        gender: displayValue,
        email: email,
        avatar: imgUrl,
      })
      .then((res) => {
        dispatch({ type: UPLOAD_AGENT_SUCCESS });
        Toast.show({
          type: "success",
          text1: "Data berhasil diupload !",
        });
        RootNavigation.reset({ routes: [{ name: "Home" }], index: 0 });
      })
      .catch((err) => {
        dispatch({ type: UPLOAD_AGENT_FAILED });
        NetInfo.fetch().then((state) => {
          if (state.cellularGeneration == "2g") {
            Toast.show({
              type: "error",
              text1: "Sinyal tidak mendukung!",
            });
          }
        });
        Toast.show({
          type: "error",
          text1: "Terjadi suatu kesalahan !",
        });
      });
  } catch (err) {
    console.log(err);
  }
};

export const fetchFirebaseAgent = () => async (dispatch) => {
  dispatch({ type: FETCH_FIREBASE_AGENTS });
  await firestore()
    .collection("Agents")
    .get()
    .then((querySnapshot) => {
      const agents = [];
      querySnapshot.forEach((documentSnapshot) => {
        agents.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      dispatch({ type: FETCH_FIREBASE_AGENTS_SUCCESS, payload: agents });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: FETCH_FIREBASE_AGENTS_SUCCESS,
        payload: err.response.data,
      });
    });
};
