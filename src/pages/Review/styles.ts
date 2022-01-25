import styled from "styled-components";

export const StrongText = styled.strong`
  display: block;
  padding-top: 28px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

export const HeaderArea = styled.header`
  background-color: #4f3629;
`;

export const HeaderTitle = styled.h1`
  padding: 20px 60px;
  text-align: center;
  color: white;
`;

export const ButtonArea = styled.div`
  display: flex;
  margin: 20px 30px 0 30px;
  padding: 20px 2px 0;
  background-color: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  table-layout: fixed;
`;

export const CancelButton = styled.button`
  width: 100%;
  height: 40px;
  border: 1px solid;
  line-height: 38px;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  border-color: #c5cbd0;
  color: #555;
  background-color: white;
  cursor: pointer;
`;

export const RegisterButton = styled(CancelButton)`
  border-color: rgba(0, 0, 0, 0.1);
  background-color: #4f3629;
  color: #fff;
`;

export const TextReviewArea = styled.div`
  position: relative;
  margin: 10px 0;
  padding: 10px 10px 11px;
  border: 1px solid #cbcbcb;
  background-color: #f4f4f4;
`;

export const Text = styled.textarea`
  width: 100%;
  min-height: 100px;
  border: none;
  background-color: transparent;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 13px;
  line-height: 19px;
  color: #555;
  vertical-align: top;
  resize: none;
`;
