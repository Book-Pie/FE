import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import Button from "@mui/material/Button";
import profileImg from "assets/image/pie3x.png";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Textarea from "src/components/TextArea/Textarea";
import useSignIn from "src/hooks/useSignIn";
import { UsedBookDetailSubReplyResponse } from "src/modules/Slices/usedBookDetail/types";
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
} from "../style";
import { SellerNameTitle } from "./styles";

export interface SubReplyParam {
  sx: {
    width: string;
    fontSize: string;
    padding: string;
    right: string;
  };
  sellerName: string;
  subReply?: UsedBookDetailSubReplyResponse;
  replyId: number;
  isSubReplyAdd?: boolean;
  sellerId: number;
  page: number;
}

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
      alert("댓글을 입력해주세요.");
    } else if (!!SubContent && SubContent.length <= 10) {
      alert("댓글을 10자 이상 입력해주세요.");
    } else if (window.confirm("답글을 등록 하시겠습니까?") === true) {
      if (SubContent && user) {
        const { id } = user;
        if (id === sellerId) {
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
    }
    return false;
  };

  const editReview = () => {
    if (!!SubContent && SubContent.length <= 10) {
      alert("댓글을 10자 이상 입력해주세요.");
    } else if (window.confirm("답글을 정말로 수정하시겠습니까?") === true) {
      if (SubContent && subReply) {
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
    }
    return false;
  };

  const deleteSubReply = () => {
    if (window.confirm("답글을 정말로 삭제하시겠습니까?") === true) {
      if (subReply) {
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
                      limit={100}
                      height={100}
                      placeholder="상품 문의 작성 시 10자 이상 작성해주세요."
                      checkAuth={() => {
                        if (isLoggedIn) {
                          return true;
                        }
                        if (window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
                          history.replace("/signIn");
                        }
                        return false;
                      }}
                    />
                  ) : (
                    <SubReplyItemContent dangerouslySetInnerHTML={{ __html: subReply.content }} />
                  )}
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
                            답글 수정
                          </Button>
                          <Button
                            variant="outlined"
                            color="mainDarkBrown"
                            sx={{ ...sx, marginRight: "10px", right: "-190px" }}
                            onClick={deleteSubReply}
                          >
                            삭제
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
                            답글 수정
                          </Button>
                          <Button
                            variant="outlined"
                            color="mainDarkBrown"
                            sx={{ ...sx, marginRight: "10px", right: "-190px" }}
                            onClick={handleSubReplyCancelMode}
                          >
                            취소
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </SubContentWrapper>
              </FlexBox>
            </FlexBoxWrapper>
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
                    <>
                      <Textarea
                        isLoggedIn={isLoggedIn}
                        onChange={handleSubReviewChange}
                        value={SubContent || ""}
                        limit={100}
                        height={100}
                        placeholder="상품 문의 작성 시 10자 이상 작성해주세요."
                        checkAuth={() => {
                          if (isLoggedIn) {
                            return true;
                          }
                          if (window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
                            history.replace("/signIn");
                          }
                          return false;
                        }}
                      />
                      <div>
                        <Button
                          variant="contained"
                          color="mainDarkBrown"
                          sx={{ ...sx, marginRight: "10px", right: "-190px" }}
                          onClick={addSubReplyClick}
                        >
                          답글 작성
                        </Button>
                        <Button
                          variant="outlined"
                          color="mainDarkBrown"
                          sx={{ ...sx, marginRight: "10px", right: "-190px" }}
                          onClick={handleSubReplyAddCancel}
                        >
                          취소
                        </Button>
                      </div>
                    </>
                  )}
                </SubContentWrapper>
              </FlexBox>
            </FlexBoxWrapper>
          </SubReplyItemWrapper>
        </SubReplyFlexBox>
      )}
    </div>
  );
};

export default SubReply;
