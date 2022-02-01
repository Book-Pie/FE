import styled from "styled-components";

export const UsedBookLikeListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 2rem;
  padding: 1rem 0.5rem;
  border-radius: 5px;
  background-color: ${props => props.theme.colors.mainLightBrown};
  ${props => props.theme.shadow[10]};
  width: 1200px;
`;

export const ContentWrapper = styled.div`
  flex-direction: column;
  margin-top: 60px;
`;

export const TitleSpan = styled.span`
  margin-right: 10px;
`;

export const Title = styled.div`
  width: 100%;
  height: 30px;
  font-size: 24px;
  font-weight: 800;
  line-height: 1.67;
  letter-spacing: -0.45px;
  text-align: left;
  color: #4f3629;
`;
