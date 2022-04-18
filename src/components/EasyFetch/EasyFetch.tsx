import React, {
  Children,
  cloneElement,
  useState,
  useLayoutEffect,
} from "react";
import axios from "axios";

export interface EasyFetchProps {
  url: string;
  params?: object;
  method?: string;
  data?: object;
  options?: object;
  onSuccess?: void | any;
  onError?: void | any;
  children?: void;
}

const EasyFetch = ({
  url,
  params = {},
  method = "get",
  data = {},
  options = {},
  onSuccess,
  onError,
  children,
}: EasyFetchProps) => {
  const [response, setResponse] = useState<object>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getConfig = (): object => {
    return Object.assign({ url, method, data, params }, options);
  };

  useLayoutEffect(() => {
    setIsLoading(true);

    axios(getConfig())
      .then((res: { data: React.SetStateAction<object> }) => {
        setResponse(res.data);
        if (onSuccess) onSuccess(res);
      })
      .catch((error) => {
        if (onError) onError(error);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, [url, options]);

  return Children.map(children, (child: void | any) =>
    cloneElement(child, { response, isLoading })
  );
};

export default EasyFetch;
