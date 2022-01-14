import Loading from "src/elements/Loading";

interface WithLoadingProps {
  isLoading: boolean;
}

const withLoading = <P extends object>(Component: React.ComponentType<P>) => {
  const hoc = (props: WithLoadingProps & P) => {
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
