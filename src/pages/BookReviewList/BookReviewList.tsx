import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import theme from "src/assets/style/styledTheme";
import Categorys from "src/components/Categorys/Categorys";
import BestSeller from "src/components/Main/BestSeller";
import { getbookAPI, getBookSelector } from "src/modules/Slices/book/bookSlice";
import { useTypedSelector } from "src/modules/store";
import { BookContainer, BookWrapper } from "../Main/style";

const BookReviewList = () => {
  const dispatch = useDispatch();

  const bestsellerBooks = useTypedSelector(getBookSelector);
  const { item } = bestsellerBooks;

  useEffect(() => {
    dispatch(getbookAPI());
  }, [dispatch]);

  const skelatons = Array.from({ length: 9 }).map(() => ({
    background: theme.colors.mainLightBrown,
    padding: "10px",
    margin: "0 10px",
  }));
  return (
    <>
      {/* <Categorys categorys={categorys} defaultLocation="usedBook" /> */}
      <BookContainer>
        {item.length !== 0
          ? item.map((item, index) =>
              index === 0 ? (
                <div className="one" key={index}>
                  <BestSeller {...item} index={index} />
                </div>
              ) : (
                <BookWrapper key={index}>
                  <BestSeller {...item} index={index} />
                </BookWrapper>
              ),
            )
          : skelatons.map((sx, idx) =>
              idx === 0 ? (
                <Stack spacing={1} key={idx} sx={sx} className="one" direction="row">
                  <Stack direction="column" spacing={2} width="50%">
                    <Skeleton variant="circular" height={75} width={75} />
                    <Skeleton variant="rectangular" height="80%" width="100%" />
                  </Stack>
                  <Stack direction="column" spacing={2} width="50%">
                    <Skeleton variant="rectangular" height="100%" width="100%" />
                  </Stack>
                </Stack>
              ) : (
                <Stack spacing={1} key={idx} sx={sx} direction="row">
                  <Stack direction="column" spacing={2} width="50%">
                    <Skeleton variant="circular" height={50} width={50} />
                    <Skeleton variant="rectangular" height="65%" width="100%" />
                  </Stack>
                  <Stack direction="column" spacing={2} width="50%">
                    <Skeleton variant="rectangular" height="100%" width="100%" />
                  </Stack>
                </Stack>
              ),
            )}
      </BookContainer>
    </>
  );
};

export default BookReviewList;
