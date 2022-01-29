import { useCallback } from "react";
import { signInUser } from "modules/Slices/signIn/signInSlice";
import { useTypedSelector } from "modules/store";
import { make1000UnitsCommaFormet } from "utils/formatUtil";
import * as Styled from "./style";

const PointInfo = () => {
  const user = useTypedSelector(signInUser);

  const getRating = useCallback((point: number) => {
    let rating = "브론즈";
    if (point >= 100000) {
      rating = "실버";
    }
    if (point >= 1000000) {
      rating = "골드";
    }
    return rating;
  }, []);

  if (user) {
    return (
      <Styled.MyTopPointInfo>
        <span>{`${getRating(user.point.totalPoint)}회원`}</span>
        <span>{`총 ${make1000UnitsCommaFormet(String(user.point.totalPoint))}점`}</span>
        <div className="point">
          <p>북파이 등급안내</p>
          <div>
            <span className="bronze">브론즈</span>
            <span>포인트 0점~ 100,000점</span>
          </div>
          <div>
            <span className="silver">실버</span>
            <span>포인트 100,000점 ~ 1,000,000점</span>
          </div>
          <div>
            <span className="gold">골드</span>
            <span>포인트 1,000,000점 ~</span>
          </div>
          <div>
            <span>총 포인트</span>
            <span>{`${make1000UnitsCommaFormet(String(user.point.totalPoint))}점`}</span>
          </div>
          <div>
            <span>사용한 포인트</span>
            <span>{`${make1000UnitsCommaFormet(String(user.point.usedPoint))}점`}</span>
          </div>
          <div>
            <span>보유한 포인트</span>
            <span>{`${make1000UnitsCommaFormet(String(user.point.holdPoint))}점`}</span>
          </div>
        </div>
      </Styled.MyTopPointInfo>
    );
  }
  return null;
};

export default PointInfo;
