export const useNavigate = (): { navigate: (_: string) => void } => {
  const navigate = (route: string) => {
    window.history.pushState({}, "", route);
    dispatchEvent(new PopStateEvent("popstate"));
  };

  return { navigate };
};
