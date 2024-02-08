import { JSXOutput, useSignal, useTask$ } from "@builder.io/qwik";

const getCurrentRoute = <T>(): T =>
  window.location.pathname.replaceAll("/", "") as T;

export const useRouter = <T extends string>(
  routes: Record<T, JSXOutput>,
  defaultRoute: T
): { outlet: JSXOutput } => {
  const currentRouteSig = useSignal(defaultRoute);

  useTask$(() => {
    window.onpopstate = () => (currentRouteSig.value = getCurrentRoute<T>());
    const route = getCurrentRoute<T>();
    if (route === currentRouteSig.value) return;
    if (Object.keys(routes).includes(route)) {
      currentRouteSig.value = route;
    } else if (route) {
      window.history.replaceState({}, "", `/${defaultRoute}`);
    }
  });

  return { outlet: routes[`${currentRouteSig.value}`] };
};
