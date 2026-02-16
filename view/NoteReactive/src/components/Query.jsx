import { useEffect } from "react";
import { useRef } from "react";
import { useQuery } from "../hooks";

export const Query = ({ collection, name, defaultValue, where, setData }) => {
  const result = useQuery({ collection, where });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      [name]: result ?? defaultValue,
    }));
  }, []);

  useDeepCompareEffect(() => {
    setData((prev) => ({
      ...prev,
      [name]: result ?? defaultValue,
    }));
  }, [result]);

  return <></>;
};

const isEqual = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

const useDeepCompareEffect = (effect, dependencies) => {
  const ref = useRef(dependencies);
  const prevDepsRef = useRef(dependencies);

  useEffect(() => {
    ref.current = dependencies;
  }, [dependencies]);

  useEffect(() => {
    if (!isEqual(ref.current, prevDepsRef.current)) {
      prevDepsRef.current = ref.current;
      return effect();
    }
  }, [dependencies]);
};
