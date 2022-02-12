import { useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/material/styles";
import { HoverRatingProps } from "./types";

const labels: { [index: string]: string } = {
  0.5: "최악이에요",
  1: "싫어요",
  1.5: "재미없어요",
  2: "별로에요",
  2.5: "부족해요",
  3: "보통이에요",
  3.5: "좋아요",
  4: "재미있어요",
  4.5: "훌륭해요!",
  5: "최고에요!",
};

export const SmallStarIcon = styled(StarIcon)`
  font-size: 0.5rem;
`;

export const HoverRating = ({ isDisabled, rating, handleChange }: HoverRatingProps) => {
  const [hover, setHover] = useState(-1);

  console.log("rating 타입 : ", typeof rating);

  return (
    <Box
      sx={{
        textAlign: "center",
        alignItems: "center",
        marginBottom: "20px",
        borderTop: "1px solid #e6e8eb",
        paddingTop: "20px",
        color: "#787878",
      }}
    >
      {rating !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>}
      <Rating
        name="hover-feedback"
        defaultValue={3}
        size="large"
        value={rating}
        precision={0.5}
        max={5}
        readOnly={isDisabled}
        onChange={handleChange}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    </Box>
  );
};
