export const buildMonitors = (monitors) => {
  return monitors.reduce((action, monitor) => {
    action[monitor] = false;
    return action;
  }, {})
}