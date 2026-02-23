import { useState } from "react";
import { buildMonitors } from "../tools";
import { useEffect } from "react";
import actions from "../actions";
import { useAuthMonitors } from "../hooks";
import { Query } from "../components/Query";

export const withAuthReactive = (Component, options) => {
  const Wrapper = (...props) => {
    const [data, setData] = useState({});
    const [monitor] = useAuthMonitors(
      buildMonitors(options.monitors()),
      options,
    );
    useEffect(() => {
      options.init({ actions, ...props });
    }, []);

    return (
      <>
        {options.queries().map((query) => {
          return (
            <Query
              key={query.name}
              collection={query.collection}
              name={query.name}
              defaultValue={query.defaultValue}
              where={query.where}
              setData={(data) => {
                setData(data);
              }}
            />
          );
        })}

        <Component data={data} monitors={monitor} actions={actions} />
      </>
    );
  };

  return Wrapper;
};
