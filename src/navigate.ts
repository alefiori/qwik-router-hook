import { $, QRL } from "@builder.io/qwik";

export const useNavigate = (): { navigate: QRL<(_: string) => void> } => {
  const navigate = $((route: string) => {
    window.history.pushState({}, "", route);
    dispatchEvent(new PopStateEvent("popstate"));
  });

  return { navigate };
};
