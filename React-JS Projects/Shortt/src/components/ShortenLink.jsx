import axios from "axios";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

const LinkResult = ({ inputValue }) => {
  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios(
        `https://api.shrtco.de/v2/shorten?url=${inputValue}`
      );
      setShortenLink(res.data.result.full_short_link);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputValue.length) {
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [copied]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  if (error) {
    return <div className="flex justify-center"><p>Something went wrong</p></div>;
  }

  return (
    <>
      {shortenLink && (
        <div>
            <div className="flex justify-center" >
          <p className="">{shortenLink}</p>
          </div>
          <CopyToClipboard text={shortenLink} onCopy={() => setCopied(true)}>
            <div className="flex justify-center">
              <div className="flex font-[poppins] justify-center bg-blue-700 hover:bg-[#0099ff] text-white px-4 py-2 rounded-3xl mt-3 w-[20vw]">
                <button className={copied ? "copied" : ""}>
                  Copy to Clipboard
                </button>
              </div>
            </div>
          </CopyToClipboard>
        </div>
      )}
    </>
  );
};

export default LinkResult;
