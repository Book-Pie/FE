import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { UserInfo } from "src/modules/Slices/user/types";
import {
  addMyPageFollowList,
  addStoreFollow,
  deleteMyPageFollowList,
  deleteStoreFollow,
} from "src/modules/Slices/usedBookDetail/usedBookDetailSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useTypedSelector } from "src/modules/store";
import { userReduceSelector } from "src/modules/Slices/user/userSlice";
import { BottomArea, FollowButton, FollowTitle } from "../UsedBookDetail/style";
import { FollowButtonWrapper, ShopFollowButtonArea } from "./styles";

export interface UserFollowButtonParam {
  user: UserInfo | null;
  shopId: string;
  followCheck: boolean;
  followerCount: number;
  followingCount: number;
  margin?: number;
  type: "follow" | "follower" | "shopTop";
}

const UserFollowButton = ({
  user,
  shopId,
  followCheck,
  followerCount,
  followingCount,
  margin,
  type,
}: UserFollowButtonParam) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token, isLoggedIn } = useTypedSelector(userReduceSelector);

  const followAddSubmit = (e: any) => {
    if (!isLoggedIn) {
      if (window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
        history.replace("/signIn");
      }
      e.preventDefault();
      return false;
    }
    if (!token) throw alert("로그인이 필요합니다.");
    if (shopId) {
      if (type === "shopTop") {
        dispatch(
          addStoreFollow({
            data: {
              userId: Number(shopId),
            },
            token,
          }),
        );
      } else {
        dispatch(
          addMyPageFollowList({
            data: {
              userId: Number(shopId),
            },
            token,
            type,
          }),
        );
      }
    }
    e.preventDefault();
    return false;
  };

  const followDeleteSubmit = (e: any) => {
    if (!isLoggedIn) {
      if (window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
        history.replace("/signIn");
      }
      e.preventDefault();
      return false;
    }
    if (!token) throw alert("로그인이 필요합니다.");
    if (shopId) {
      if (type === "shopTop") {
        dispatch(
          deleteStoreFollow({
            id: Number(shopId),
            token,
          }),
        );
      } else {
        dispatch(
          deleteMyPageFollowList({
            id: Number(shopId),
            token,
            type,
          }),
        );
      }
    }
    e.preventDefault();
    return false;
  };

  return (
    <FollowButton>
      {type === "shopTop" && (
        <BottomArea margin={margin}>
          <FollowTitle>팔로잉 {followingCount}</FollowTitle>
          <FollowTitle>팔로워 {followerCount}</FollowTitle>
        </BottomArea>
      )}
      {user && user.id !== Number(shopId) && (
        <ShopFollowButtonArea margin={margin}>
          {followCheck ? (
            <form onSubmit={followDeleteSubmit}>
              <FollowButtonWrapper>
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  startIcon={<CheckIcon color="primary" />}
                  className="active"
                >
                  팔로우
                </Button>
              </FollowButtonWrapper>
            </form>
          ) : (
            <form onSubmit={followAddSubmit}>
              <FollowButtonWrapper>
                <Button variant="contained" color="darkgray" type="submit" startIcon={<AddIcon />}>
                  팔로우
                </Button>
              </FollowButtonWrapper>
            </form>
          )}
        </ShopFollowButtonArea>
      )}
    </FollowButton>
  );
};

export default UserFollowButton;
