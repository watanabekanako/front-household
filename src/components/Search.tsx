import { useState, useEffect } from "react";
import axios from "axios";
import userSearchStyle from "../styles/search/seacrh.module.scss";
type Props = {
  allUser: { id: number; name: string }[];
};
const Search: React.FC<Props> = ({ allUser }) => {
  const [searchText, setSearchText] = useState<string>("");
  const handleInputChange = (e: any) => {
    setSearchText(e.target.value);
  };
  const filteredData = allUser.filter((user: any) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return user.name.match(regex);
  });
  const id = 1;
  const [selectedUser, setSelectedUser] = useState<any>();

  //  http://localhost:3005/post/1
  // これでid1の投稿が取得できるようになる
  const [userId, setUserID] = useState<any>();

  return (
    <div className={userSearchStyle.inputContainer}>
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        placeholder="ユーザー名を検索できます"
      />
      <div>
        {filteredData.map((user: { id: number; name: string }) => {
          //   axios
          //     .get(`post/${user.id}`)
          //     .then((response) =>
          return (
            <>
              <div className={userSearchStyle.input} key={user.id}>
                {user.name}さん
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
