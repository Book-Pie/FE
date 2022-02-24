import { Link } from "react-router-dom";
import noProfileImg from "assets/image/pie3x.png";
import {
  checkStoreFollow,
  countCheckStoreFollow,
  usedBookDetailSelector,
  getFollowerUserList,
} from "src/modules/Slices/usedBookDetail/usedBookDetailSlice";
import GroupsIcon from "@mui/icons-material/Groups";
import { useTypedSelector } from "src/modules/store";
import { userReduceSelector } from "src/modules/Slices/user/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { CountWrapper } from "../UsedBookDetail/style";
import { Title, TitleSpan, UsedBookLikeListWrapper } from "../UsedBookLikeList/styles";
import { CardWrapper, Column, NoFollowListWrapper, ShopContentWrapper, UsedBookCardImgBox } from "./styles";
import UserFollowButton from "../ShopTop/UserFollowButton";

const Follower = () => {
  const dispatch = useDispatch();
  const { shop } = useTypedSelector(userReduceSelector);
  const { user, token } = useTypedSelector(userReduceSelector);
  const { FollowerList } = useTypedSelector(usedBookDetailSelector);
  const { follow, followCheck } = useTypedSelector(usedBookDetailSelector);
  const { followerCount, followingCount } = follow;

  useEffect(() => {
    if (shop) {
      dispatch(countCheckStoreFollow(shop.id));
    }
  }, [dispatch, followCheck, shop]);

  useEffect(() => {
    if (shop && token) {
      dispatch(
        checkStoreFollow({
          id: Number(shop.id),
          token,
        }),
      );
    }
  }, [dispatch, shop, token]);

  useEffect(() => {
    if (shop) {
      dispatch(getFollowerUserList(shop.id));
    }
  }, [dispatch, shop]);

  return (
    <ShopContentWrapper>
      <Title>
        <TitleSpan>팔로워</TitleSpan>
        <CountWrapper>{FollowerList.length}</CountWrapper>
      </Title>
      {FollowerList.length !== 0 && (
        <UsedBookLikeListWrapper>
          {FollowerList.map((item, idx) => {
            const { nickName, profile, userId, followCheck } = item;
            return (
              <div key={idx}>
                {shop && (
                  <CardWrapper width={100}>
                    <Link to={`/shop/${userId}`}>
                      <UsedBookCardImgBox>
                        {profile === null && <img src={noProfileImg} alt="myProfileImg" />}
                        {profile !== null && <img src={`${process.env.BASE_URL}/image/${profile}`} alt="usedBookImg" />}
                      </UsedBookCardImgBox>
                    </Link>
                    <div className="usedBookCard__content">
                      <p className="usedBookCard__title">{nickName}</p>
                    </div>
                    {shop && (
                      <UserFollowButton
                        user={user}
                        shopId={String(userId)}
                        followCheck={followCheck}
                        followerCount={followerCount}
                        followingCount={followingCount}
                        type="follower"
                        margin={20}
                      />
                    )}
                  </CardWrapper>
                )}
              </div>
            );
          })}
        </UsedBookLikeListWrapper>
      )}
      {FollowerList.length === 0 && (
        <NoFollowListWrapper>
          <Column>
            <GroupsIcon sx={{ fontSize: "100px", color: "#c9c9ca" }} />
            <div>아직 팔로워가 없습니다.</div>
          </Column>
        </NoFollowListWrapper>
      )}
    </ShopContentWrapper>
  );
};

export default Follower;
