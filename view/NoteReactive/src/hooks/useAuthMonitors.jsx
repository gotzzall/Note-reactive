import { useEffect } from "react";
import { useState } from "react";

export const useAuthMonitors = (initValue = {}, options) => {
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

    const handleOnAuth = (event) => {
      console.log(event);
      setMonitors((prev) => ({
        ...prev,
        [event.detail.action]: event.detail.value,
      }));
    };

    monitor.forEach((action) => {
      window.addEventListener(`dnt:${action}`, handleOnAuth);
    });

    return () => {
      return monitor.forEach((action) => {
        window.removeEventListener(`dnt:${action}`, handleOnAuth);
      });
    };
  }, []);

  return [monitors];
};
