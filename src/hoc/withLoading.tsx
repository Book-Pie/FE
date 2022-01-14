import Loading from "src/elements/Loading";

const withLoading = (Component: any) => {
  const hoc = ({ isLoading, ...rest }: any) => {
    return (
      <>
        <Loading isLoading={isLoading} />
        <Component {...rest} />
      </>
    );
  };

  return hoc;
};

export default withLoading;
