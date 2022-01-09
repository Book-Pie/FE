import styled from "styled-components";

interface item {
  key: number;
  img: string;
}

function CreateImgItem({ key, img }: item) {
  return (
    <Container>
      key={key}
      img={img}
    </Container>
  );
}

const Container = styled.div``;

export default CreateImgItem;
