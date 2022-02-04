import Loading from "elements/Loading";

const withLoading = <P extends object>(Component: React.ComponentType<P>) => {
  const hoc = (props: { isLoading: boolean } & P) => {
    const { isLoading, ...rest } = props;
    return (
      <>
        <Loading isLoading={isLoading} />
        <Component {...(rest as P)} />
      </>
    );
  };

  return hoc;
};

export default withLoading;
