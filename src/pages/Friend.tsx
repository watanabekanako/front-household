import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import DefaultLayout from "../components/layout/defaultLayout";
import PieGraph from "../components/chart/pieGraph";
import Search from "../components/Search";
import { PostAll } from "../types/Types";
import { User } from "../types/Types";
const Friend = () => {
  const [allUser, setAlluser] = useState<User[]>([]);
  const [allPost, setAllPost] = useState<any>([]);
  console.log(allUser);
  console.log(allPost);
  const id = Cookies.get("id");

  console.log(id, "id");
  useEffect(() => {
    axios.get("/auth/alluser").then((response) => setAlluser(response.data));
    axios.get(`post/${id}`).then((response) => setAllPost(response.data));
  }, []);
  const [newId, setNewId] = useState<number>();
  console.log(newId);
  return (
    <DefaultLayout>
      <>
        <h1>みんなの家計簿</h1>
        <Search allUser={allUser} />
      </>
    </DefaultLayout>
  );
};

export default Friend;
