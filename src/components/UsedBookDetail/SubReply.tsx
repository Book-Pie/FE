import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import Button from "@mui/material/Button";
import profileImg from "assets/image/pie3x.png";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Textarea from "src/components/TextArea/Textarea";
import useSignIn from "src/hooks/useSignIn";
import {
  addUsedBookDetailSubReply,
  deleteUsedBookDetailSubReply,
  editUsedBookDetailSubReply,
  usedBookDetailSelector,
} from "src/modules/Slices/usedBookDetail/usedBookDetailSlice";
import { userReduceSelector } from "src/modules/Slices/user/userSlice";
import { useTypedSelector } from "src/modules/store";
import {
  SubReplyFlexBox,
  SubReplyItemWrapper,
  FlexBox,
  FlexBoxWrapper,
  SubContentWrapper,
  PieImg,
  ReplyItemContent,
  SubReplyItemContent,
  SubProfileArea,
  SellerNameTitle,
  SubContentButtonWrapper,
} from "./style";
import { SubReplyParam } from "./types";

const SubReply = ({ sx, replyId, sellerName, sellerId, subReply, isSubReplyAdd, page }: SubReplyParam) => {
  const history = useHistory();
  const { dispatch } = useSignIn();
  const [subReplyAdd, setIsSubReplyAdd] = useState<boolean>(isSubReplyAdd || false);
  const [SubContent, setSubContent] = useState<string | undefined>(subReply?.content || "");
  const [isSubReplyUpdate, setIsSubReplyUpdate] = useState<boolean>(false);
  const { isLoggedIn, user } = useTypedSelector(userReduceSelector);
  const { content } = useTypedSelector(usedBookDetailSelector);
  const { usedBookId } = content;

  const handleSubReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubContent(event.target.value);
  };

  const handleSubReplyEditMode = () => {
    setIsSubReplyUpdate(true);
    setSubContent(subReply?.content);
  };

  const handleSubReplyCancelMode = () => {
    setIsSubReplyUpdate(false);
    setSubContent(subReply?.content);
  };

  const handleSubReplyAddCancel = () => {
    setIsSubReplyAdd(false);
    setSubContent("");
  };

  const addSubReplyClick = () => {
    if (SubContent?.length === 0) {
      alert("????????? ??????????????????.");
    } else if (!!SubContent && SubContent.length <= 5) {
      alert("????????? 5??? ?????? ??????????????????.");
    } else if (SubContent && user) {
      const { id } = user;
      if (id === sellerId && usedBookId) {
        dispatch(
          addUsedBookDetailSubReply({
            content: SubContent,
            parentReplyId: replyId,
            userId: id,
            usedBookId,
            page,
          }),
        );
        setIsSubReplyAdd(false);
      }
    }
    return false;
  };

  const editReview = () => {
    if (!!SubContent && SubContent.length <= 5) {
      alert("????????? 5??? ?????? ??????????????????.");
    } else if (SubContent && subReply && usedBookId) {
      const { replyId } = subReply;
      dispatch(
        editUsedBookDetailSubReply({
          content: SubContent,
          page,
          replyId,
          usedBookId,
        }),
      );
      setIsSubReplyUpdate(!isSubReplyUpdate);
    }
    return false;
  };

  const deleteSubReply = () => {
    if (window.confirm("????????? ????????? ?????????????????????????") === true) {
      if (subReply && usedBookId) {
        const { replyId } = subReply;
        dispatch(deleteUsedBookDetailSubReply({ replyId, usedBookId, page }));
      }
    }
  };

  useEffect(() => {
    if (subReplyAdd) {
      setIsSubReplyUpdate(true);
    }
    if (!subReplyAdd) {
      setIsSubReplyUpdate(false);
    }
  }, [subReplyAdd]);

  return (
    <div>
      {subReply && (
        <SubReplyFlexBox>
          <SubdirectoryArrowRightIcon fontSize="large" color="disabled" />
          <SubReplyItemWrapper>
            <FlexBoxWrapper>
              <FlexBox>
                <SubProfileArea>
                  <PieImg src={profileImg} alt="profileImg" />
                  <SellerNameTitle>{sellerName}</SellerNameTitle>
                </SubProfileArea>
                <SubContentWrapper>
                  {isSubReplyUpdate ? (
                    <Textarea
                      isLoggedIn={isLoggedIn}
                      onChange={handleSubReviewChange}
                      value={SubContent || ""}
                      placeholder="?????? ?????? ?????? ??? 10??? ?????? ??????????????????."
                      checkAuth={() => {
                        if (isLoggedIn) {
                          return true;
                        }
                        if (window.confirm("???????????? ???????????????. ????????? ???????????? ?????????????????????????")) {
                          history.replace("/signIn");
                        }
                        return false;
                      }}
                    />
                  ) : (
                    <SubReplyItemContent dangerouslySetInnerHTML={{ __html: subReply.content }} />
                  )}
                </SubContentWrapper>
              </FlexBox>
            </FlexBoxWrapper>
            <SubContentButtonWrapper>
              {user && user.id === sellerId && (
                <>
                  {!isSubReplyUpdate && (
                    <>
                      <Button
                        variant="contained"
                        color="mainDarkBrown"
                        sx={{ ...sx, marginRight: "10px", right: "-190px" }}
                        onClick={handleSubReplyEditMode}
                      >
                        ?????? ??????
                      </Button>
                      <Button
                        variant="outlined"
                        color="mainDarkBrown"
                        sx={{ ...sx, marginRight: "10px", right: "-190px" }}
                        onClick={deleteSubReply}
                      >
                        ??????
                      </Button>
                    </>
                  )}
                  {isSubReplyUpdate && (
                    <>
                      <Button
                        variant="contained"
                        color="mainDarkBrown"
                        sx={{ ...sx, marginRight: "10px", right: "-190px" }}
                        onClick={editReview}
                      >
                        ?????? ??????
                      </Button>
                      <Button
                        variant="outlined"
                        color="mainDarkBrown"
                        sx={{ ...sx, marginRight: "10px", right: "-190px" }}
                        onClick={handleSubReplyCancelMode}
                      >
                        ??????
                      </Button>
                    </>
                  )}
                </>
              )}
            </SubContentButtonWrapper>
          </SubReplyItemWrapper>
        </SubReplyFlexBox>
      )}
      {subReplyAdd && (
        <SubReplyFlexBox>
          <SubdirectoryArrowRightIcon fontSize="large" color="disabled" />
          <SubReplyItemWrapper>
            <FlexBoxWrapper>
              <FlexBox>
                <SubProfileArea>
                  <PieImg src={profileImg} alt="profileImg" />
                  <SellerNameTitle>{sellerName}</SellerNameTitle>
                </SubProfileArea>
                <SubContentWrapper>
                  {!isSubReplyUpdate && SubContent && (
                    <ReplyItemContent dangerouslySetInnerHTML={{ __html: SubContent }} />
                  )}
                  {isSubReplyUpdate && (
                    <Textarea
                      isLoggedIn={isLoggedIn}
                      onChange={handleSubReviewChange}
                      value={SubContent || ""}
                      placeholder="?????? ?????? ?????? ??? 10??? ?????? ??????????????????."
                      checkAuth={() => {
                        if (isLoggedIn) {
                          return true;
                        }
                        if (window.confirm("???????????? ???????????????. ????????? ???????????? ?????????????????????????")) {
                          history.replace("/signIn");
                        }
                        return false;
                      }}
                    />
                  )}
                </SubContentWrapper>
              </FlexBox>
            </FlexBoxWrapper>
            {isSubReplyUpdate && (
              <SubContentButtonWrapper>
                <Button
                  variant="contained"
                  color="mainDarkBrown"
                  sx={{ ...sx, marginRight: "10px", right: "-190px" }}
                  onClick={addSubReplyClick}
                >
                  ?????? ??????
                </Button>
                <Button
                  variant="outlined"
                  color="mainDarkBrown"
                  sx={{ ...sx, marginRight: "10px", right: "-190px" }}
                  onClick={handleSubReplyAddCancel}
                >
                  ??????
                </Button>
              </SubContentButtonWrapper>
            )}
          </SubReplyItemWrapper>
        </SubReplyFlexBox>
      )}
    </div>
  );
};

export default SubReply;
