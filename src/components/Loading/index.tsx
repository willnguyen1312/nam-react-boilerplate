import * as React from "react";

interface ILoadingProps {
  isLoading: boolean;
  error: boolean;
}
export const LoadingComponent = ({ isLoading, error }: ILoadingProps) => {
  // Handle the loading state
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    // Handle the error state
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  return null;
};
