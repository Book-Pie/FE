const A = ({ resource }: any) => {
  console.log("in A", resource);
  resource.read();

  return <div>여긴 이미지</div>;
};

export default A;
