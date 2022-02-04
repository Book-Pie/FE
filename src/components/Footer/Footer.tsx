import logo from "assets/image/logo-removebg.png";
import * as Styled from "./style";

const Footer = () => {
  return (
    <Styled.FooterContainer>
      <Styled.FooterWrapper>
        <div>
          <div>
            <img src={logo} alt="logo" />
          </div>
          <div>
            <p>(주)북파이</p>
            <p>대표이사:조영동</p>
            <p>사업자등록:111-234-45677</p>
            <p>고객정보보호 책임자:조영동</p>
            <p>(본사) 서울시 강남구 테헤란로 10</p>
            <p>Copyright Bookpie Bookstore. All Rights Reserved.</p>
          </div>
        </div>
        <div>
          <div>
            <div>
              <p>고객행복센터</p>
              <p>1644-1234</p>
            </div>
            <div>
              <p>이용시간</p>
              <p>10:00 ~ 19:00</p>
              <p>토, 일, 공휴일은 휴무입니다.</p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <p>북파이소개</p>
          </div>
          <div>
            <p>이용약관</p>
          </div>
          <div>
            <p>개인정보처리방침</p>
          </div>
        </div>
      </Styled.FooterWrapper>
    </Styled.FooterContainer>
  );
};

export default Footer;
