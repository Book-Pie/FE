import styled, { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
 ${normalize}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
html,
body {
	line-height: 1;
  overflow-x: hidden;
  -ms-overflow-style:none; 
  font-size:16px;

  // 모바일 환경 폰트사이즈
  ${props => props.theme.media.mobile}{
    font-size:20px;
  }
}
body::-webkit-scrollbar {
   display:none;
}

ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

input {
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
}
input::-ms-clear { display: none; }
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
}
input:focus{
  outline: none;
}

a {color: #000; text-decoration: none; outline: none}
a:active,
a:hover {
    outline: 0;
    text-decoration: none; 
}
img{
  -webkit-user-drag: none;
}

* {
    box-sizing: border-box;
  }
`;
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const Colors = {
  MAINDARK_BROWN: "#4f3629",
  MAINLIGHT_BROWN: "#edeae9",
  WHITE: "#ffffff",
  DARK_GREY: "#434343",
  ERROR: "rgba(225, 112, 85, 1)",
};

export default GlobalStyle;
