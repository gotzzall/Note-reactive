import { useEffect } from "react";
import { useState } from "react";

export const useMonitors = (initValue = {}, options) => {
  /*
  {
    monitorA: false,         [monitorA, monitorB]
    monitorB: false
  }
  */
  const [monitors, setMonitors] = useState(initValue);
  console.log("monitors", monitors);

  useEffect(() => {
    const monitor = options.monitors();

    const handleOnStart = (event) => {
      console.log("onStart", event);
      setMonitors((prev) => ({ ...prev, [event.detail.action]: true }));
    };

    const handleOnSuccess = (event) => {
      console.log("onSuccess", event);

      setMonitors((prev) => ({ ...prev, [event.detail.action]: false }));
    };

    const handleOnError = (event) => {
      setMonitors((prev) => ({ ...prev, [event.detail.action]: false }));
    };

    monitor.forEach((action) => {
      window.addEventListener(`dnt:${action}:start`, handleOnStart);
      window.addEventListener(`dnt:${action}:success`, handleOnSuccess);
      window.addEventListener(`dnt:${action}:error`, handleOnError);
    });

    return () => {
      return monitor.forEach((action) => {
        window.removeEventListener(`dnt:${action}:start`, handleOnStart);
        window.removeEventListener(`dnt:${action}:success`, handleOnSuccess);
        window.removeEventListener(`dnt:${action}:error`, handleOnError);
      });
    };
  }, []);

  return [monitors];
};
