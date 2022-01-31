const B = ({ resource }: any) => {
  console.log("in b", resource);
  resource.read();

  return <div>여기보더</div>;
};

export default B;
