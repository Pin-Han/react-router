import { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  console.log("load", loadedQuotes, status);
  if (status === "pending") {
    return (
      <div className="centerd">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }
  if (error) {
    return <div className="centerd focused">{error}</div>;
  }

  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound></NoQuotesFound>;
  }
  return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;
