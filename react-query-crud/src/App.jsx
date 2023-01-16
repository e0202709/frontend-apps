import { lazy, Suspense } from "react";
import { useQueryErrorResetBoundary } from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import RefreshButton from "./components/RefreshButton";
import { Dna } from "react-loader-spinner";

// lazy import Todolist
const TodoList = lazy(() => import("./components/TodoList"));

// loading component
const Loading = () => {
  return (
    <Dna
      visible={true}
      height="80"
      width="80"
      ariaLabel="dna-loading"
      wrapperClass="dna-wrapper"
      wrapperStyle={{ position: "fixed", top: "50%", left: "50%" }}
    />
  );
};

// a component to be shown when there's an error
// resetErrorBoundary is a function that's passed from ErrorBoundary component
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div>
      <h1>An error has occured</h1>
      <RefreshButton onClick={resetErrorBoundary}>Try again</RefreshButton>
      <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
    </div>
  );
};

function App() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} fallbackRender={ErrorFallback}>
      <Suspense fallback={<Loading />}>
        <TodoList />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
